"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useRef } from "react";
import { useToast } from './ToastContext';
import { useAuth } from '../../src/context/AuthContext';
import { FavoriteItem } from '../../src/context/AuthContext';

interface WishlistContextType {
  wishlist: FavoriteItem[];
  toggleWishlist: (item: FavoriteItem) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<FavoriteItem[]>([]);
  const { showSuccess, showInfo, showError } = useToast();
  const { user, getUserFavorites, updateUserFavorites } = useAuth();
  const lastToastRef = useRef<string>('');

  // Load wishlist from Firebase when user changes
  useEffect(() => {
    const loadWishlist = async () => {
      if (user) {
        try {
          const favorites = await getUserFavorites();
          setWishlist(favorites);
        } catch (error) {
          console.error("Error loading wishlist from Firebase:", error);
          showError("Failed to load wishlist");
        }
      } else {
        // If no user, load from localStorage as fallback
        const stored = localStorage.getItem("wishlist");
        if (stored) {
          try {
            setWishlist(JSON.parse(stored));
          } catch (e) {
            console.error("Error parsing wishlist from localStorage:", e);
          }
        }
      }
    };

    loadWishlist();
  }, [user, getUserFavorites, showError]);

  // Save wishlist to localStorage as backup when it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = async (item: FavoriteItem) => {
    if (!user) {
      // If no user, show login prompt
      showError("Please login to save favorites");
      return;
    }

    try {
      const exists = wishlist.some((p) => p.id === item.id);
      let newWishlist: FavoriteItem[];
      let toastMessage: string;

      if (exists) {
        newWishlist = wishlist.filter((p) => p.id !== item.id);
        toastMessage = `${item.name} removed from wishlist`;
      } else {
        newWishlist = [...wishlist, item];
        toastMessage = `${item.name} added to wishlist!`;
      }

      // Update local state
      setWishlist(newWishlist);
      
      // Update Firebase
      await updateUserFavorites(newWishlist);

      // Show toast
      if (lastToastRef.current !== toastMessage) {
        if (exists) {
          showInfo(toastMessage);
        } else {
          showSuccess(toastMessage);
        }
        lastToastRef.current = toastMessage;
        // Clear the reference after a short delay to allow legitimate duplicates
        setTimeout(() => {
          lastToastRef.current = '';
        }, 1000);
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      showError("Failed to update wishlist");
    }
  };

  const removeFromWishlist = async (id: number) => {
    if (!user) {
      showError("Please login to manage favorites");
      return;
    }

    try {
      const item = wishlist.find((item) => item.id === id);
      const newWishlist = wishlist.filter((item) => item.id !== id);
      
      // Update local state
      setWishlist(newWishlist);
      
      // Update Firebase
      await updateUserFavorites(newWishlist);
      
      if (item) {
        const toastMessage = `${item.name} removed from wishlist`;
        if (lastToastRef.current !== toastMessage) {
          showInfo(toastMessage);
          lastToastRef.current = toastMessage;
          // Clear the reference after a short delay to allow legitimate duplicates
          setTimeout(() => {
            lastToastRef.current = '';
          }, 1000);
        }
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      showError("Failed to remove from wishlist");
    }
  };

  const isInWishlist = (id: number) => {
    return wishlist.some((item) => item.id === id);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}

"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useRef } from "react";
import { useToast } from './ToastContext';

interface WishlistItem {
  id: number;
  name: string;
  image: string;
  price: number;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  toggleWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const { showSuccess, showInfo } = useToast();
  const lastToastRef = useRef<string>('');

  // ✅ Load wishlist from localStorage when app starts
  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (stored) {
      try {
        setWishlist(JSON.parse(stored));
      } catch (e) {
        console.error("Error parsing wishlist from localStorage:", e);
      }
    }
  }, []);

  // ✅ Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (item: WishlistItem) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === item.id);
      if (exists) {
        const toastMessage = `${item.name} removed from wishlist`;
        if (lastToastRef.current !== toastMessage) {
          showInfo(toastMessage);
          lastToastRef.current = toastMessage;
          // Clear the reference after a short delay to allow legitimate duplicates
          setTimeout(() => {
            lastToastRef.current = '';
          }, 1000);
        }
        return prev.filter((p) => p.id !== item.id);
      }
      const toastMessage = `${item.name} added to wishlist!`;
      if (lastToastRef.current !== toastMessage) {
        showSuccess(toastMessage);
        lastToastRef.current = toastMessage;
        // Clear the reference after a short delay to allow legitimate duplicates
        setTimeout(() => {
          lastToastRef.current = '';
        }, 1000);
      }
      return [...prev, item];
    });
  };

  const removeFromWishlist = (id: number) => {
    setWishlist((prev) => {
      const item = prev.find((item) => item.id === id);
      const newWishlist = prev.filter((item) => item.id !== id);
      
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
      
      return newWishlist;
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, removeFromWishlist }}>
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

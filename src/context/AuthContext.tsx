"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  updateProfile,
  User,
  signInWithPopup,
} from 'firebase/auth';
import { auth, db, googleProvider } from '../lib/firebase';
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { Timestamp , FieldValue } from "firebase/firestore";
import { useRouter } from 'next/navigation';
import { useToast } from '../../app/context/ToastContext';

export type Address = { label: string; line1: string; city: string; state?: string; zip?: string; country?: string };

export type CartItem = {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  quantity: number;
};

export type FavoriteItem = {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  rating: number;
  reviews: number;
};

export type UserDoc = {
  uid: string;
  email: string | null;
  displayName?: string | null;
  phone?: string | null;
  addresses?: Address[];
  photoURL?: string | null;
  cart?: CartItem[];
  favorites?: FavoriteItem[];
  createdAt?:  Timestamp | FieldValue;
  updatedAt?:  Timestamp | FieldValue;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, displayName?: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  saveUserDoc: (partial: Partial<UserDoc>) => Promise<void>;
  updateUserCart: (cartItems: CartItem[]) => Promise<void>;
  getUserCart: () => Promise<CartItem[]>;
  updateUserFavorites: (favorites: FavoriteItem[]) => Promise<void>;
  getUserFavorites: () => Promise<FavoriteItem[]>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      setLoading(false);
      // Ensure a user doc exists
      if (u) {
        const ref = doc(db, 'users', u.uid);
        const snap = await getDoc(ref);
        if (!snap.exists()) {
          const newDoc: UserDoc = {
            uid: u.uid,
            email: u.email,
            displayName: u.displayName,
            photoURL: u.photoURL,
            cart: [],
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          };
          await setDoc(ref, newDoc, { merge: true });
        }
      }
    });
    return () => unsub();
  }, []);

  const signUp = async (email: string, password: string, displayName?: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(cred.user, { displayName });
    }
    // user doc will be created by the auth state listener
    router.push('/');
  };

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
    router.push('/');
  };

  const signInWithGoogle = async () => {
    try {
      console.log('🔍 Starting Google sign-in process...');
      
      // Add custom parameters to the Google provider
      googleProvider.setCustomParameters({
        prompt: 'select_account'
      });
      
      console.log('🔍 Google provider configured, attempting popup...');
      const result = await signInWithPopup(auth, googleProvider);
      
      console.log('🔍 Google sign-in successful:', result);
      
      // Check if this is a new user by checking if the user was created recently
      const isNewUser = result.user.metadata.creationTime === result.user.metadata.lastSignInTime;
      
      if (isNewUser) {
        showSuccess('Account created successfully with Google!');
      } else {
        showSuccess('Signed in successfully with Google!');
      }
      
      router.push('/');
    } catch (error) {
      console.error('❌ Google sign-in error:', error);
      throw error; // Re-throw to be handled by the component
    }
  };

  const signOut = async () => {
    try {
      await fbSignOut(auth);
      showSuccess('Successfully signed out');
      router.push('/');
    } catch {
      showError('Failed to sign out');
    }
  };

  const saveUserDoc = async (partial: Partial<UserDoc>) => {
    if (!auth.currentUser) throw new Error('Not authenticated');
    const ref = doc(db, 'users', auth.currentUser.uid);
    await setDoc(
      ref,
      { ...partial, updatedAt: serverTimestamp() },
      { merge: true }
    );
  };

  const updateUserCart = async (cartItems: CartItem[]) => {
    if (!auth.currentUser) throw new Error('Not authenticated');
    const ref = doc(db, 'users', auth.currentUser.uid);
    await updateDoc(ref, {
      cart: cartItems,
      updatedAt: serverTimestamp(),
    });
  };

  const getUserCart = async (): Promise<CartItem[]> => {
    if (!auth.currentUser) return [];
    const ref = doc(db, 'users', auth.currentUser.uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const userData = snap.data() as UserDoc;
      return userData.cart || [];
    }
    return [];
  };

  const updateUserFavorites = async (favorites: FavoriteItem[]) => {
    if (!auth.currentUser) throw new Error('Not authenticated');
    const ref = doc(db, 'users', auth.currentUser.uid);
    await updateDoc(ref, {
      favorites: favorites,
      updatedAt: serverTimestamp(),
    });
  };

  const getUserFavorites = async (): Promise<FavoriteItem[]> => {
    if (!auth.currentUser) return [];
    const ref = doc(db, 'users', auth.currentUser.uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const userData = snap.data() as UserDoc;
      return userData.favorites || [];
    }
    return [];
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      signUp, 
      signIn, 
      signInWithGoogle, 
      signOut, 
      saveUserDoc,
      updateUserCart,
      getUserCart,
      updateUserFavorites,
      getUserFavorites
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider />');
  return ctx;
}
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
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { Timestamp , FieldValue } from "firebase/firestore";
import { useRouter } from 'next/navigation';

export type Address = { label: string; line1: string; city: string; state?: string; zip?: string; country?: string };
export type UserDoc = {
  uid: string;
  email: string | null;
  displayName?: string | null;
  phone?: string | null;
  addresses?: Address[];
  photoURL?: string | null;
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
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
    await signInWithPopup(auth, googleProvider);
    router.push('/');
  };

  const signOut = async () => {
    await fbSignOut(auth);
    router.push('/');
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

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signInWithGoogle, signOut, saveUserDoc }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider />');
  return ctx;
}
import { db } from "../lib/firebase";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  addresses?: {
    label: string;
    line1: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

// Create or update a user
export async function createUser(user: User) {
  await setDoc(doc(db, "users", user.uid), user, { merge: true });
}

// Get user by uid
export async function getUser(uid: string): Promise<User | null> {
  const docSnap = await getDoc(doc(db, "users", uid));
  return docSnap.exists() ? (docSnap.data() as User) : null;
}

// Update user
export async function updateUser(uid: string, data: Partial<User>) {
  await updateDoc(doc(db, "users", uid), data);
}

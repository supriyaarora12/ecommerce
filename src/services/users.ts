import { db } from "../lib/firebase";
import { doc, setDoc, getDoc, updateDoc, collection, getDocs, query, orderBy, limit, startAfter, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";

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
  billingDetails?: {
    firstName: string;
    lastName: string;
    companyName?: string;
    streetAddress: string;
    apartment?: string;
    townCity: string;
    phoneNumber: string;
    emailAddress: string;
  };
  orders?: string[]; // Array of order IDs
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

// Get all users with pagination
export async function getAllUsers(pageSize: number = 10, lastDoc?: QueryDocumentSnapshot<DocumentData> | null): Promise<{ users: User[], total: number, lastDoc: QueryDocumentSnapshot<DocumentData> | null }> {
  let q = query(collection(db, "users"), orderBy("createdAt", "desc"), limit(pageSize));
  
  if (lastDoc) {
    q = query(collection(db, "users"), orderBy("createdAt", "desc"), startAfter(lastDoc), limit(pageSize));
  }
  
  const querySnap = await getDocs(q);
  const users = querySnap.docs.map((doc) => ({ ...doc.data(), uid: doc.id } as User));
  
  // Get total count (this is a simple approach, in production you might want to use a counter)
  const totalSnap = await getDocs(collection(db, "users"));
  const total = totalSnap.size;
  
  return {
    users,
    total,
    lastDoc: querySnap.docs[querySnap.docs.length - 1] || null
  };
}

// Update user
export async function updateUser(uid: string, data: Partial<User>) {
  await updateDoc(doc(db, "users", uid), data);
}

// Add order to user's orders array
export async function addOrderToUser(uid: string, orderId: string) {
  const user = await getUser(uid);
  if (user) {
    const orders = user.orders || [];
    orders.push(orderId);
    await updateUser(uid, { orders });
  }
}

// Save billing details to user profile
export async function saveBillingDetails(uid: string, billingDetails: User['billingDetails']) {
  await updateUser(uid, { billingDetails });
}

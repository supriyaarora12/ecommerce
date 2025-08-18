import { db } from "../lib/firebase";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Cart {
  uid: string;
  items: CartItem[];
  updatedAt: string;
}

// Create or update a cart
export async function setCart(uid: string, cart: Cart) {
  await setDoc(doc(db, "carts", uid), cart, { merge: true });
}

// Get cart by uid
export async function getCart(uid: string): Promise<Cart | null> {
  const docSnap = await getDoc(doc(db, "carts", uid));
  return docSnap.exists() ? (docSnap.data() as Cart) : null;
}

// Update cart items
export async function updateCart(uid: string, items: CartItem[]) {
  await updateDoc(doc(db, "carts", uid), {
    items,
    updatedAt: new Date().toISOString(),
  });
}

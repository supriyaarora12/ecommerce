import { db } from "../lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { CartItem } from "../context/AuthContext";

// Get cart from user document
export async function getUserCart(uid: string): Promise<CartItem[]> {
  const docSnap = await getDoc(doc(db, "users", uid));
  if (docSnap.exists()) {
    const userData = docSnap.data();
    return userData.cart || [];
  }
  return [];
}

// Update cart in user document
export async function updateUserCart(uid: string, cartItems: CartItem[]) {
  await updateDoc(doc(db, "users", uid), {
    cart: cartItems,
    updatedAt: new Date().toISOString(),
  });
}

// Add item to user's cart
export async function addItemToUserCart(uid: string, item: CartItem) {
  const currentCart = await getUserCart(uid);
  const existingItemIndex = currentCart.findIndex(i => i.id === item.id);
  
  if (existingItemIndex >= 0) {
    currentCart[existingItemIndex].quantity += item.quantity;
  } else {
    currentCart.push(item);
  }
  
  await updateUserCart(uid, currentCart);
}

// Remove item from user's cart
export async function removeItemFromUserCart(uid: string, productId: number) {
  const currentCart = await getUserCart(uid);
  const filteredCart = currentCart.filter(item => item.id !== productId);
  await updateUserCart(uid, filteredCart);
}

// Clear user's cart
export async function clearUserCart(uid: string) {
  await updateUserCart(uid, []);
}

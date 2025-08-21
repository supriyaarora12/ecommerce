import { db } from "../lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FavoriteItem } from "../context/AuthContext";

// Get favorites from user document
export async function getUserFavorites(uid: string): Promise<FavoriteItem[]> {
  const docSnap = await getDoc(doc(db, "users", uid));
  if (docSnap.exists()) {
    const userData = docSnap.data();
    return userData.favorites || [];
  }
  return [];
}

// Update favorites in user document
export async function updateUserFavorites(uid: string, favorites: FavoriteItem[]) {
  await updateDoc(doc(db, "users", uid), {
    favorites: favorites,
  });
}

// Add item to favorites
export async function addToFavorites(uid: string, item: FavoriteItem): Promise<FavoriteItem[]> {
  const currentFavorites = await getUserFavorites(uid);
  const exists = currentFavorites.some(fav => fav.id === item.id);
  
  if (!exists) {
    const newFavorites = [...currentFavorites, item];
    await updateUserFavorites(uid, newFavorites);
    return newFavorites;
  }
  
  return currentFavorites;
}

// Remove item from favorites
export async function removeFromFavorites(uid: string, itemId: number): Promise<FavoriteItem[]> {
  const currentFavorites = await getUserFavorites(uid);
  const newFavorites = currentFavorites.filter(fav => fav.id !== itemId);
  await updateUserFavorites(uid, newFavorites);
  return newFavorites;
}

// Toggle item in favorites (add if not exists, remove if exists)
export async function toggleFavorite(uid: string, item: FavoriteItem): Promise<FavoriteItem[]> {
  const currentFavorites = await getUserFavorites(uid);
  const exists = currentFavorites.some(fav => fav.id === item.id);
  
  if (exists) {
    return await removeFromFavorites(uid, item.id);
  } else {
    return await addToFavorites(uid, item);
  }
}

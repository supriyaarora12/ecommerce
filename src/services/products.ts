import { db } from "../lib/firebase";
import { collection, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";

export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

// Add product
export async function addProduct(product: Product) {
  const newDoc = doc(collection(db, "products"));
  await setDoc(newDoc, { ...product, id: newDoc.id });
  return newDoc.id;
}

// Get product by id
export async function getProduct(productId: string): Promise<Product | null> {
  const docSnap = await getDoc(doc(db, "products", productId));
  return docSnap.exists() ? (docSnap.data() as Product) : null;
}

// Get all products
export async function getAllProducts(): Promise<Product[]> {
  const querySnap = await getDocs(collection(db, "products"));
  return querySnap.docs.map((doc) => doc.data() as Product);
}

// Update product
export async function updateProduct(productId: string, data: Partial<Product>) {
  await updateDoc(doc(db, "products", productId), data);
}

// Delete product
export async function deleteProduct(productId: string) {
  await deleteDoc(doc(db, "products", productId));
}

import { db } from "../lib/firebase";
import { collection, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";

export interface Product {
  id?: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl?: string;
  category?: string;
  createdAt?: string;
  updatedAt?: string;
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
  return querySnap.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Product));
}

// Search products
export async function searchProducts(searchTerm: string): Promise<Product[]> {
  if (!searchTerm.trim()) return [];
  
  const querySnap = await getDocs(collection(db, "products"));
  const allProducts = querySnap.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Product));
  
  // Filter products based on search term (case-insensitive)
  const searchLower = searchTerm.toLowerCase();
  return allProducts.filter(product => 
    product.name.toLowerCase().includes(searchLower) ||
    (product.description && product.description.toLowerCase().includes(searchLower)) ||
    (product.category && product.category.toLowerCase().includes(searchLower))
  );
}

// Get related products
export async function getRelatedProducts(currentProductId: string, category?: string, limit: number = 4): Promise<Product[]> {
  const querySnap = await getDocs(collection(db, "products"));
  const allProducts = querySnap.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Product));
  
  // Filter out the current product and get products from the same category
  const relatedProducts = allProducts.filter(product => 
    product.id !== currentProductId && 
    product.category === category
  );
  
  // If not enough products in same category, add some random products
  if (relatedProducts.length < limit) {
    const otherProducts = allProducts.filter(product => 
      product.id !== currentProductId && 
      product.category !== category
    );
    relatedProducts.push(...otherProducts.slice(0, limit - relatedProducts.length));
  }
  
  // Return limited number of products
  return relatedProducts.slice(0, limit);
}

// Update product
export async function updateProduct(productId: string, data: Partial<Product>) {
  await updateDoc(doc(db, "products", productId), data);
}

// Delete product
export async function deleteProduct(productId: string) {
  await deleteDoc(doc(db, "products", productId));
}

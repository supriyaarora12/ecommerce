import { db } from "../lib/firebase";
import { collection, doc, setDoc, getDoc, getDocs } from "firebase/firestore";

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id?: string;
  uid: string;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

// Create new order
export async function createOrder(order: Order) {
  const newDoc = doc(collection(db, "orders"));
  await setDoc(newDoc, { ...order, id: newDoc.id });
  return newDoc.id;
}

// Get order by id
export async function getOrder(orderId: string): Promise<Order | null> {
  const docSnap = await getDoc(doc(db, "orders", orderId));
  return docSnap.exists() ? (docSnap.data() as Order) : null;
}

// Get all orders for a user
export async function getUserOrders(uid: string): Promise<Order[]> {
  const querySnap = await getDocs(collection(db, "orders"));
  return querySnap.docs
    .map((doc) => doc.data() as Order)
    .filter((order) => order.uid === uid);
}

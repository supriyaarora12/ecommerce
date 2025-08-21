import { db } from "../lib/firebase";
import { collection, doc, setDoc, getDoc, getDocs, query, where, orderBy, limit, startAfter, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";

export interface OrderItem {
  id: number;
  name: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  quantity: number;
  price: number;
}

export interface Order {
  id?: string;
  uid: string;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  billingDetails: {
    firstName: string;
    lastName: string;
    companyName?: string;
    streetAddress: string;
    apartment?: string;
    townCity: string;
    phoneNumber: string;
    emailAddress: string;
  };
  paymentMethod: string;
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
  const q = query(collection(db, "orders"), where("uid", "==", uid));
  const querySnap = await getDocs(q);
  return querySnap.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Order));
}

// Get all orders for admin (with pagination and filtering)
export async function getAllOrders(
  pageSize: number = 10,
  lastDoc: QueryDocumentSnapshot<DocumentData> | null = null,
  statusFilter?: string
): Promise<{ orders: Order[]; lastDoc: QueryDocumentSnapshot<DocumentData> | null; total: number }> {
  let q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
  
  // Apply status filter if provided
  if (statusFilter && statusFilter !== 'all') {
    q = query(q, where("status", "==", statusFilter));
  }
  
  // Apply pagination
  if (lastDoc) {
    q = query(q, startAfter(lastDoc), limit(pageSize));
  } else {
    q = query(q, limit(pageSize));
  }
  
  const querySnap = await getDocs(q);
  const orders = querySnap.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Order));
  
  // Get total count (this is a simplified approach - in production you might want to use a counter)
  const totalQuery = statusFilter && statusFilter !== 'all' 
    ? query(collection(db, "orders"), where("status", "==", statusFilter))
    : collection(db, "orders");
  const totalSnap = await getDocs(totalQuery);
  
  return {
    orders,
    lastDoc: querySnap.docs[querySnap.docs.length - 1] || null,
    total: totalSnap.size
  };
}

// Update order status
export async function updateOrderStatus(orderId: string, status: Order["status"]) {
  await setDoc(doc(db, "orders", orderId), { status, updatedAt: new Date().toISOString() }, { merge: true });
}

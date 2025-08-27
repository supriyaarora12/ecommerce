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
  subtotal: number;
  discount?: number;
  couponCode?: string;
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
  paymentDetails?: {
    accountHolderName?: string;
    accountNumber?: string;
    bankName?: string;
    routingNumber?: string;
    transactionId?: string;
    paymentAmount?: number;
    paymentStatus?: "pending_verification" | "verified" | "failed";
  };
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
  try {
    let q;
    
    // Special filter for bank payments pending verification
    if (statusFilter === 'bank_pending') {
      // Get all orders and filter client-side for bank payments
      q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    }
    // Apply status filter if provided
    else if (statusFilter && statusFilter !== 'all') {
      q = query(collection(db, "orders"), where("status", "==", statusFilter), orderBy("createdAt", "desc"));
    } else {
      q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    }
    
    // Apply pagination
    if (lastDoc) {
      q = query(q, startAfter(lastDoc), limit(pageSize));
    } else {
      q = query(q, limit(pageSize));
    }
    
    const querySnap = await getDocs(q);
    let orders = querySnap.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Order));
    
    // Filter for bank payments if needed
    if (statusFilter === 'bank_pending') {
      orders = orders.filter(order => 
        order.paymentMethod === 'bank' && 
        order.paymentDetails?.paymentStatus === 'pending_verification'
      );
    }
    
    // Get total count (simplified approach)
    let total = 0;
    try {
      if (statusFilter === 'bank_pending') {
        // For bank pending, we need to count all orders and filter
        const allOrdersQuery = query(collection(db, "orders"));
        const allOrdersSnap = await getDocs(allOrdersQuery);
        const allOrders = allOrdersSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Order));
        total = allOrders.filter(order => 
          order.paymentMethod === 'bank' && 
          order.paymentDetails?.paymentStatus === 'pending_verification'
        ).length;
      } else {
        const totalQuery = statusFilter && statusFilter !== 'all' 
          ? query(collection(db, "orders"), where("status", "==", statusFilter))
          : collection(db, "orders");
        const totalSnap = await getDocs(totalQuery);
        total = totalSnap.size;
      }
    } catch (countError) {
      console.warn('Could not get total count:', countError);
      total = orders.length; // Fallback
    }
    
    return {
      orders,
      lastDoc: querySnap.docs[querySnap.docs.length - 1] || null,
      total
    };
  } catch (error) {
    console.error('Error in getAllOrders:', error);
    // Return empty result on error
    return {
      orders: [],
      lastDoc: null,
      total: 0
    };
  }
}

// Update order status
export async function updateOrderStatus(orderId: string, status: Order["status"]) {
  await setDoc(doc(db, "orders", orderId), { status, updatedAt: new Date().toISOString() }, { merge: true });
}

// Update payment status
export async function updatePaymentStatus(orderId: string, paymentStatus: "pending_verification" | "verified" | "failed") {
  // First get the current order to preserve existing payment details
  const orderDoc = await getDoc(doc(db, "orders", orderId));
  if (!orderDoc.exists()) {
    throw new Error("Order not found");
  }
  
  const orderData = orderDoc.data() as Order;
  const updatedPaymentDetails = {
    ...orderData.paymentDetails,
    paymentStatus: paymentStatus
  };
  
  await setDoc(doc(db, "orders", orderId), { 
    paymentDetails: updatedPaymentDetails,
    updatedAt: new Date().toISOString() 
  }, { merge: true });
}

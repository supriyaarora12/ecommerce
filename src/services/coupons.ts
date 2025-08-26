import { db } from '../lib/firebase';
import { collection, doc, getDoc, getDocs, query, where, addDoc, updateDoc, deleteDoc, serverTimestamp, increment } from 'firebase/firestore';

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minAmount?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usedCount: number;
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AppliedCoupon {
  couponId: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  discountAmount: number;
  appliedAt: Date;
}

// Sample coupons for testing
const sampleCoupons: Omit<Coupon, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    minAmount: 50,
    maxDiscount: 25,
    usageLimit: 1000,
    usedCount: 0,
    validFrom: new Date('2025-01-01'),
    validUntil: new Date('2025-12-31'),
    isActive: true,
    description: '10% off on orders above $50'
  },
  {
    code: 'SAVE20',
    type: 'percentage',
    value: 20,
    minAmount: 100,
    maxDiscount: 50,
    usageLimit: 500,
    usedCount: 0,
    validFrom: new Date('2025-01-01'),
    validUntil: new Date('2025-12-31'),
    isActive: true,
    description: '20% off on orders above $100'
  },
  {
    code: 'FLAT15',
    type: 'fixed',
    value: 15,
    minAmount: 30,
    usageLimit: 2000,
    usedCount: 0,
    validFrom: new Date('2025-01-01'),
    validUntil: new Date('2025-12-31'),
    isActive: true,
    description: '$15 off on orders above $30'
  },
  {
    code: 'FREESHIP',
    type: 'fixed',
    value: 10,
    minAmount: 25,
    usageLimit: 1000,
    usedCount: 0,
    validFrom: new Date('2025-01-01'),
    validUntil: new Date('2025-12-31'),
    isActive: true,
    description: '$10 off shipping on orders above $25'
  }
];

// Initialize sample coupons in Firestore
export const initializeSampleCoupons = async () => {
  try {
    const couponsRef = collection(db, 'coupons');
    
    for (const coupon of sampleCoupons) {
      // Check if coupon already exists
      const q = query(couponsRef, where('code', '==', coupon.code));
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        // Create new coupon
        await addDoc(couponsRef, {
          ...coupon,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        console.log(`✅ Sample coupon ${coupon.code} initialized`);
      } else {
        // Update existing coupon with new dates
        const existingDoc = snapshot.docs[0];
        await updateDoc(doc(db, 'coupons', existingDoc.id), {
          validFrom: coupon.validFrom,
          validUntil: coupon.validUntil,
          updatedAt: serverTimestamp()
        });
        console.log(`✅ Sample coupon ${coupon.code} updated with new dates`);
      }
    }
  } catch (error) {
    console.error('Error initializing sample coupons:', error);
  }
};

// Get all active coupons
export const getActiveCoupons = async (): Promise<Coupon[]> => {
  try {
    const couponsRef = collection(db, 'coupons');
    // Only filter by isActive to avoid composite index requirement
    const q = query(
      couponsRef,
      where('isActive', '==', true)
    );
    
    const snapshot = await getDocs(q);
    const coupons: Coupon[] = [];
    const now = new Date();
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      const validUntil = data.validUntil.toDate();
      
      // Filter by validUntil in JavaScript instead of Firestore query
      if (validUntil >= now) {
        coupons.push({
          id: doc.id,
          ...data,
          validFrom: data.validFrom.toDate(),
          validUntil: validUntil,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate()
        } as Coupon);
      }
    });
    
    return coupons;
  } catch (error) {
    console.error('Error fetching active coupons:', error);
    return [];
  }
};

// Validate and apply coupon
export const validateCoupon = async (code: string, subtotal: number): Promise<{ valid: boolean; coupon?: Coupon; discountAmount?: number; error?: string }> => {
  try {
    const couponsRef = collection(db, 'coupons');
    const q = query(couponsRef, where('code', '==', code.toUpperCase()));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      return { valid: false, error: 'Invalid coupon code' };
    }
    
    const doc = snapshot.docs[0];
    const couponData = doc.data();
    const coupon: Coupon = {
      id: doc.id,
      code: couponData.code,
      type: couponData.type,
      value: couponData.value,
      minAmount: couponData.minAmount,
      maxDiscount: couponData.maxDiscount,
      usageLimit: couponData.usageLimit,
      usedCount: couponData.usedCount,
      isActive: couponData.isActive,
      description: couponData.description,
      validFrom: couponData.validFrom.toDate(),
      validUntil: couponData.validUntil.toDate(),
      createdAt: couponData.createdAt.toDate(),
      updatedAt: couponData.updatedAt.toDate()
    };
    
    // Check if coupon is active
    if (!coupon.isActive) {
      return { valid: false, error: 'Coupon is inactive' };
    }
    
    // Check if coupon is within valid date range
    const now = new Date();
    if (now < coupon.validFrom || now > coupon.validUntil) {
      return { valid: false, error: 'Coupon has expired or not yet valid' };
    }
    
    // Check usage limit
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return { valid: false, error: 'Coupon usage limit reached' };
    }
    
    // Check minimum amount requirement
    if (coupon.minAmount && subtotal < coupon.minAmount) {
      return { valid: false, error: `Minimum order amount of $${coupon.minAmount} required` };
    }
    
    // Calculate discount amount
    let discountAmount = 0;
    if (coupon.type === 'percentage') {
      discountAmount = (subtotal * coupon.value) / 100;
      if (coupon.maxDiscount) {
        discountAmount = Math.min(discountAmount, coupon.maxDiscount);
      }
    } else {
      discountAmount = coupon.value;
    }
    
    return { valid: true, coupon, discountAmount };
  } catch (error) {
    console.error('Error validating coupon:', error);
    return { valid: false, error: 'Error validating coupon' };
  }
};

// Apply coupon and increment usage count
export const applyCoupon = async (couponId: string): Promise<boolean> => {
  try {
    const couponRef = doc(db, 'coupons', couponId);
    await updateDoc(couponRef, {
      usedCount: increment(1),
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error applying coupon:', error);
    return false;
  }
};

// Create new coupon (admin function)
export const createCoupon = async (couponData: Omit<Coupon, 'id' | 'createdAt' | 'updatedAt' | 'usedCount'>): Promise<string> => {
  try {
    const couponsRef = collection(db, 'coupons');
    const docRef = await addDoc(couponsRef, {
      ...couponData,
      usedCount: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating coupon:', error);
    throw error;
  }
};

// Update coupon (admin function)
export const updateCoupon = async (couponId: string, updates: Partial<Coupon>): Promise<boolean> => {
  try {
    const couponRef = doc(db, 'coupons', couponId);
    await updateDoc(couponRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating coupon:', error);
    return false;
  }
};

// Delete coupon (admin function)
export const deleteCoupon = async (couponId: string): Promise<boolean> => {
  try {
    const couponRef = doc(db, 'coupons', couponId);
    await deleteDoc(couponRef);
    return true;
  } catch (error) {
    console.error('Error deleting coupon:', error);
    return false;
  }
};



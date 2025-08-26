'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { validateCoupon, applyCoupon, AppliedCoupon, Coupon, initializeSampleCoupons } from '../../src/services/coupons';
import { useToast } from './ToastContext';

interface CouponContextType {
  appliedCoupon: AppliedCoupon | null;
  isApplying: boolean;
  applyCouponCode: (code: string, subtotal: number) => Promise<boolean>;
  removeCoupon: () => void;
  getDiscountAmount: (subtotal: number) => number;
  getFinalTotal: (subtotal: number) => number;
}

const CouponContext = createContext<CouponContextType | undefined>(undefined);

export const CouponProvider = ({ children }: { children: ReactNode }) => {
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const { showSuccess, showError } = useToast();

  // Load applied coupon from localStorage on mount
  useEffect(() => {
    const savedCoupon = localStorage.getItem('appliedCoupon');
    if (savedCoupon) {
      try {
        const coupon = JSON.parse(savedCoupon);
        // Check if coupon is still valid (not expired)
        if (new Date(coupon.appliedAt) > new Date(Date.now() - 24 * 60 * 60 * 1000)) { // 24 hours
          setAppliedCoupon(coupon);
        } else {
          localStorage.removeItem('appliedCoupon');
        }
      } catch (error) {
        console.error('Error loading saved coupon:', error);
        localStorage.removeItem('appliedCoupon');
      }
    }
  }, []);

  const applyCouponCode = async (code: string, subtotal: number): Promise<boolean> => {
    if (!code.trim()) {
      showError('Please enter a coupon code');
      return false;
    }

    setIsApplying(true);
    try {
      // Initialize sample coupons if not already done
      if (!isInitialized) {
        try {
          await initializeSampleCoupons();
          setIsInitialized(true);
        } catch (error) {
          console.log('Sample coupons already initialized or error occurred:', error);
        }
      }

      const result = await validateCoupon(code.trim(), subtotal);
      
      if (!result.valid) {
        showError(result.error || 'Invalid coupon code');
        return false;
      }

      if (!result.coupon || !result.discountAmount) {
        showError('Error applying coupon');
        return false;
      }

      // Create applied coupon object
      const appliedCouponData: AppliedCoupon = {
        couponId: result.coupon.id,
        code: result.coupon.code,
        type: result.coupon.type,
        value: result.coupon.value,
        discountAmount: result.discountAmount,
        appliedAt: new Date()
      };

      // Save to state and localStorage
      setAppliedCoupon(appliedCouponData);
      localStorage.setItem('appliedCoupon', JSON.stringify(appliedCouponData));

      // Show success message
      const discountText = result.coupon.type === 'percentage' 
        ? `${result.coupon.value}% off` 
        : `$${result.coupon.value} off`;
      
      showSuccess(`Coupon applied! ${discountText} - You saved $${result.discountAmount.toFixed(2)}`);

      return true;
    } catch (error) {
      console.error('Error applying coupon:', error);
      showError('Error applying coupon. Please try again.');
      return false;
    } finally {
      setIsApplying(false);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    localStorage.removeItem('appliedCoupon');
    showSuccess('Coupon removed');
  };

  const getDiscountAmount = (subtotal: number): number => {
    if (!appliedCoupon) return 0;
    return appliedCoupon.discountAmount;
  };

  const getFinalTotal = (subtotal: number): number => {
    const discount = getDiscountAmount(subtotal);
    return Math.max(0, subtotal - discount);
  };

  return (
    <CouponContext.Provider value={{
      appliedCoupon,
      isApplying,
      applyCouponCode,
      removeCoupon,
      getDiscountAmount,
      getFinalTotal
    }}>
      {children}
    </CouponContext.Provider>
  );
};

export const useCoupon = () => {
  const ctx = useContext(CouponContext);
  if (!ctx) throw new Error("useCoupon must be used within CouponProvider");
  return ctx;
};

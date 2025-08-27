"use client";

import Image from "next/image";
import { useCart } from "../context/CartContext";
import { useAuth } from "../../src/context/AuthContext";
import { useCoupon } from "../context/CouponContext";
import RouteGuard from "../../src/components/auth/RouteGuard";
import { useState, useEffect } from "react";
import { createOrder } from "../../src/services/orders";
import { addOrderToUser, getUser, saveBillingDetails } from "../../src/services/users";
import { getActiveCoupons, Coupon } from "../../src/services/coupons";
import { useRouter } from "next/navigation";
import { useToast } from "../context/ToastContext";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const { appliedCoupon, isApplying, applyCouponCode, removeCoupon, getDiscountAmount, getFinalTotal } = useCoupon();
  const router = useRouter();
  const { showError, showSuccess, showLoading, dismissToast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [availableCoupons, setAvailableCoupons] = useState<Coupon[]>([]);
  const [showCouponList, setShowCouponList] = useState(false);
  const [loadingCoupons, setLoadingCoupons] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    streetAddress: "",
    apartment: "",
    townCity: "",
    phoneNumber: "",
    emailAddress: "",
  });
  const [isLoadingBillingDetails, setIsLoadingBillingDetails] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.discountedPrice * item.quantity, 0);
  const shipping = 0;
  const discount = getDiscountAmount();
  const total = getFinalTotal(subtotal) + shipping;
  
  const handleApplyCoupon = async () => {
    await applyCouponCode(couponCode, subtotal);
  };

  const loadAvailableCoupons = async () => {
    setLoadingCoupons(true);
    try {
      const coupons = await getActiveCoupons();
      setAvailableCoupons(coupons);
    } catch (error) {
      console.error('Error loading coupons:', error);
    } finally {
      setLoadingCoupons(false);
    }
  };

  const handleShowCoupons = () => {
    if (!showCouponList) {
      loadAvailableCoupons();
    }
    setShowCouponList(!showCouponList);
  };

  const handleSelectCoupon = (coupon: Coupon) => {
    setCouponCode(coupon.code);
    setShowCouponList(false);
  };

  useEffect(() => {
    const loadBillingDetails = async () => {
      if (!user) return;
      
      setIsLoadingBillingDetails(true);
      try {
        // Fetch user data from database
        const userData = await getUser(user.uid);
        
        if (userData?.billingDetails) {
          // Use saved billing details from database
          setFormData({
            firstName: userData.billingDetails.firstName || "",
            lastName: userData.billingDetails.lastName || "",
            companyName: userData.billingDetails.companyName || "",
            streetAddress: userData.billingDetails.streetAddress || "",
            apartment: userData.billingDetails.apartment || "",
            townCity: userData.billingDetails.townCity || "",
            phoneNumber: userData.billingDetails.phoneNumber || "",
            emailAddress: userData.billingDetails.emailAddress || "",
          });
        } else {
          // Fallback to basic user info
          const nameParts = user.displayName?.split(' ') || ['', ''];
          setFormData({
            firstName: nameParts[0] || "",
            lastName: nameParts.slice(1).join(' ') || "",
            companyName: "",
            streetAddress: "",
            apartment: "",
            townCity: "",
            phoneNumber: "",
            emailAddress: user.email || "",
          });
        }
      } catch (error) {
        console.error('Error loading billing details:', error);
        // Fallback to basic user info
        const nameParts = user.displayName?.split(' ') || ['', ''];
        setFormData({
          firstName: nameParts[0] || "",
          lastName: nameParts.slice(1).join(' ') || "",
          companyName: "",
          streetAddress: "",
          apartment: "",
          townCity: "",
          phoneNumber: "",
          emailAddress: user.email || "",
        });
      } finally {
        setIsLoadingBillingDetails(false);
      }
    };

    loadBillingDetails();
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
const handlePlaceOrder = async () => {
  if (!user) return;

  // Validate required fields
  const requiredFields = ['firstName', 'lastName', 'streetAddress', 'townCity', 'phoneNumber', 'emailAddress'];
  const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

  if (missingFields.length > 0) {
    showError(`Please fill in all required fields: ${missingFields.join(', ')}`);
    return;
  }

  if (cart.length === 0) {
    showError('Your cart is empty');
    return;
  }

  setIsProcessing(true);
  const loadingToast = showLoading('Processing your order...');

  try {
    // Create individual orders for each cart item
    const orderPromises = cart.map(async (item) => {
      // Create single item order
      const orderItem = {
        id: item.id ?? null,
        name: item.name ?? "Unnamed Product",
        image: item.image ?? "",
        originalPrice: item.originalPrice ?? 0,
        discountedPrice: item.discountedPrice ?? 0,
        quantity: item.quantity ?? 1,
        price: item.discountedPrice ?? 0
      };

      // Calculate total for this single item
      const itemTotal = (item.discountedPrice ?? 0) * (item.quantity ?? 1);

      // Create order for this item
      const order = {
        uid: user.uid ?? "guest",
        items: [orderItem],
        subtotal: itemTotal,
        discount: appliedCoupon ? appliedCoupon.discountAmount : 0,
        couponCode: appliedCoupon ? appliedCoupon.code : undefined,
        totalAmount: appliedCoupon ? Math.max(0, itemTotal - appliedCoupon.discountAmount) : itemTotal,
        status: "pending" as const,
        billingDetails: {
          ...formData,
          companyName: formData.companyName || null,
          apartment: formData.apartment || null,
        },
        paymentMethod: paymentMethod ?? "bank",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // ✅ Remove undefined values before saving
      const sanitizedOrder = JSON.parse(JSON.stringify(order));

      const orderId = await createOrder(sanitizedOrder);
      await addOrderToUser(user.uid, orderId);

      return orderId;
    });

    await Promise.all(orderPromises);

    // Save billing details
    await saveBillingDetails(user.uid, formData);

    clearCart();
    removeCoupon(); // Clear applied coupon after successful order

    dismissToast(loadingToast);
    showSuccess(`${cart.length} orders placed successfully! Redirecting to your orders...`);
    router.push('/orders');

  } catch (error) {
    console.error('Error placing orders:', error);
    dismissToast(loadingToast);
    showError('Failed to place orders. Please try again.');
  } finally {
    setIsProcessing(false);
  }
};


  return (
    <RouteGuard requireAuth>
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          Account / My Account / Product / View Cart / <span className="text-black font-medium">CheckOut</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold mb-8">Billing Details</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT: Billing Form */}
          <form className="space-y-4">
            {isLoadingBillingDetails && (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500 mx-auto"></div>
                <p className="text-sm text-gray-600 mt-2">Loading billing details...</p>
              </div>
            )}
            <input 
              type="text" 
              name="firstName"
              placeholder="First Name *" 
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-3" 
            />
            <input 
              type="text" 
              name="lastName"
              placeholder="Last Name *" 
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-3" 
            />
            <input 
              type="text" 
              name="companyName"
              placeholder="Company Name" 
              value={formData.companyName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-3" 
            />
            <input 
              type="text" 
              name="streetAddress"
              placeholder="Street Address *" 
              value={formData.streetAddress}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-3" 
            />
            <input 
              type="text" 
              name="apartment"
              placeholder="Apartment, floor, etc. (optional)" 
              value={formData.apartment}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-3" 
            />
            <input 
              type="text" 
              name="townCity"
              placeholder="Town/City *" 
              value={formData.townCity}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-3" 
            />
            <input 
              type="text" 
              name="phoneNumber"
              placeholder="Phone Number *" 
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-3" 
            />
            <input 
              type="email" 
              name="emailAddress"
              placeholder="Email Address *" 
              value={formData.emailAddress}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-3" 
            />

            {/* Save info */}
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-green-800 text-xs">
                <strong>Auto-save:</strong> Your billing details will be automatically saved for faster checkout next time.
              </p>
            </div>
          </form>

          {/* RIGHT: Order Summary */}
          <div className="border border-gray-200 rounded-lg p-6 space-y-6">
            {/* Products */}
            <div className="space-y-4">
              {cart.map((item, index) => (
  <div key={`${item.id || "fallback"}-${index}`} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Image src={item.image} alt={item.name} width={60} height={60} className="object-contain" />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">${item.discountedPrice * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Order Info */}
            <div className="border-t pt-4 space-y-2 text-sm">
              <div className="bg-blue-50 p-3 rounded-lg mb-3">
                <p className="text-blue-800 text-xs">
                  <strong>Note:</strong> Each item will be ordered separately for better tracking and management.
                </p>
              </div>
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount:</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="text-green-500">Free</span>
              </div>
              <div className="flex justify-between font-semibold text-base">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={paymentMethod === "bank"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Bank
                <Image src="/ui/checkout/bank.svg" alt="Payment Methods" width={100} height={20} />
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on delivery
              </label>
            </div>

            {/* Coupon Code */}
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full border border-gray-300 rounded p-3"
                  />
                  <button
                    onClick={handleShowCoupons}
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                <button 
                  type="button" 
                  onClick={handleApplyCoupon}
                  disabled={isApplying || !couponCode.trim()}
                  className="bg-red-500 text-white px-5 rounded hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isApplying ? 'Applying...' : 'Apply Coupon'}
                </button>
              </div>

              {/* Available Coupons Dropdown */}
              {showCouponList && (
                <div className="border border-gray-200 rounded-lg bg-white shadow-lg max-h-60 overflow-y-auto">
                  {loadingCoupons ? (
                    <div className="p-4 text-center text-gray-500">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500 mx-auto"></div>
                      <p className="mt-2 text-sm">Loading coupons...</p>
                    </div>
                  ) : availableCoupons.length > 0 ? (
                    <div className="p-2">
                      <h4 className="text-sm font-medium text-gray-700 mb-2 px-2">Available Coupons:</h4>
                      {availableCoupons.map((coupon) => (
                        <button
                          key={coupon.id}
                          onClick={() => handleSelectCoupon(coupon)}
                          className="w-full text-left p-3 hover:bg-gray-50 rounded-md border-b border-gray-100 last:border-b-0"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-red-600">{coupon.code}</span>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  coupon.type === 'percentage' 
                                    ? 'bg-blue-100 text-blue-800' 
                                    : 'bg-green-100 text-green-800'
                                }`}>
                                  {coupon.type === 'percentage' ? 'Percentage' : 'Fixed'}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{coupon.description}</p>
                              <div className="text-xs text-gray-500 mt-1">
                                {coupon.minAmount && `Min. order: $${coupon.minAmount}`}
                                {coupon.maxDiscount && coupon.type === 'percentage' && ` • Max discount: $${coupon.maxDiscount}`}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-green-600">
                                {coupon.type === 'percentage' ? `${coupon.value}% OFF` : `$${coupon.value} OFF`}
                              </div>
                              <div className="text-xs text-gray-500">
                                {coupon.usedCount} / {coupon.usageLimit || '∞'} used
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      <p className="text-sm">No coupons available at the moment.</p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Applied Coupon Display */}
              {appliedCoupon && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-800 font-medium text-sm">
                        Coupon Applied: {appliedCoupon.code}
                      </p>
                      <p className="text-green-600 text-xs">
                        {appliedCoupon.type === 'percentage' 
                          ? `${appliedCoupon.value}% off` 
                          : `$${appliedCoupon.value} off`
                        } - You saved ${appliedCoupon.discountAmount.toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-red-500 hover:text-red-700 text-xs font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Place Order */}
            <button 
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing...' : `Place ${cart.length} Order${cart.length > 1 ? 's' : ''}`}
            </button>
          </div>
        </div>
      </div>
    </RouteGuard>
  );
}
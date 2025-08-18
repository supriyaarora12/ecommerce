"use client";

import Image from "next/image";
import { useCart } from "../context/CartContext";
import { useAuth } from "../../src/context/AuthContext";
import RouteGuard from "../../src/components/auth/RouteGuard";
import { useState, useEffect } from "react";
import { createOrder } from "../../src/services/orders";
import { addOrderToUser, getUser, saveBillingDetails } from "../../src/services/users";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [isProcessing, setIsProcessing] = useState(false);
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
  const total = subtotal + shipping;

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
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Create individual orders for each cart item
      const orderPromises = cart.map(async (item) => {
        // Create single item order
        const orderItem = {
          id: item.id,
          name: item.name,
          image: item.image,
          originalPrice: item.originalPrice,
          discountedPrice: item.discountedPrice,
          quantity: item.quantity,
          price: item.discountedPrice
        };

        // Calculate total for this single item
        const itemTotal = item.discountedPrice * item.quantity;

        // Create order for this item
        const order = {
          uid: user.uid,
          items: [orderItem], // Single item array
          totalAmount: itemTotal,
          status: "pending" as const,
          billingDetails: formData,
          paymentMethod,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        const orderId = await createOrder(order);
        await addOrderToUser(user.uid, orderId);
        
        return orderId;
      });

      // Wait for all orders to be created
      await Promise.all(orderPromises);
      
      // Save billing details to user profile for future use
      await saveBillingDetails(user.uid, formData);
      
      // Clear cart
      clearCart();
      
      // Show success message and redirect
      alert(`${cart.length} orders placed successfully! Redirecting to your orders...`);
      router.push('/orders');
      
    } catch (error) {
      console.error('Error placing orders:', error);
      alert('Failed to place orders. Please try again.');
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
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
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
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="text-green-500">Free</span>
              </div>
              <div className="flex justify-between font-semibold text-base">
                <span>Total:</span>
                <span>${total}</span>
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
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Coupon Code"
                className="flex-1 border border-gray-300 rounded p-3"
              />
              <button type="button" className="bg-red-500 text-white px-5 rounded hover:bg-red-600">
                Apply Coupon
              </button>
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
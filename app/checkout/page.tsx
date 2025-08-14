"use client";

import Image from "next/image";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function CheckoutPage() {
  const { cart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("bank");

  const subtotal = cart.reduce((sum, item) => sum + item.discountedPrice * item.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  return (
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
          <input type="text" placeholder="First Name *" className="w-full  border-gray-300 rounded p-3" />
          <input type="text" placeholder="Company Name" className="w-full  border-gray-300 rounded p-3" />
          <input type="text" placeholder="Street Address *" className="w-full border-gray-300 rounded p-3" />
          <input type="text" placeholder="Apartment, floor, etc. (optional)" className="w-full  border-gray-300 rounded p-3" />
          <input type="text" placeholder="Town/City *" className="w-full  border-gray-300 rounded p-3" />
          <input type="text" placeholder="Phone Number *" className="w-full  border-gray-300 rounded p-3" />
          <input type="email" placeholder="Email Address *" className="w-full  border-gray-300 rounded p-3" />

          {/* Save info */}
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="w-4 h-4" />
            Save this information for faster check-out next time
          </label>
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

          {/* Subtotal & Shipping */}
          <div className="border-t pt-4 space-y-2 text-sm">
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
          <button className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useCart } from "../context/CartContext";
import { useAuth } from "../../src/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, loading, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.discountedPrice * item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Debug Info - Remove this in production */}
      {user && (
        <div className="mb-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold mb-2">Debug Info:</h3>
          <p><strong>User ID:</strong> {user.uid}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Cart Items:</strong> {cart.length}</p>
          <p><strong>Total Value:</strong> ${subtotal}</p>
        </div>
      )}

      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-gray-500">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        / <span className="text-gray-800">Cart</span>
      </nav>

      {/* Cart Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Price</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Subtotal</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {cart.length > 0 ? (
              cart.map((item) => (
                <tr key={item.id} className="border-t">
                  {/* Product */}
                  <td className="p-4 flex items-center gap-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="rounded"
                    />
                    <span>{item.name}</span>
                  </td>

                  {/* Price */}
                  <td className="p-4">${item.discountedPrice}</td>

                  {/* Quantity */}
                  <td className="p-4">
                    <select
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, Number(e.target.value))
                      }
                      className="border border-gray-300 rounded px-2 py-1"
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Subtotal */}
                  <td className="p-4">
                    ${item.discountedPrice * item.quantity}
                  </td>

                  {/* Remove Button */}
                  <td className="p-4">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="p-6 text-center text-gray-500"
                >
                  Your cart is empty.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        <Link
          href="/"
          className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-50"
        >
          Return To Shop
        </Link>
        <div className="flex gap-2">
          <button 
            onClick={clearCart}
            className="border border-red-300 text-red-600 px-6 py-2 rounded hover:bg-red-50"
          >
            Clear Cart
          </button>
          <button className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-50">
            Update Cart
          </button>
        </div>
      </div>

      {/* Coupon + Cart Total */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        {/* Coupon */}
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Coupon Code"
            className="border border-gray-300 rounded px-4 h-[56px] flex-1"
          />
          <button className="bg-[#DB4444] text-white rounded h-[56px] px-6 font-medium hover:bg-[#C13C3C]">
            Apply Coupon
          </button>
        </div>

        {/* Cart Total */}
        <div className="border border-gray-300 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">Cart Total</h3>
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total:</span>
            <span>${subtotal}</span>
          </div>
          <button
            onClick={() => router.push("/checkout")}
            className="bg-red-500 text-white w-full block text-center py-3 mt-6 rounded hover:bg-red-600"
            disabled={cart.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

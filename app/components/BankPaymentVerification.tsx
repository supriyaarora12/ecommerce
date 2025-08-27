"use client";

import { useState } from "react";
import { Order } from "../../src/services/orders";
import { updatePaymentStatus } from "../../src/services/orders";

interface BankPaymentVerificationProps {
  order: Order;
  onStatusUpdate: () => void;
}

export default function BankPaymentVerification({ order, onStatusUpdate }: BankPaymentVerificationProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusUpdate = async (newStatus: "verified" | "failed") => {
    if (!order.id) return;

    setIsUpdating(true);
    try {
      await updatePaymentStatus(order.id, newStatus);
      onStatusUpdate();
    } catch (error) {
      console.error('Error updating payment status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!order.paymentDetails || order.paymentMethod !== "bank") {
    return null;
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
      <h4 className="font-semibold text-blue-900 mb-3">Bank Payment Verification</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-blue-800">
            <span className="font-medium">Bank:</span> {order.paymentDetails.bankName}
          </p>
          <p className="text-sm text-blue-800">
            <span className="font-medium">Account Holder:</span> {order.paymentDetails.accountHolderName}
          </p>
          <p className="text-sm text-blue-800">
            <span className="font-medium">Transaction ID:</span> {order.paymentDetails.transactionId}
          </p>
        </div>
        <div>
          <p className="text-sm text-blue-800">
            <span className="font-medium">Payment Amount:</span> ${order.paymentDetails.paymentAmount}
          </p>
          <p className="text-sm text-blue-800">
            <span className="font-medium">Current Status:</span> 
            <span className={`ml-1 px-2 py-1 rounded-full text-xs font-medium ${
              order.paymentDetails.paymentStatus === "verified" 
                ? "bg-green-100 text-green-800" 
                : order.paymentDetails.paymentStatus === "failed"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
            }`}>
              {order.paymentDetails.paymentStatus?.replace('_', ' ').toUpperCase()}
            </span>
          </p>
        </div>
      </div>

      {order.paymentDetails.paymentStatus === "pending_verification" && (
        <div className="flex gap-2">
          <button
            onClick={() => handleStatusUpdate("verified")}
            disabled={isUpdating}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
          >
            {isUpdating ? 'Updating...' : 'Mark as Verified'}
          </button>
          <button
            onClick={() => handleStatusUpdate("failed")}
            disabled={isUpdating}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
          >
            {isUpdating ? 'Updating...' : 'Mark as Failed'}
          </button>
        </div>
      )}

      {order.paymentDetails.paymentStatus === "verified" && (
        <div className="bg-green-100 border border-green-300 rounded-lg p-3">
          <p className="text-sm text-green-800">
            <strong>✓ Payment Verified:</strong> This bank payment has been verified and the order is ready for processing.
          </p>
        </div>
      )}

      {order.paymentDetails.paymentStatus === "failed" && (
        <div className="bg-red-100 border border-red-300 rounded-lg p-3">
          <p className="text-sm text-red-800">
            <strong>✗ Payment Failed:</strong> This bank payment could not be verified. Please contact the customer.
          </p>
        </div>
      )}
    </div>
  );
}

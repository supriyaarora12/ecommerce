"use client";

import { useState } from "react";

interface BankPaymentFormProps {
  totalAmount: number;
  onPaymentSubmit: (paymentDetails: BankPaymentDetails) => void;
  isProcessing: boolean;
}

export interface BankPaymentDetails {
  accountHolderName: string;
  accountNumber: string;
  bankName: string;
  routingNumber: string;
  transactionId: string;
  paymentAmount: number;
}

export default function BankPaymentForm({ totalAmount, onPaymentSubmit, isProcessing }: BankPaymentFormProps) {
  const [formData, setFormData] = useState({
    accountHolderName: "",
    accountNumber: "",
    bankName: "",
    routingNumber: "",
    transactionId: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.accountHolderName.trim()) {
      newErrors.accountHolderName = "Account holder name is required";
    }

    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = "Account number is required";
    } else if (!/^\d{8,17}$/.test(formData.accountNumber.replace(/\s/g, ''))) {
      newErrors.accountNumber = "Please enter a valid account number (8-17 digits)";
    }

    if (!formData.bankName.trim()) {
      newErrors.bankName = "Bank name is required";
    }

    if (!formData.routingNumber.trim()) {
      newErrors.routingNumber = "Routing number is required";
    } else if (!/^\d{9}$/.test(formData.routingNumber.replace(/\s/g, ''))) {
      newErrors.routingNumber = "Routing number must be 9 digits";
    }

    if (!formData.transactionId.trim()) {
      newErrors.transactionId = "Transaction ID is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const paymentDetails: BankPaymentDetails = {
        ...formData,
        paymentAmount: totalAmount
      };
      onPaymentSubmit(paymentDetails);
    }
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Bank Transfer Details</h3>
          <p className="text-sm text-gray-600">Please provide your bank transfer information</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="accountHolderName" className="block text-sm font-medium text-gray-700 mb-1">
              Account Holder Name *
            </label>
            <input
              type="text"
              id="accountHolderName"
              name="accountHolderName"
              value={formData.accountHolderName}
              onChange={handleInputChange}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.accountHolderName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter account holder name"
            />
            {errors.accountHolderName && (
              <p className="text-red-500 text-xs mt-1">{errors.accountHolderName}</p>
            )}
          </div>

          <div>
            <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Account Number *
            </label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleInputChange}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.accountNumber ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter account number"
            />
            {errors.accountNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.accountNumber}</p>
            )}
          </div>

          <div>
            <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-1">
              Bank Name *
            </label>
            <input
              type="text"
              id="bankName"
              name="bankName"
              value={formData.bankName}
              onChange={handleInputChange}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.bankName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter bank name"
            />
            {errors.bankName && (
              <p className="text-red-500 text-xs mt-1">{errors.bankName}</p>
            )}
          </div>

          <div>
            <label htmlFor="routingNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Routing Number *
            </label>
            <input
              type="text"
              id="routingNumber"
              name="routingNumber"
              value={formData.routingNumber}
              onChange={handleInputChange}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.routingNumber ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter 9-digit routing number"
            />
            {errors.routingNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.routingNumber}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700 mb-1">
            Transaction ID *
          </label>
          <input
            type="text"
            id="transactionId"
            name="transactionId"
            value={formData.transactionId}
            onChange={handleInputChange}
            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.transactionId ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your bank transaction ID"
          />
          {errors.transactionId && (
            <p className="text-red-500 text-xs mt-1">{errors.transactionId}</p>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-blue-900">Payment Amount</h4>
              <p className="text-sm text-blue-700">Please transfer exactly this amount</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-blue-900">${totalAmount.toFixed(2)}</p>
            </div>
          </div>
        </div>

                 <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
           <div className="flex items-start gap-3">
             <svg className="w-5 h-5 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
             </svg>
             {/* <div>
               <h4 className="text-sm font-medium text-green-900">DEMO MODE - No Real Money Required</h4>
               <p className="text-sm text-green-700 mt-1">
                 This is a demonstration system. You can use any test data for the bank details and transaction ID. 
                 No actual money will be transferred.
               </p>
             </div> */}
           </div>
         </div>

         <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
           <div className="flex items-start gap-3">
             <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
               <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
             </svg>
             <div>
               <h4 className="text-sm font-medium text-yellow-900">Demo Information</h4>
               <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                 <li>• Use any test data for bank details (e.g., Demo Bank, 1234567890)</li>
                 <li>• Transaction ID can be any text (e.g., DEMO-TXN-001)</li>
                 <li>• Your order will be created with pending verification status</li>
                 <li>• Admin will verify the payment in the admin panel</li>
               </ul>
             </div>
           </div>
         </div>

        <button
          type="submit"
          disabled={isProcessing}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isProcessing ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing Payment...
            </div>
          ) : (
            `Confirm Bank Transfer - $${totalAmount.toFixed(2)}`
          )}
        </button>
      </form>
    </div>
  );
}

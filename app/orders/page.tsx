"use client";

import { useAuth } from "../../src/context/AuthContext";
import RouteGuard from "../../src/components/auth/RouteGuard";
import { useState, useEffect } from "react";
import { getUserOrders } from "../../src/services/orders";
import { Order } from "../../src/services/orders";
import Image from "next/image";
import Link from 'next/link';

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const userOrders = await getUserOrders(user.uid);
        setOrders(userOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      } catch (error) {
        console.error('Error loading orders:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'paid':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <RouteGuard requireAuth>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading orders...</p>
          </div>
        </div>
      </RouteGuard>
    );
  }

  return (
    <RouteGuard requireAuth>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          Account / <span className="text-black font-medium">My Orders</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">No orders yet</h2>
            <p className="text-gray-500 mb-6">Start shopping to see your orders here</p>
            <Link
              href="/" 
              className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 pb-4 border-b border-gray-200">
                  <div>
                    <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                    <p className="text-gray-600 text-sm">
                      Placed on {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-2 sm:mt-0">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <span className="text-lg font-bold text-red-500">
                      ${order.totalAmount}
                    </span>
                  </div>
                </div>

                {/* Billing Details */}
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Billing Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <p><span className="font-medium">Name:</span> {order.billingDetails.firstName} {order.billingDetails.lastName}</p>
                    <p><span className="font-medium">Email:</span> {order.billingDetails.emailAddress}</p>
                    <p><span className="font-medium">Phone:</span> {order.billingDetails.phoneNumber}</p>
                    <p><span className="font-medium">Address:</span> {order.billingDetails.streetAddress}</p>
                    <p><span className="font-medium">City:</span> {order.billingDetails.townCity}</p>
                    <p><span className="font-medium">Payment:</span> {order.paymentMethod}</p>
                  </div>
                </div>

                {/* Bank Payment Details */}
                {order.paymentMethod === "bank" && order.paymentDetails && (
                  <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold mb-2 text-blue-900">Bank Payment Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <p><span className="font-medium text-blue-800">Bank:</span> {order.paymentDetails.bankName}</p>
                      <p><span className="font-medium text-blue-800">Account Holder:</span> {order.paymentDetails.accountHolderName}</p>
                      <p><span className="font-medium text-blue-800">Transaction ID:</span> {order.paymentDetails.transactionId}</p>
                      <p><span className="font-medium text-blue-800">Payment Status:</span> 
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
                    {order.paymentDetails.paymentStatus === "pending_verification" && (
                      <div className="mt-3 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
                        <p className="text-sm text-yellow-800">
                          <strong>Note:</strong> Your bank payment is being verified. We'll update the status once confirmed.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Order Items */}
                <div>
                  <h4 className="font-semibold mb-3">Order Items</h4>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 border border-gray-100 rounded-lg">
                        <Image 
                          src={item.image} 
                          alt={item.name} 
                          width={60} 
                          height={60} 
                          className="object-contain"
                        />
                        <div className="flex-1">
                          <h5 className="font-medium">{item.name}</h5>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${item.price}</p>
                          <p className="text-sm text-gray-500 line-through">${item.originalPrice}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </RouteGuard>
  );
}

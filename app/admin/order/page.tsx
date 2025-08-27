"use client";

import { useAdmin } from "../../../src/context/AdminContext";
import { useEffect, useState } from "react";
import Image from "next/image";
import BankPaymentVerification from "../../components/BankPaymentVerification";

export default function AdminOrderPage() {
  const {
    isAdmin,
    loading,
    orders,
    totalOrders,
    currentPage,
    pageSize,
    statusFilter,
    searchQuery,
    loadingOrders,
    loadOrders,
    updateOrder,
    setStatusFilter,
    setSearchQuery,
    setPageSize,
  } = useAdmin();

  // Add error handling
  const [error, setError] = useState<string | null>(null);

  // Debug logging
  console.log('AdminOrderPage render:', { isAdmin, loading, loadingOrders, ordersLength: orders.length });

  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  useEffect(() => {
    if (isAdmin && !loadingOrders && orders.length === 0) {
      loadOrders().catch(err => {
        console.error('Error loading orders:', err);
        setError('Failed to load orders. Please refresh the page.');
      });
    }
  }, [isAdmin]);

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
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
  setUpdatingStatus(orderId);
  try {
    // Validate newStatus against allowed values
    if (
      newStatus === "pending" ||
      newStatus === "paid" ||
      newStatus === "shipped" ||
      newStatus === "delivered" ||
      newStatus === "cancelled"
    ) {
      await updateOrder(orderId, newStatus);
    } else {
      console.warn("Invalid status:", newStatus);
    }
  } catch (error) {
    console.error("Error updating order status:", error);
  } finally {
    setUpdatingStatus(null);
  }
};
  const totalPages = Math.ceil(totalOrders / pageSize);

  // Show loading state while admin context is initializing
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Initializing admin panel...</p>
        </div>
      </div>
    );
  }

  // Show loading state while orders are being fetched
  if (loadingOrders && orders.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  // Check if user is admin
  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access the admin panel.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-red-900">Error</h4>
              <p className="text-sm text-red-700">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-600 hover:text-red-800"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600">Manage and track all customer orders</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Total Orders</p>
          <p className="text-2xl font-bold text-red-500">{totalOrders}</p>
        </div>
      </div>

      {/* Debug Controls */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Debug Info</h3>
            <p className="text-xs text-gray-600">
              isAdmin: {isAdmin ? 'Yes' : 'No'} | Loading: {loading ? 'Yes' : 'No'} | Orders Loading: {loadingOrders ? 'Yes' : 'No'} | Orders Count: {orders.length}
            </p>
          </div>
          <button
            onClick={() => loadOrders().catch(err => setError(err.message))}
            disabled={loadingOrders}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 text-sm"
          >
            {loadingOrders ? 'Loading...' : 'Load Orders'}
          </button>
        </div>
      </div>

      {/* Bank Payment Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-blue-900 mb-1">Bank Payment Verification Instructions</h3>
            <div className="text-sm text-blue-800 space-y-1">
              <p><strong>To verify bank payments:</strong></p>
              <ol className="list-decimal list-inside ml-2 space-y-1">
                <li>Look for orders with <span className="bg-blue-100 text-blue-800 px-1 rounded text-xs">Verify Payment</span> badge in the Actions column</li>
                <li>Click the <span className="text-red-500 font-medium">"View"</span> button to open order details</li>
                <li>Scroll down to see the <strong>"Bank Payment Verification"</strong> section</li>
                <li>Click <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">"Mark as Verified"</span> or <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">"Mark as Failed"</span></li>
              </ol>
              <p className="mt-2"><strong>Note:</strong> Only bank payment orders will show verification options.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Orders
            </label>
            <input
              type="text"
              placeholder="Order ID, customer name, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status Filter
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
              <option value="bank_pending">Bank Payments Pending</option>
            </select>
          </div>

          {/* Page Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Items per page
            </label>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          {/* Refresh Button */}
          <div className="flex items-end">
            <button
              onClick={() => loadOrders()}
              disabled={loadingOrders}
              className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingOrders ? 'Loading...' : 'Refresh'}
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {order.items[0] && (
                          <Image
                            src={order.items[0].image}
                            alt={order.items[0].name}
                            width={40}
                            height={40}
                            className="rounded-md object-cover"
                          />
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          #{order.id}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">
                        {order.billingDetails.firstName} {order.billingDetails.lastName}
                      </div>
                      <div className="text-gray-500">{order.billingDetails.emailAddress}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    ${order.totalAmount}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id || '')}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                        {selectedOrder === order.id ? 'Hide' : 'View'}
                      </button>
                      
                      {/* Bank Payment Indicator */}
                      {order.paymentMethod === "bank" && order.paymentDetails && (
                        <div className="flex items-center gap-1">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            {order.paymentDetails.paymentStatus === "pending_verification" ? "Verify Payment" : order.paymentDetails.paymentStatus}
                          </span>
                        </div>
                      )}
                      
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order.id || '', e.target.value)}
                        disabled={updatingStatus === order.id}
                        className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => loadOrders(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => loadOrders(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(currentPage * pageSize, totalOrders)}
                  </span>{' '}
                  of <span className="font-medium">{totalOrders}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => loadOrders(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => loadOrders(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Order Details #{selectedOrder}
                </h3>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              {orders.find(o => o.id === selectedOrder) && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900">Customer Information</h4>
                      <div className="text-sm text-gray-600 mt-2">
                        <p><strong>Name:</strong> {orders.find(o => o.id === selectedOrder)?.billingDetails.firstName} {orders.find(o => o.id === selectedOrder)?.billingDetails.lastName}</p>
                        <p><strong>Email:</strong> {orders.find(o => o.id === selectedOrder)?.billingDetails.emailAddress}</p>
                        <p><strong>Phone:</strong> {orders.find(o => o.id === selectedOrder)?.billingDetails.phoneNumber}</p>
                        <p><strong>Address:</strong> {orders.find(o => o.id === selectedOrder)?.billingDetails.streetAddress}</p>
                        <p><strong>City:</strong> {orders.find(o => o.id === selectedOrder)?.billingDetails.townCity}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Order Information</h4>
                      <div className="text-sm text-gray-600 mt-2">
                        <p><strong>Status:</strong> {orders.find(o => o.id === selectedOrder)?.status}</p>
                        <p><strong>Payment Method:</strong> {orders.find(o => o.id === selectedOrder)?.paymentMethod}</p>
                        <p><strong>Total Amount:</strong> ${orders.find(o => o.id === selectedOrder)?.totalAmount}</p>
                        <p><strong>Created:</strong> {orders.find(o => o.id === selectedOrder)?.createdAt && formatDate(orders.find(o => o.id === selectedOrder)?.createdAt || '')}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Order Items</h4>
                    <div className="space-y-2">
                      {orders.find(o => o.id === selectedOrder)?.items.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                            className="rounded-md object-cover"
                          />
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${item.price}</p>
                            <p className="text-sm text-gray-500 line-through">${item.originalPrice}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bank Payment Verification */}
                  {orders.find(o => o.id === selectedOrder) && (
                    <BankPaymentVerification
                      order={orders.find(o => o.id === selectedOrder)!}
                      onStatusUpdate={loadOrders}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

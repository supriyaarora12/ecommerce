"use client";

import { useAdmin } from "../../../src/context/AdminContext";
import { useEffect } from "react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const { loadOrders, totalOrders, orders } = useAdmin();

  useEffect(() => {
    loadOrders();
  }, []);

  // Calculate some basic stats
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const paidOrders = orders.filter(order => order.status === 'paid').length;
  const shippedOrders = orders.filter(order => order.status === 'shipped').length;
  const deliveredOrders = orders.filter(order => order.status === 'delivered').length;
  const cancelledOrders = orders.filter(order => order.status === 'cancelled').length;

  const totalRevenue = orders
    .filter(order => order.status === 'delivered' || order.status === 'shipped')
    .reduce((sum, order) => sum + order.totalAmount, 0);

  const stats = [
    { name: 'Total Orders', value: totalOrders, color: 'bg-blue-500' },
    { name: 'Pending Orders', value: pendingOrders, color: 'bg-yellow-500' },
    { name: 'Paid Orders', value: paidOrders, color: 'bg-green-500' },
    { name: 'Shipped Orders', value: shippedOrders, color: 'bg-purple-500' },
    { name: 'Delivered Orders', value: deliveredOrders, color: 'bg-green-600' },
    { name: 'Cancelled Orders', value: cancelledOrders, color: 'bg-red-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Overview of your e-commerce store</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
                <div className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`}>
                  📊
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Card */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Overview</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Revenue (Delivered & Shipped)</p>
            <p className="text-3xl font-bold text-green-600">${totalRevenue.toFixed(2)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Average Order Value</p>
            <p className="text-xl font-semibold text-gray-900">
              ${totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : '0.00'}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/order"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-blue-600">📦</span>
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-900">Manage Orders</p>
              <p className="text-sm text-gray-600">View and update orders</p>
            </div>
          </Link>

          <Link
            href="/admin/products"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-green-600">🛍️</span>
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-900">Manage Products</p>
              <p className="text-sm text-gray-600">Add and edit products</p>
            </div>
          </Link>

          <Link
            href="/admin/users"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-purple-600">👥</span>
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-900">Manage Users</p>
              <p className="text-sm text-gray-600">View customer accounts</p>
            </div>
          </Link>

          <Link
            href="/"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="p-2 bg-red-100 rounded-lg">
              <span className="text-red-600">🏪</span>
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-900">View Store</p>
              <p className="text-sm text-gray-600">Go to customer view</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
          <Link
            href="/admin/order"
            className="text-sm text-red-500 hover:text-red-600 font-medium"
          >
            View All
          </Link>
        </div>
        
        {orders.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No orders found</p>
        ) : (
          <div className="space-y-3">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">#{order.id}</p>
                  <p className="text-sm text-gray-600">
                    {order.billingDetails.firstName} {order.billingDetails.lastName}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">${order.totalAmount}</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'paid' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

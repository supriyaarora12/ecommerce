"use client";

import { useState, useEffect, useCallback } from 'react';
import { getAllUsers, User } from '../../../src/services/users';
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import Image from 'next/image';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const loadUsers = useCallback(async (page: number = 1) => {
    try {
      setLoading(true);
      
      // Reset pagination if it's a new search
      if (page === 1) {
        setLastDoc(null);
      }

      const result = await getAllUsers(pageSize, lastDoc);
      
      if (page === 1) {
        setUsers(result.users);
      } else {
        setUsers(prev => [...prev, ...result.users]);
      }
      
      setTotalUsers(result.total);
      setLastDoc(result.lastDoc);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  }, [pageSize, lastDoc]);

  useEffect(() => {
    loadUsers();
  }, []); // Empty dependency array

  const handleSearch = useCallback(() => {
    setCurrentPage(1);
    loadUsers(1);
  }, [loadUsers]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredUsers = users.filter(user => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      user.email?.toLowerCase().includes(query) ||
      user.displayName?.toLowerCase().includes(query) ||
      user.billingDetails?.firstName?.toLowerCase().includes(query) ||
      user.billingDetails?.lastName?.toLowerCase().includes(query)
    );
  });

  const totalPages = Math.ceil(totalUsers / pageSize);

  if (loading && users.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage customer accounts</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Total Users</p>
          <p className="text-2xl font-bold text-red-500">{totalUsers}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Users
            </label>
            <input
              type="text"
              placeholder="Email, name, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Page Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Items per page
            </label>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
                setLastDoc(null);
                loadUsers(1);
              }}
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
              onClick={() => loadUsers(1)}
              disabled={loading}
              className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.uid} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {user.photoURL ? (
                          <Image
                            src={user.photoURL}
                            alt={user.displayName || 'User'}
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-gray-600 font-medium">
                              {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.displayName || 'No Name'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="text-gray-900">
                        {user.billingDetails?.firstName} {user.billingDetails?.lastName}
                      </div>
                      <div className="text-gray-500">{user.billingDetails?.phoneNumber}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {user.billingDetails?.streetAddress ? (
                        <div>
                          <div>{user.billingDetails.streetAddress}</div>
                          <div className="text-gray-500">
                            {user.billingDetails.townCity}
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400">No address</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {user.orders ? user.orders.length : 0} orders
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {user.createdAt ? formatDate(user.createdAt) : 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedUser(selectedUser?.uid === user.uid ? null : user)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      {selectedUser?.uid === user.uid ? 'Hide' : 'View'}
                    </button>
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
                onClick={() => loadUsers(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => loadUsers(currentPage + 1)}
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
                    {Math.min(currentPage * pageSize, totalUsers)}
                  </span>{' '}
                  of <span className="font-medium">{totalUsers}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => loadUsers(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => loadUsers(currentPage + 1)}
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

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  User Details
                </h3>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Basic Information</h4>
                    <div className="text-sm text-gray-600 mt-2">
                      <p><strong>Name:</strong> {selectedUser.displayName || 'Not provided'}</p>
                      <p><strong>Email:</strong> {selectedUser.email}</p>
                      <p><strong>User ID:</strong> {selectedUser.uid}</p>
                      <p><strong>Joined:</strong> {selectedUser.createdAt ? formatDate(selectedUser.createdAt) : 'N/A'}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Contact Information</h4>
                    <div className="text-sm text-gray-600 mt-2">
                      <p><strong>Phone:</strong> {selectedUser.billingDetails?.phoneNumber || 'Not provided'}</p>
                      <p><strong>Orders:</strong> {selectedUser.orders ? selectedUser.orders.length : 0}</p>
                      <p><strong>Last Updated:</strong> {selectedUser.updatedAt ? formatDate(selectedUser.updatedAt) : 'N/A'}</p>
                    </div>
                  </div>
                </div>
                
                {selectedUser.billingDetails && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Billing Address</h4>
                    <div className="text-sm text-gray-600">
                      <p>{selectedUser.billingDetails.firstName} {selectedUser.billingDetails.lastName}</p>
                      <p>{selectedUser.billingDetails.streetAddress}</p>
                      {selectedUser.billingDetails.apartment && (
                        <p>Apt: {selectedUser.billingDetails.apartment}</p>
                      )}
                      <p>{selectedUser.billingDetails.townCity}</p>
                      <p>Phone: {selectedUser.billingDetails.phoneNumber}</p>
                    </div>
                  </div>
                )}

                {selectedUser.addresses && selectedUser.addresses.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Saved Addresses</h4>
                    <div className="space-y-2">
                      {selectedUser.addresses.map((address, index) => (
                        <div key={index} className="text-sm text-gray-600 p-2 border rounded">
                          <p><strong>{address.label}:</strong></p>
                          <p>{address.line1}</p>
                          <p>{address.city}, {address.state} {address.zip}</p>
                          <p>{address.country}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { getAllOrders, updateOrderStatus, Order } from '../services/orders';
import { QueryDocumentSnapshot , DocumentData} from 'firebase/firestore';

interface AdminContextType {
  isAdmin: boolean;
  loading: boolean;
  orders: Order[];
  totalOrders: number;
  currentPage: number;
  pageSize: number;
  statusFilter: string;
  searchQuery: string;
  loadingOrders: boolean;
  loadOrders: (page?: number, status?: string, search?: string) => Promise<void>;
  updateOrder: (orderId: string, status: Order["status"]) => Promise<void>;
  setStatusFilter: (status: string) => void;
  setSearchQuery: (query: string) => void;
  setPageSize: (size: number) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);

  // Check if user is admin
  useEffect(() => {
    if (user) {
      // Simple admin check - in production you'd want proper role-based auth
      // const adminCheck = user.email === "admin@exclusive.com" || user.email?.includes("admin");
      // setIsAdmin(adminCheck);
      setIsAdmin(true); // Allow all authenticated users for now
    } else {
      setIsAdmin(false);
    }
    setLoading(false);
  }, [user]);

  const loadOrders = async (page: number = 1, status: string = statusFilter, search: string = searchQuery) => {
    if (!isAdmin) return;

    try {
      setLoadingOrders(true);
      
      // Reset pagination if filters change
      if (status !== statusFilter || search !== searchQuery) {
        setLastDoc(null);
        setCurrentPage(1);
      }

      const result = await getAllOrders(pageSize, lastDoc, status, search);
      
      setOrders(result.orders);
      setTotalOrders(result.total);
      setLastDoc(result.lastDoc);
      setCurrentPage(page);
      setStatusFilter(status);
      setSearchQuery(search);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoadingOrders(false);
    }
  };

  const updateOrder = async (orderId: string, status: Order["status"]) => {
    if (!isAdmin) return;

    try {
      await updateOrderStatus(orderId, status);
      // Refresh orders after update
      await loadOrders(currentPage, statusFilter, searchQuery);
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  };

  const handleSetStatusFilter = (status: string) => {
    setStatusFilter(status);
    loadOrders(1, status, searchQuery);
  };

  const handleSetSearchQuery = (query: string) => {
    setSearchQuery(query);
    loadOrders(1, statusFilter, query);
  };

  const handleSetPageSize = (size: number) => {
    setPageSize(size);
    setLastDoc(null);
    setCurrentPage(1);
    loadOrders(1, statusFilter, searchQuery);
  };

  return (
    <AdminContext.Provider value={{
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
      setStatusFilter: handleSetStatusFilter,
      setSearchQuery: handleSetSearchQuery,
      setPageSize: handleSetPageSize,
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
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

  // Use refs to avoid dependency issues
  const statusFilterRef = useRef(statusFilter);
  const pageSizeRef = useRef(pageSize);
  const lastDocRef = useRef(lastDoc);

  // Update refs when state changes
  useEffect(() => {
    statusFilterRef.current = statusFilter;
  }, [statusFilter]);

  useEffect(() => {
    pageSizeRef.current = pageSize;
  }, [pageSize]);

  useEffect(() => {
    lastDocRef.current = lastDoc;
  }, [lastDoc]);

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

  const loadOrders = useCallback(async (page: number = 1, status?: string, search?: string) => {
    if (!isAdmin) return;

    const currentStatus = status || statusFilterRef.current;
    const currentPageSize = pageSizeRef.current;
    const currentLastDoc = lastDocRef.current;

    try {
      setLoadingOrders(true);
      
      // Reset pagination if filters change
      if (status && status !== statusFilterRef.current) {
        setLastDoc(null);
        setCurrentPage(1);
      }

      const result = await getAllOrders(currentPageSize, currentLastDoc, currentStatus);
      
      setOrders(result.orders);
      setTotalOrders(result.total);
      setLastDoc(result.lastDoc);
      setCurrentPage(page);
      if (status && status !== statusFilterRef.current) {
        setStatusFilter(status);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoadingOrders(false);
    }
  }, [isAdmin]); // Only depend on isAdmin

  const updateOrder = async (orderId: string, status: Order["status"]) => {
    if (!isAdmin) return;

    try {
      await updateOrderStatus(orderId, status);
      // Refresh orders after update
      await loadOrders(currentPage, statusFilter);
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  };

  const handleSetStatusFilter = useCallback((status: string) => {
    setStatusFilter(status);
    loadOrders(1, status);
  }, [loadOrders]);

  const handleSetSearchQuery = useCallback((query: string) => {
    setSearchQuery(query);
    loadOrders(1, statusFilterRef.current);
  }, [loadOrders]);

  const handleSetPageSize = useCallback((size: number) => {
    setPageSize(size);
    setLastDoc(null);
    setCurrentPage(1);
    loadOrders(1, statusFilterRef.current);
  }, [loadOrders]);

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

"use client";

import { useAuth } from '../../context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface RouteGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireNoAuth?: boolean;
}

export default function RouteGuard({ 
  children, 
  requireAuth = false, 
  requireNoAuth = false 
}: RouteGuardProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return; // Wait for auth state to load

    // If route requires authentication and user is not authenticated
    if (requireAuth && !user) {
      router.push('/login');
      return;
    }

    // If route requires no authentication and user is authenticated
    if (requireNoAuth && user) {
      // Try to go back, if no history then go to home
      if (window.history.length > 1) {
        router.back();
      } else {
        router.push('/');
      }
      return;
    }
  }, [user, loading, requireAuth, requireNoAuth, router, pathname]);

  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
      </div>
    );
  }

  // If route requires auth and user is not authenticated, don't render
  if (requireAuth && !user) {
    return null;
  }

  // If route requires no auth and user is authenticated, don't render
  if (requireNoAuth && user) {
    return null;
  }

  return <>{children}</>;
}
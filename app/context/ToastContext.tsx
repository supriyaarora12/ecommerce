'use client';
import { createContext, useContext, ReactNode } from 'react';
import toast, { ToastOptions } from 'react-hot-toast';

interface ToastContextType {
  showSuccess: (message: string, options?: ToastOptions) => void;
  showError: (message: string, options?: ToastOptions) => void;
  showInfo: (message: string, options?: ToastOptions) => void;
  showWarning: (message: string, options?: ToastOptions) => void;
  showLoading: (message: string, options?: ToastOptions) => string;
  dismissToast: (toastId: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const defaultOptions: ToastOptions = {
    duration: 4000,
    position: 'top-right',
    style: {
      background: '#363636',
      color: '#fff',
      borderRadius: '8px',
      fontSize: '14px',
      padding: '12px 16px',
    },
  };

  const showSuccess = (message: string, options?: ToastOptions) => {
    toast.success(message, {
      ...defaultOptions,
      ...options,
      style: {
        ...defaultOptions.style,
        background: '#10B981',
        ...options?.style,
      },
    });
  };

  const showError = (message: string, options?: ToastOptions) => {
    toast.error(message, {
      ...defaultOptions,
      ...options,
      style: {
        ...defaultOptions.style,
        background: '#EF4444',
        ...options?.style,
      },
    });
  };

  const showInfo = (message: string, options?: ToastOptions) => {
    toast(message, {
      ...defaultOptions,
      ...options,
      style: {
        ...defaultOptions.style,
        background: '#3B82F6',
        ...options?.style,
      },
    });
  };

  const showWarning = (message: string, options?: ToastOptions) => {
    toast(message, {
      ...defaultOptions,
      ...options,
      style: {
        ...defaultOptions.style,
        background: '#F59E0B',
        ...options?.style,
      },
    });
  };

  const showLoading = (message: string, options?: ToastOptions) => {
    return toast.loading(message, {
      ...defaultOptions,
      ...options,
      style: {
        ...defaultOptions.style,
        background: '#6B7280',
        ...options?.style,
      },
    });
  };

  const dismissToast = (toastId: string) => {
    toast.dismiss(toastId);
  };

  return (
    <ToastContext.Provider
      value={{
        showSuccess,
        showError,
        showInfo,
        showWarning,
        showLoading,
        dismissToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

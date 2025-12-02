import React, { createContext, useContext, useState, useCallback } from 'react';
import { Icon } from '@iconify/react';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const Toast = ({ id, type, message, onClose }) => {
  const getToastConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: 'mdi:check-circle',
          iconBg: 'bg-green-50 dark:bg-green-900/20',
          iconColor: 'text-green-600',
          border: 'border-green-500',
          title: 'Success! Action Completed!'
        };
      case 'error':
        return {
          icon: 'mdi:alert-octagon',
          iconBg: 'bg-red-50 dark:bg-red-900/20',
          iconColor: 'text-red-600',
          border: 'border-red-500',
          title: 'Something Went Wrong'
        };
      case 'warning':
        return {
          icon: 'mdi:alert',
          iconBg: 'bg-yellow-50 dark:bg-yellow-900/20',
          iconColor: 'text-yellow-600',
          border: 'border-yellow-500',
          title: 'Alert: Double Check Required'
        };
      default: // info
        return {
          icon: 'mdi:information',
          iconBg: 'bg-blue-50 dark:bg-blue-900/20',
          iconColor: 'text-blue-600',
          border: 'border-blue-500',
          title: 'Heads Up! New Information'
        };
    }
  };

  const config = getToastConfig();

  return (
    <div
      className={`flex items-center justify-between gap-3 w-full sm:max-w-[340px] rounded-md border-b-4 p-3 shadow-lg bg-white dark:bg-boxdark ${config.border} animate-slide-in`}
    >
      <div className="flex items-center gap-4">
        <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${config.iconBg} ${config.iconColor}`}>
          <Icon icon={config.icon} width="20" />
        </div>
        <div>
          <p className="text-sm text-black dark:text-white">
            {message || config.title}
          </p>
        </div>
      </div>
      <button
        onClick={() => onClose(id)}
        className="text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors"
      >
        <Icon icon="mdi:close" width="24" />
      </button>
    </div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((type, message, duration = 5000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, message }]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
      }, duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const toast = {
    success: (message, duration) => addToast('success', message, duration),
    error: (message, duration) => addToast('error', message, duration),
    warning: (message, duration) => addToast('warning', message, duration),
    info: (message, duration) => addToast('info', message, duration),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-999999 flex flex-col gap-3">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            id={toast.id}
            type={toast.type}
            message={toast.message}
            onClose={removeToast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

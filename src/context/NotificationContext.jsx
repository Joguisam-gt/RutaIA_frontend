import React, { createContext, useContext, useState, useCallback } from 'react';
import { Toast } from '../components/common/Toast/Toast';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(({ message, type = 'info', duration = 4000, undoAction = null }) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    const newToast = {
      id,
      message,
      type,
      undoAction,
    };

    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        dismissToast(id);
      }, duration);
    }

    return id;
  }, [dismissToast]);

  const showSuccess = useCallback((message, options = {}) => {
    return showToast({ message, type: 'success', ...options });
  }, [showToast]);

  const showError = useCallback((message, options = {}) => {
    return showToast({ message, type: 'error', ...options });
  }, [showToast]);

  const showInfo = useCallback((message, options = {}) => {
    return showToast({ message, type: 'info', ...options });
  }, [showToast]);

  const showWarning = useCallback((message, options = {}) => {
    return showToast({ message, type: 'warning', ...options });
  }, [showToast]);

  const value = {
    showToast,
    showSuccess,
    showError,
    showInfo,
    showWarning,
    dismissToast,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none max-w-md w-full">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast toast={toast} onDismiss={dismissToast} />
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification debe ser utilizado dentro de un NotificationProvider');
  }
  return context;
};

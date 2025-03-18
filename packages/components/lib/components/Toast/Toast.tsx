import './Toast.css';
import React, { useEffect, useState } from 'react';
import { ToastProps } from './types';

export const Toast: React.FC<ToastProps> = ({
  children,
  variant = 'info',
  position = 'bottom-right',
  isVisible = false,
  duration = 3000,
  hasIcon = true,
  isDismissable = true,
  onClose,
  className = '',
  ...rest
}) => {
  const [isShowing, setIsShowing] = useState(isVisible);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsShowing(true);
      setIsExiting(false);
    }
  }, [isVisible]);

  useEffect(() => {
    let timer: number;

    if (isShowing && duration > 0) {
      timer = setTimeout(() => {
        closeToast();
      }, duration);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isShowing, duration]);

  const closeToast = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsShowing(false);
      if (onClose) onClose();
    }, 300); // Match the CSS transition duration
  };

  if (!isShowing) return null;

  const toastClasses = [
    'sb-toast',
    `sb-toast-${variant}`,
    `sb-toast-${position}`,
    isExiting ? 'sb-toast-exit' : '',
    className
  ]
    .filter(Boolean)
    .join(' ');

  const getIcon = () => {
    switch (variant) {
      case 'success':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="sb-toast-icon"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        );
      case 'error':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="sb-toast-icon"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        );
      case 'warning':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="sb-toast-icon"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        );
      case 'info':
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="sb-toast-icon"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        );
    }
  };

  return (
    <div className={toastClasses} role="alert" aria-live="assertive" {...rest}>
      {hasIcon && <div className="sb-toast-icon-container">{getIcon()}</div>}
      <div className="sb-toast-content">{children}</div>
      {isDismissable && (
        <button className="sb-toast-close" onClick={closeToast} aria-label="Close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            width="16"
            height="16"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Toast;

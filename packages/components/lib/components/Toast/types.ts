// types.ts
import { HTMLAttributes } from 'react';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center';

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  variant?: ToastVariant;
  position?: ToastPosition;
  isVisible?: boolean;
  duration?: number;
  hasIcon?: boolean;
  isDismissable?: boolean;
  onClose?: () => void;
}

export interface ToastContextProps {
  showToast: (props: Omit<ToastProps, 'isVisible'> & { content: React.ReactNode }) => string;
  closeToast: (id: string) => void;
  closeAllToasts: () => void;
}

export interface ToastProviderProps {
  children: React.ReactNode;
  maxToasts?: number;
}

export interface ToastState {
  toasts: {
    id: string;
    content: React.ReactNode;
    props: Omit<ToastProps, 'isVisible' | 'children'>;
  }[];
}

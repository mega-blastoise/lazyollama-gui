// ToastContext.tsx
import React, { createContext, useContext, useReducer } from 'react';
import Toast from './Toast';
import { 
  ToastContextProps, 
  ToastProviderProps, 
  ToastProps, 
  ToastState 
} from './types';

// Create context
const ToastContext = createContext<ToastContextProps | undefined>(undefined);

// Action types
type ToastAction = 
  | { type: 'ADD_TOAST'; payload: { id: string; content: React.ReactNode; props: Omit<ToastProps, 'isVisible' | 'children'> } }
  | { type: 'REMOVE_TOAST'; payload: { id: string } }
  | { type: 'REMOVE_ALL_TOASTS' };

// Reducer
const toastReducer = (state: ToastState, action: ToastAction): ToastState => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [...state.toasts, action.payload]
      };
    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter(toast => toast.id !== action.payload.id)
      };
    case 'REMOVE_ALL_TOASTS':
      return {
        ...state,
        toasts: []
      };
    default:
      return state;
  }
};

// Provider component
export const ToastProvider: React.FC<ToastProviderProps> = ({ 
  children, 
  maxToasts = 5 
}) => {
  const [state, dispatch] = useReducer(toastReducer, { toasts: [] });

  const showToast = (props: Omit<ToastProps, 'isVisible'> & { content: React.ReactNode }): string => {
    const { content, ...toastProps } = props;
    const id = `toast-${Date.now()}`;

    // Remove oldest toast if we reach maxToasts
    if (state.toasts.length >= maxToasts) {
      dispatch({
        type: 'REMOVE_TOAST',
        payload: { id: state.toasts[0].id }
      });
    }

    dispatch({
      type: 'ADD_TOAST',
      payload: { id, content, props: toastProps }
    });

    return id;
  };

  const closeToast = (id: string): void => {
    dispatch({
      type: 'REMOVE_TOAST',
      payload: { id }
    });
  };

  const closeAllToasts = (): void => {
    dispatch({ type: 'REMOVE_ALL_TOASTS' });
  };

  return (
    <ToastContext.Provider value={{ showToast, closeToast, closeAllToasts }}>
      {children}
      <div className="sb-toast-container">
        {state.toasts.map(({ id, content, props }) => (
          <Toast
            key={id}
            isVisible={true}
            onClose={() => closeToast(id)}
            {...props}
          >
            {content}
          </Toast>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Custom hook
export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
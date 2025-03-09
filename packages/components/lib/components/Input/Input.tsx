import React, { InputHTMLAttributes, forwardRef, useState } from 'react';
import './Input.css';
import { InputProps } from './types';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      variant = 'default',
      label,
      helperText,
      errorText,
      isError = false,
      isRequired = false,
      isFullWidth = false,
      leftIcon,
      rightIcon,
      onClear,
      className = '',
      disabled,
      id,
      ...rest
    },
    ref
  ) => {
    const [inputId] = useState(
      () => id || `sb-input-${Math.random().toString(36).substr(2, 9)}`
    );

    const containerClasses = [
      'sb-input-container',
      isFullWidth ? 'sb-input-full-width' : '',
      className
    ]
      .filter(Boolean)
      .join(' ');

    const inputWrapperClasses = [
      'sb-input-wrapper',
      `sb-input-${variant}`,
      `sb-input-${size}`,
      isError ? 'sb-input-error' : '',
      disabled ? 'sb-input-disabled' : '',
      leftIcon ? 'sb-input-with-left-icon' : '',
      rightIcon || onClear ? 'sb-input-with-right-icon' : ''
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={containerClasses}>
        {label && (
          <label htmlFor={inputId} className="sb-input-label">
            {label}
            {isRequired && <span className="sb-input-required">*</span>}
          </label>
        )}

        <div className={inputWrapperClasses}>
          {leftIcon && <div className="sb-input-icon sb-input-icon-left">{leftIcon}</div>}

          <input
            id={inputId}
            className="sb-input"
            disabled={disabled}
            aria-invalid={isError}
            aria-describedby={helperText || errorText ? `${inputId}-helper-text` : undefined}
            required={isRequired}
            ref={ref}
            {...rest}
          />

          {rightIcon && !onClear && (
            <div className="sb-input-icon sb-input-icon-right">{rightIcon}</div>
          )}

          {onClear && rest.value && !disabled && (
            <button
              type="button"
              className="sb-input-clear-btn"
              onClick={onClear}
              aria-label="Clear input"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>

        {(helperText || errorText) && (
          <div
            id={`${inputId}-helper-text`}
            className={`sb-input-helper-text ${isError ? 'sb-input-error-text' : ''}`}
          >
            {isError ? errorText : helperText}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

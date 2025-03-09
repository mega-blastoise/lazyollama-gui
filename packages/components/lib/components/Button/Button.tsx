import './Button.css';
import React, { ButtonHTMLAttributes } from 'react';
import { ButtonProps } from './types';

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isFullWidth = false,
  leftIcon,
  rightIcon,
  isLoading = false,
  className = '',
  disabled,
  ...rest
}) => {
  const buttonClasses = [
    'sb-button',
    `sb-button-${variant}`,
    `sb-button-${size}`,
    isFullWidth ? 'sb-button-full-width' : '',
    isLoading ? 'sb-button-loading' : '',
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={buttonClasses} disabled={disabled || isLoading} {...rest}>
      {isLoading && (
        <span className="sb-button-loader">
          <span className="sb-button-loader-dot"></span>
          <span className="sb-button-loader-dot"></span>
          <span className="sb-button-loader-dot"></span>
        </span>
      )}
      {leftIcon && !isLoading && (
        <span className="sb-button-icon sb-button-icon-left">{leftIcon}</span>
      )}
      <span className="sb-button-text">{children}</span>
      {rightIcon && !isLoading && (
        <span className="sb-button-icon sb-button-icon-right">{rightIcon}</span>
      )}
    </button>
  );
};

export default Button;

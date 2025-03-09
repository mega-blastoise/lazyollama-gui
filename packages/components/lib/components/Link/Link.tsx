import React, { AnchorHTMLAttributes } from 'react';
import './Link.css';
import { LinkProps } from './types';

export const Link: React.FC<LinkProps> = ({
  children,
  variant = 'default',
  isExternal = false,
  icon,
  iconPosition = 'right',
  disabled = false,
  className = '',
  href = '#',
  ...rest
}) => {
  const linkClasses = [
    'sb-link',
    `sb-link-${variant}`,
    disabled ? 'sb-link-disabled' : '',
    className
  ]
    .filter(Boolean)
    .join(' ');

  const externalProps = isExternal
    ? {
        target: '_blank',
        rel: 'noopener noreferrer'
      }
    : {};

  return (
    <a
      className={linkClasses}
      href={disabled ? undefined : href}
      {...externalProps}
      {...rest}
      tabIndex={disabled ? -1 : 0}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault();
          return;
        }
        rest.onClick?.(e);
      }}
    >
      {icon && iconPosition === 'left' && (
        <span className="sb-link-icon sb-link-icon-left">{icon}</span>
      )}
      <span className="sb-link-text">{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="sb-link-icon sb-link-icon-right">{icon}</span>
      )}
      {isExternal && !icon && (
        <span className="sb-link-external-icon" aria-hidden="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </span>
      )}
    </a>
  );
};

export default Link;

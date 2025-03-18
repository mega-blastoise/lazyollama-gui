import './Card.css';

import React from 'react';
import { GlassCardProps } from './types';

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  elevation = 'md',
  hasBorder = false,
  hasBlur = true,
  isInteractive = false,
  alignment = 'center',
  className = '',
  ...rest
}) => {
  const cardClasses = [
    'sb-glass-card',
    `sb-glass-card-elevation-${elevation}`,
    hasBorder ? 'sb-glass-card-border' : '',
    hasBlur ? 'sb-glass-card-blur' : '',
    isInteractive ? 'sb-glass-card-interactive' : '',
    `sb-glass-card-align-${alignment}`,
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cardClasses} {...rest}>
      <div className="sb-glass-card-content">{children}</div>
    </div>
  );
};

export default GlassCard;

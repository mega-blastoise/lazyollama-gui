import './Card.css';
import React from 'react';
import { GlassCardProps } from './types';
import { useTheme } from '../../contexts/theme/ThemeContext';

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  elevation = 'md',
  hasBorder = true,
  hasBlur = true,
  isInteractive = false,
  alignment = 'start',
  className = '',
  ...rest
}) => {
  const { theme } = useTheme();

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
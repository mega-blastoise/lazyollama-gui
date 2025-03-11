import { HTMLAttributes } from 'react';

export type GlassCardElevation = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type GlassCardAlignment = 'start' | 'center' | 'end' | 'stretch';

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  elevation?: GlassCardElevation;
  hasBorder?: boolean;
  hasBlur?: boolean;
  isInteractive?: boolean;
  alignment?: GlassCardAlignment;
}
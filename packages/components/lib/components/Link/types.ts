import { AnchorHTMLAttributes } from 'react';

export type LinkVariant = 'default' | 'primary' | 'secondary' | 'subtle' | 'nav';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: LinkVariant;
  isExternal?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
}

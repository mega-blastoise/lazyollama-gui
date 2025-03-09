import { ElementType, HTMLAttributes } from 'react';

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'overline'
  | 'code';

export type TypographyAlign = 'left' | 'center' | 'right' | 'justify';
export type TypographyWeight = 'normal' | 'medium' | 'semibold' | 'bold';
export type TypographyColor = 'primary' | 'secondary' | 'tertiary' | 'brand' | 'inherit';

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  component?: ElementType;
  align?: TypographyAlign;
  weight?: TypographyWeight;
  color?: TypographyColor;
  noWrap?: boolean;
  gutterBottom?: boolean;
  truncate?: boolean;
}

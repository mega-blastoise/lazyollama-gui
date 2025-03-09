import React, { HTMLAttributes, ElementType } from 'react';
import './Typography.css';
import { TypographyProps, TypographyVariant } from './types';

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body1',
  component,
  align = 'left',
  weight,
  color = 'primary',
  noWrap = false,
  gutterBottom = false,
  truncate = false,
  className = '',
  ...rest
}) => {
  // Default component based on variant
  const Component = component || getDefaultComponent(variant);

  const typographyClasses = [
    'sb-typography',
    `sb-typography-${variant}`,
    align !== 'left' ? `sb-typography-align-${align}` : '',
    weight ? `sb-typography-weight-${weight}` : '',
    color !== 'inherit' ? `sb-typography-color-${color}` : '',
    noWrap ? 'sb-typography-no-wrap' : '',
    gutterBottom ? 'sb-typography-gutter-bottom' : '',
    truncate ? 'sb-typography-truncate' : '',
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={typographyClasses} {...rest}>
      {children}
    </Component>
  );
};

// Helper function to determine default HTML component based on variant
function getDefaultComponent(variant: TypographyVariant): ElementType {
  switch (variant) {
    case 'h1':
      return 'h1';
    case 'h2':
      return 'h2';
    case 'h3':
      return 'h3';
    case 'h4':
      return 'h4';
    case 'h5':
      return 'h5';
    case 'h6':
      return 'h6';
    case 'subtitle1':
    case 'subtitle2':
      return 'h6';
    case 'body1':
    case 'body2':
      return 'p';
    case 'caption':
    case 'overline':
      return 'span';
    case 'code':
      return 'code';
    default:
      return 'p';
  }
}

export default Typography;

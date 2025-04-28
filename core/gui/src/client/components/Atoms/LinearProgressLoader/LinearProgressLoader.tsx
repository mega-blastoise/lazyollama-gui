// LinearProgressLoader.jsx
import React from 'react';
import './LinearProgressLoader.css';
export type LinearProgressLoaderProps = {
  value?: number;
  min?: number;
  max?: number;
  infinite?: boolean;
  className?: string;
  height?: string;
  borderRadius?: string;
  style?: React.CSSProperties;
};

const LinearProgressLoader = ({
  value,
  min = 0,
  max = 100,
  infinite = false,
  className = '',
  height = '4px',
  borderRadius = '4px',
  style = {},
  ...props
}: LinearProgressLoaderProps) => {
  // Calculate percentage for determinate mode
  const calculatePercentage = () => {
    // Ensure value is within bounds
    const boundedValue = Math.max(min, Math.min(max, value || max));
    return ((boundedValue - min) / (max - min)) * 100;
  };

  // Determine if we should show indeterminate mode
  const isIndeterminate = infinite || value === undefined;

  return (
    <div
      className={`progress-container ${className}`}
      style={{
        '--progress-height': height,
        '--progress-border-radius': borderRadius,
        ...style
      } as any}
      role="progressbar"
      aria-valuemin={isIndeterminate ? undefined : min}
      aria-valuemax={isIndeterminate ? undefined : max}
      aria-valuenow={isIndeterminate ? undefined : value}
      aria-busy={isIndeterminate}
      {...props}
    >
      <div
        className={isIndeterminate ? 'progress-bar indeterminate' : 'progress-bar'}
        style={!isIndeterminate ? { width: `${calculatePercentage()}%` } : undefined}
      />
    </div>
  );
};

export default LinearProgressLoader;

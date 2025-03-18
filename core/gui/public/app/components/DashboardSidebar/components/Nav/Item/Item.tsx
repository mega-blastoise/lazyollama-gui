import React from 'react';
import { useApplicationStore } from '@/gui/store';

import { LazyOllamaDashboardSidebarNavigationItemProps } from './types';
import { Button, Typography } from '@lazyollama-gui/typescript-react-components';

function LazyOllamaDashboardSidebarNavigationItem({
  to,
  label,
  icon
}: LazyOllamaDashboardSidebarNavigationItemProps) {
  const {
    ui: { view, sidebar: { expanded } },
    updateUiViewState
  } = useApplicationStore();
  
  return (
    <li
      className={`lazyollama-gui__nav-item ${view === to ? 'lazyollama-gui__nav-item--active' : ''}`}
    >
      <Button 
        variant="link" 
        className="lazyollama-gui__nav-button" 
        onClick={() => updateUiViewState(to)}
      >
        {icon}
        {expanded && (
          <Typography 
            variant="body2" 
            className="lazyollama-gui__nav-label"
          >
            {label}
          </Typography>
        )}
      </Button>
    </li>
  );
}

export default React.memo(LazyOllamaDashboardSidebarNavigationItem);
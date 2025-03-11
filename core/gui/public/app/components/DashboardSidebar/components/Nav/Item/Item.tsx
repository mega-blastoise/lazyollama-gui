import React from 'react';
import { useApplicationStore } from '@/gui/store';
import { LazyOllamaDashboardSidebarNavigationItemProps } from './types';

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
      <button className="lazyollama-gui__nav-button" onClick={() => updateUiViewState(to)}>
        {icon}
        {expanded && <span className="lazyollama-gui__nav-label">{label}</span>}
      </button>
    </li>
  );
}

export default React.memo(LazyOllamaDashboardSidebarNavigationItem);
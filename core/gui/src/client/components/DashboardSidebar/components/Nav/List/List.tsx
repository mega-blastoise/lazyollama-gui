import React from 'react';
import { useApplicationStore } from '@/gui/store';
import { LazyOllamaDashboardSidebarNavigationItem } from '../Item';

function LazyOllamaDashboardSidebarNavigationList() {
  const {
    ui: { sidebar }
  } = useApplicationStore();
  return (
    <nav className="lazyollama-gui__nav">
      <ul className="lazyollama-gui__nav-list">
        {sidebar.items.map((props) => (
          <LazyOllamaDashboardSidebarNavigationItem {...props} key={props.to} />
        ))}
      </ul>
    </nav>
  );
}

export default React.memo(LazyOllamaDashboardSidebarNavigationList);

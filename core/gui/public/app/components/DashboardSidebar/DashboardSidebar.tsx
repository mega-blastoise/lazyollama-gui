import React from 'react';
import { LazyOllamaDashboardSidebarHeader } from './components/Header';
import { LazyOllamaDashboardSidebarNavigationList } from './components/Nav';
import { LazyOllamaDashboardSidebarFooter } from './components/Footer';

function LazyOllamaDashboardSidebar() {
  return (
    <div className="lazyollama-gui__sidebar">
      <LazyOllamaDashboardSidebarHeader />
      <LazyOllamaDashboardSidebarNavigationList />
      <LazyOllamaDashboardSidebarFooter />
    </div>
  );
}

export default LazyOllamaDashboardSidebar;

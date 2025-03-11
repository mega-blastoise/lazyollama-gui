import React from 'react';
import { useApplicationStore } from '@/gui/store';
import { LazyOllamaDashboardSidebarHeader } from './components/Header';
import { LazyOllamaDashboardSidebarNavigationList } from './components/Nav';
import { LazyOllamaDashboardSidebarFooter } from './components/Footer';

function LazyOllamaDashboardSidebar() {
  const { ui: { sidebar: { expanded } } } = useApplicationStore();
  return (
    <div className="lazyollama-gui__sidebar" data-expanded={expanded ? 'expanded' : 'collapsed'}>
      <LazyOllamaDashboardSidebarHeader />
      <LazyOllamaDashboardSidebarNavigationList />
      <LazyOllamaDashboardSidebarFooter />
    </div>
  );
}

export default LazyOllamaDashboardSidebar;

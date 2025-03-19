import React from 'react';
import { useApplicationStore } from '@/gui/store';
import { LazyOllamaDashboardSidebarHeader } from './components/Header';
import { LazyOllamaDashboardSidebarNavigationList } from './components/Nav';
import { LazyOllamaDashboardSidebarFooter } from './components/Footer';
import { useTheme } from '@lazyollama-gui/typescript-react-components';

function LazyOllamaDashboardSidebar() {
  const {
    ui: {
      sidebar: { expanded }
    }
  } = useApplicationStore();
  const { theme } = useTheme();

  return (
    <div
      className="lazyollama-gui__sidebar"
      data-expanded={expanded ? 'expanded' : 'collapsed'}
      data-theme={theme}
    >
      <LazyOllamaDashboardSidebarHeader />
      <LazyOllamaDashboardSidebarNavigationList />
      <LazyOllamaDashboardSidebarFooter />
    </div>
  );
}

export default LazyOllamaDashboardSidebar;

import React from 'react';
import { Box } from 'lucide-react';
import { useApplicationStore } from '@/gui/store';

function LazyOllamaDashboardSidebarHeader() {
  const { ui: { sidebar: { expanded } } } = useApplicationStore();
  return (
    <div className="lazyollama-gui__sidebar-header">
      <Box className="lazyollama-gui__logo-icon" />
      {expanded && <h1 className="lazyollama-gui__title fira-code">LazyOllama</h1>}
    </div>
  );
}

export default React.memo(LazyOllamaDashboardSidebarHeader);

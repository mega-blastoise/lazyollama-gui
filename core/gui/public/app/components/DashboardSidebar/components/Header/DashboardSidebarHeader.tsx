import React from 'react';
import { Box } from 'lucide-react';

function LazyOllamaDashboardSidebarHeader() {
  return (
    <div className="lazyollama-gui__sidebar-header">
      <Box className="lazyollama-gui__logo-icon" />
      <h1 className="lazyollama-gui__title fira-code">LazyOllama</h1>
    </div>
  );
}

export default React.memo(LazyOllamaDashboardSidebarHeader);

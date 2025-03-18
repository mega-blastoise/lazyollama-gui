import React from 'react';
import { Box } from 'lucide-react';
import { useApplicationStore } from '@/gui/store';
import { Typography } from '@lazyollama-gui/typescript-react-components';


function LazyOllamaDashboardSidebarHeader() {
  const {
    ui: {
      sidebar: { expanded }
    }
  } = useApplicationStore();
  return (
    <div className="lazyollama-gui__sidebar-header">
      <Box className="lazyollama-gui__logo-icon" />
      {expanded && (
        <Typography 
          variant="h6" 
          component="h1" 
          className="lazyollama-gui__title"
        >
          LazyOllama
        </Typography>
      )}
    </div>
  );
}

export default React.memo(LazyOllamaDashboardSidebarHeader);
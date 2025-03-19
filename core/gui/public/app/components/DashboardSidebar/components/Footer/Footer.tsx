import React from 'react';
import { ChevronsRight, ChevronsLeft } from 'lucide-react';
import { useApplicationStore } from '@/gui/store';
import { Button, Typography } from '@lazyollama-gui/typescript-react-components';

function LazyOllamaDashboardSidebarFooter() {
  const {
    ui: {
      sidebar: { expanded }
    },
    expandSidebar,
    collapseSidebar
  } = useApplicationStore();

  return (
    <Button
      variant="link"
      className="lazyollama-gui__sidebar-expansion-toggle"
      onClick={expanded ? collapseSidebar : expandSidebar}
    >
      {expanded ? (
        <ChevronsLeft className="lazyollama-gui__nav-icon" />
      ) : (
        <ChevronsRight className="lazyollama-gui__nav-icon" />
      )}
    </Button>
  );
}

export default React.memo(LazyOllamaDashboardSidebarFooter);

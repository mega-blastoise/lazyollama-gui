import React from 'react';
import { ChevronsRight, ChevronsLeft } from 'lucide-react';
import { useApplicationStore } from '@/gui/store';

function LazyOllamaDashboardSidebarFooter() {
  const {
    ui: {
      sidebar: { expanded }
    },
    expandSidebar,
    collapseSidebar
  } = useApplicationStore();
  return (
    <button
      className="lazyollama-gui__sidebar-expansion-toggle"
      onClick={expanded ? collapseSidebar : expandSidebar}
    >
      {expanded ? <ChevronsLeft className="lazyollama-gui__nav-icon" /> : <ChevronsRight className="lazyollama-gui__nav-icon" />}
      {expanded && <span>LazyOllama </span>}
    </button>
  );
}

export default React.memo(LazyOllamaDashboardSidebarFooter);

import React from 'react';
import { Search } from 'lucide-react';
import { useApplicationStore } from '@/gui/store';

function LazyOllamaDashboardSectionHeader() {
  const {
    ui: { view }
  } = useApplicationStore();
  return (
    <header className="lazyollama-gui__header">
      <h2 className="lazyollama-gui__header-title">
        {view === 'home' && 'Home'}
        {view === 'models' && 'Models'}
        {view === 'running' && 'Running Models'}
        {view === 'stats' && 'Statistics'}
        {view === 'settings' && 'Settings'}
      </h2>

      <div className="lazyollama-gui__search-container">
        <Search className="lazyollama-gui__search-icon" />
        <input type="text" className="lazyollama-gui__search-input" placeholder="Search..." />
      </div>
    </header>
  );
}

export default LazyOllamaDashboardSectionHeader;
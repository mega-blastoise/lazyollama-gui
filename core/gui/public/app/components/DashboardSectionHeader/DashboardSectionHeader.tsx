import React from 'react';
import { Moon, Search, Sun } from 'lucide-react';
import { Typography, useTheme } from '@lazyollama-gui/typescript-react-components';
import { useApplicationStore } from '@/gui/store';

function LazyOllamaDashboardSectionHeader() {
  const { theme, toggleTheme } = useTheme();
  const {
    ui: { view }
  } = useApplicationStore();
  return (
    <header className="lazyollama-gui__header nunito-sans">
      <Typography variant="h2" component={'h2'} className="lazyollama-gui__header-title">
        {view === 'home' && 'Home'}
        {view === 'models' && 'Models'}
        {view === 'running' && 'Running Models'}
        {view === 'stats' && 'Statistics'}
        {view === 'settings' && 'Settings'}
      </Typography>

      <div className="lazyollama-gui__search-container">
        <Search className="lazyollama-gui__search-icon" />
        <input type="text" className="lazyollama-gui__search-input" placeholder="Search..." />
      </div>

      <div className="theme-selection">
        <Moon />
        <Sun />
      </div>
    </header>
  );
}

export default LazyOllamaDashboardSectionHeader;
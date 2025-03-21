import React from 'react';
import { Moon, Search, Sun } from 'lucide-react';

import { useApplicationStore } from '@/gui/store';
import { Button, Typography, useTheme } from '@lazyollama-gui/typescript-react-components';

function LazyOllamaDashboardSectionHeader() {
  const { theme, toggleMode, colorScheme, isDark, setTheme } = useTheme();
  const {
    ui: { view }
  } = useApplicationStore();

  return (
    <header className="lazyollama-gui__header">
      <Typography variant="h2" className="lazyollama-gui__header-title">
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
        {theme.includes('dark') ? (
          <Button
            variant="link"
            onClick={toggleMode}
            className="theme-toggle"
            aria-label="Switch to light mode"
          >
            <Moon />
          </Button>
        ) : (
          <Button
            variant="link"
            onClick={toggleMode}
            className="theme-toggle"
            aria-label="Switch to dark mode"
          >
            <Sun />
          </Button>
        )}
        <div className="color-scheme-selection">
          <Button
            variant="icon"
            onClick={() => setTheme(isDark ? 'mint-dark' : 'mint-light')}
            className={`color-option ${colorScheme === 'mint' ? 'active' : ''}`}
            aria-label="Use mint theme"
            // style={{backgroundColor: "#10b981", backgroundSize: ""}}
          ></Button>
          <Button
            variant="icon"
            onClick={() => setTheme(isDark ? 'purple-dark' : 'purple-light')}
            className={`color-option purple-theme ${colorScheme === 'purple' ? 'active' : ''}`}
            aria-label="Use purple theme"
          ></Button>
        </div>
      </div>
    </header>
  );
}

export default LazyOllamaDashboardSectionHeader;

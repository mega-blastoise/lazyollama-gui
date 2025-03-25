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
        {view === 'stats' && 'Statistics'}
        {view === 'settings' && 'Settings'}
      </Typography>

      <div className="theme-selection">
        {theme.includes('dark') ? (
          <Button variant="link" onClick={toggleMode} aria-label="Switch to light mode">
            Switch to Light
          </Button>
        ) : (
          <Button variant="link" onClick={toggleMode} aria-label="Switch to dark mode">
            Switch to Dark
          </Button>
        )}
        <div className="color-scheme-selection">
          <Button
            variant={theme.includes('mint') ? 'secondary' : 'tertiary'}
            onClick={() => setTheme(isDark ? 'mint-dark' : 'mint-light')}
            aria-label="Use mint theme"
          >
            Mint
          </Button>
          <Button
            variant={theme.includes('purple') ? 'secondary' : 'tertiary'}
            onClick={() => setTheme(isDark ? 'purple-dark' : 'purple-light')}
            aria-label="Use purple theme"
          >
            Lavender
          </Button>
        </div>
      </div>
    </header>
  );
}

export default LazyOllamaDashboardSectionHeader;

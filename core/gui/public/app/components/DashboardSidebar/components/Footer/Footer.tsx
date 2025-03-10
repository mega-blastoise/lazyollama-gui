import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@lazyollama-gui/typescript-react-components';

function LazyOllamaDashboardSidebarFooter() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button className="lazyollama-gui__theme-toggle" onClick={toggleTheme}>
      <span>Theme</span>
      {theme === 'dark' ? (
        <Sun className="lazyollama-gui__theme-icon" />
      ) : (
        <Moon className="lazyollama-gui__theme-icon" />
      )}
    </button>
  );
}

export default React.memo(LazyOllamaDashboardSidebarFooter);

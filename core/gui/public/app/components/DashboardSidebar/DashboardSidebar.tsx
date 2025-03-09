import React from 'react';
import { useTheme } from '@lazyollama-gui/typescript-react-components';

import { Moon, Sun, Play, Box, Home, BarChart2, Settings } from 'lucide-react';

import { useApplicationStore } from '@/gui/store';

function LazyOllamaDashboardSidebar() {
  const { theme, toggleTheme } = useTheme();
  const {
    ui: { view },
    updateUiViewState
  } = useApplicationStore();
  return (
    <div className="lazyollama-gui__sidebar">
      <div className="lazyollama-gui__sidebar-header">
        <Box className="lazyollama-gui__logo-icon" />
        <h1 className="lazyollama-gui__title">Ollama Dashboard</h1>
      </div>

      <nav className="lazyollama-gui__nav">
        <ul className="lazyollama-gui__nav-list">
          <li
            className={`lazyollama-gui__nav-item ${view === 'home' ? 'lazyollama-gui__nav-item--active' : ''}`}
          >
            <button
              className="lazyollama-gui__nav-button"
              onClick={() => updateUiViewState('home')}
            >
              <Home className="lazyollama-gui__nav-icon" />
              <span>Home</span>
            </button>
          </li>
          <li
            className={`lazyollama-gui__nav-item ${view === 'models' ? 'lazyollama-gui__nav-item--active' : ''}`}
          >
            <button
              className="lazyollama-gui__nav-button"
              onClick={() => updateUiViewState('models')}
            >
              <Box className="lazyollama-gui__nav-icon" />
              <span>Models</span>
            </button>
          </li>
          <li
            className={`lazyollama-gui__nav-item ${view === 'running' ? 'lazyollama-gui__nav-item--active' : ''}`}
          >
            <button
              className="lazyollama-gui__nav-button"
              onClick={() => updateUiViewState('running')}
            >
              <Play className="lazyollama-gui__nav-icon" />
              <span>Running Models</span>
            </button>
          </li>
          <li
            className={`lazyollama-gui__nav-item ${view === 'stats' ? 'lazyollama-gui__nav-item--active' : ''}`}
          >
            <button
              className="lazyollama-gui__nav-button"
              onClick={() => updateUiViewState('stats')}
            >
              <BarChart2 className="lazyollama-gui__nav-icon" />
              <span>Stats</span>
            </button>
          </li>
          <li
            className={`lazyollama-gui__nav-item ${view === 'settings' ? 'lazyollama-gui__nav-item--active' : ''}`}
          >
            <button
              className="lazyollama-gui__nav-button"
              onClick={() => updateUiViewState('settings')}
            >
              <Settings className="lazyollama-gui__nav-icon" />
              <span>Settings</span>
            </button>
          </li>
        </ul>
      </nav>

      <button className="lazyollama-gui__theme-toggle" onClick={toggleTheme}>
        <span>Theme</span>
        {theme === 'dark' ? (
          <Sun className="lazyollama-gui__theme-icon" />
        ) : (
          <Moon className="lazyollama-gui__theme-icon" />
        )}
      </button>
    </div>
  );
}

export default LazyOllamaDashboardSidebar;
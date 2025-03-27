import { useTheme } from '@lazyollama-gui/typescript-react-components';
import React from 'react';

function DashboardSettingsView() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="lazyollama-gui__settings-tab">
      <h3 className="lazyollama-gui__section-title lazyollama-gui__section-title--spaced">
        Settings
      </h3>

      <div className="lazyollama-gui__settings-card">
        <h4 className="lazyollama-gui__settings-title">API Configuration</h4>

        <div className="lazyollama-gui__settings-form">
          <div className="lazyollama-gui__form-group">
            <label className="lazyollama-gui__form-label">Ollama API Endpoint</label>
            <input
              type="text"
              className="lazyollama-gui__form-input"
              defaultValue="http://localhost:11434"
            />
          </div>

          <div className="lazyollama-gui__form-group">
            <label className="lazyollama-gui__form-label">API Timeout (seconds)</label>
            <input type="number" className="lazyollama-gui__form-input" defaultValue="30" />
          </div>
        </div>
      </div>

      <div className="lazyollama-gui__settings-card">
        <h4 className="lazyollama-gui__settings-title">Interface Settings</h4>

        <div className="lazyollama-gui__settings-form">
          <div className="lazyollama-gui__toggle-row">
            <label className="lazyollama-gui__form-label">Dark Mode</label>
            <div
              className={`lazyollama-gui__toggle ${theme === 'dark' ? 'lazyollama-gui__toggle--active' : ''}`}
              onClick={toggleTheme}
            >
              <div className="lazyollama-gui__toggle-dot"></div>
            </div>
          </div>

          <div className="lazyollama-gui__toggle-row">
            <label className="lazyollama-gui__form-label">Auto-refresh Running Models</label>
            <div className="lazyollama-gui__toggle lazyollama-gui__toggle--active">
              <div className="lazyollama-gui__toggle-dot"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardSettingsView;

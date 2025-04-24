import React, { useState } from 'react';
import './DashboardSettingsView.css';
import {
  Button,
  GlassCard,
  Input,
  Typography,
  useTheme
} from '@lazyollama-gui/typescript-react-components';

function DashboardSettingsView() {
  const { theme, toggleMode, setTheme, isDark, colorScheme } = useTheme();
  const [apiEndpoint, setApiEndpoint] = useState('http://localhost:3000');
  const [apiTimeout, setApiTimeout] = useState('30');
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Custom Toggle component
  const Toggle = ({ isActive, onChange }) => {
    return (
      <div className={`toggle-wrapper ${isActive ? 'toggle-active' : ''}`} onClick={onChange}>
        <div className="toggle-dot"></div>
      </div>
    );
  };

  return (
    <div className="lazyollama-gui__settings-container">
      <GlassCard hasBorder elevation="md">
        <div className="lazyollama-gui__settings-card-content">
          <Typography variant="h4" gutterBottom>
            API Configuration
          </Typography>

          <Input
            label="Ollama API Endpoint"
            value={apiEndpoint}
            onChange={(e) => setApiEndpoint(e.target.value)}
            isFullWidth
          />

          <Input
            label="API Timeout (seconds)"
            type="number"
            value={apiTimeout}
            onChange={(e) => setApiTimeout(e.target.value)}
            isFullWidth
          />
        </div>
      </GlassCard>

      <GlassCard hasBorder elevation="md">
        <div className="lazyollama-gui__settings-card-content">
          <Typography variant="h4" gutterBottom>
            Interface Settings
          </Typography>

          <div className="lazyollama-gui__settings-row theme-mode-row">
            <Typography variant="body1">Theme Mode</Typography>
            <div className="theme-mode-buttons">
              {isDark ? (
                <Button variant="link" onClick={toggleMode} aria-label="Switch to light mode">
                  Switch to Light
                </Button>
              ) : (
                <Button variant="link" onClick={toggleMode} aria-label="Switch to dark mode">
                  Switch to Dark
                </Button>
              )}
            </div>
          </div>

          <div className="lazyollama-gui__settings-row color-scheme-row">
            <Typography variant="body1">Color Scheme</Typography>
            <div className="color-scheme-buttons">
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

          <div className="lazyollama-gui__settings-row">
            <Typography variant="body1">Auto-refresh Running Models</Typography>
            <Toggle isActive={autoRefresh} onChange={() => setAutoRefresh(!autoRefresh)} />
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

export default DashboardSettingsView;

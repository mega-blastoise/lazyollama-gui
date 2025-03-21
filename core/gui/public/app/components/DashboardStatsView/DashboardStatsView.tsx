import { GlassCard, Typography } from '@lazyollama-gui/typescript-react-components';
import React from 'react';

function DashboardStatsView() {
  return (
    <div className="lazyollama-gui__stats-tab">
      <Typography
        variant="h3"
        className="lazyollama-gui__section-title lazyollama-gui__section-title--spaced"
      >
        System Statistics
      </Typography>

      <div className="lazyollama-gui__stats-grid">
        <GlassCard>
          <Typography variant="h4" className="lazyollama-gui__stat-title">
            CPU Usage
          </Typography>
          <Typography variant="body1" className="lazyollama-gui__stat-value">
            32%
          </Typography>
          <div className="lazyollama-gui__progress-container">
            <div
              className="lazyollama-gui__progress-bar lazyollama-gui__progress-bar--blue"
              style={{ width: '32%' }}
            ></div>
          </div>
        </GlassCard>

        <GlassCard>
          <Typography variant="h4" className="lazyollama-gui__stat-title">
            Memory Usage
          </Typography>
          <Typography variant="body1" className="lazyollama-gui__stat-value">
            8.4 GB / 16 GB
          </Typography>
          <div className="lazyollama-gui__progress-container">
            <div
              className="lazyollama-gui__progress-bar lazyollama-gui__progress-bar--green"
              style={{ width: '52%' }}
            ></div>
          </div>
        </GlassCard>

        <GlassCard>
          <Typography variant="h4" className="lazyollama-gui__stat-title">
            GPU Memory
          </Typography>
          <Typography variant="body1" className="lazyollama-gui__stat-value">
            5.6 GB / 8 GB
          </Typography>
          <div className="lazyollama-gui__progress-container">
            <div
              className="lazyollama-gui__progress-bar lazyollama-gui__progress-bar--purple"
              style={{ width: '70%' }}
            ></div>
          </div>
        </GlassCard>
      </div>

      <GlassCard>
        <Typography variant="h4" className="lazyollama-gui__chart-title">
          Model Usage History
        </Typography>
        <div className="lazyollama-gui__chart">
          {[40, 65, 30, 85, 55, 70, 45, 90, 65, 50, 75, 60].map((height, index) => (
            <div
              key={index}
              className="lazyollama-gui__chart-bar"
              style={{ height: `${height}%` }}
            ></div>
          ))}
        </div>
        <div className="lazyollama-gui__chart-labels">
          <Typography variant="body2">12 AM</Typography>
          <Typography variant="body2">3 AM</Typography>
          <Typography variant="body2">6 AM</Typography>
          <Typography variant="body2">9 AM</Typography>
          <Typography variant="body2">12 PM</Typography>
          <Typography variant="body2">3 PM</Typography>
          <Typography variant="body2">6 PM</Typography>
          <Typography variant="body2">9 PM</Typography>
        </div>
      </GlassCard>
    </div>
  );
}

export default DashboardStatsView;

import React from 'react';

function DashboardStatsView() {
  return (
    <div className="lazyollama-gui__stats-tab">
      <h3 className="lazyollama-gui__section-title lazyollama-gui__section-title--spaced">
        System Statistics
      </h3>

      <div className="lazyollama-gui__stats-grid">
        <div className="lazyollama-gui__stat-card">
          <h4 className="lazyollama-gui__stat-title">CPU Usage</h4>
          <div className="lazyollama-gui__stat-value">32%</div>
          <div className="lazyollama-gui__progress-container">
            <div
              className="lazyollama-gui__progress-bar lazyollama-gui__progress-bar--blue"
              style={{ width: '32%' }}
            ></div>
          </div>
        </div>

        <div className="lazyollama-gui__stat-card">
          <h4 className="lazyollama-gui__stat-title">Memory Usage</h4>
          <div className="lazyollama-gui__stat-value">8.4 GB / 16 GB</div>
          <div className="lazyollama-gui__progress-container">
            <div
              className="lazyollama-gui__progress-bar lazyollama-gui__progress-bar--green"
              style={{ width: '52%' }}
            ></div>
          </div>
        </div>

        <div className="lazyollama-gui__stat-card">
          <h4 className="lazyollama-gui__stat-title">GPU Memory</h4>
          <div className="lazyollama-gui__stat-value">5.6 GB / 8 GB</div>
          <div className="lazyollama-gui__progress-container">
            <div
              className="lazyollama-gui__progress-bar lazyollama-gui__progress-bar--purple"
              style={{ width: '70%' }}
            ></div>
          </div>
        </div>
      </div>

      <div className="lazyollama-gui__chart-container">
        <h4 className="lazyollama-gui__chart-title">Model Usage History</h4>
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
          <span>12 AM</span>
          <span>3 AM</span>
          <span>6 AM</span>
          <span>9 AM</span>
          <span>12 PM</span>
          <span>3 PM</span>
          <span>6 PM</span>
          <span>9 PM</span>
        </div>
      </div>
    </div>
  );
}

export default DashboardStatsView;

import React from 'react';
import { Box, Square } from 'lucide-react';
import { useApplicationStore } from '@/gui/store';
import { OllamaModel } from '@/gui/types';

interface LazyOllamaDashboardRunningModelsViewProps {
  running_models: OllamaModel[];
}

function LazyOllamaDashboardRunningModelsView({
  running_models
}: LazyOllamaDashboardRunningModelsViewProps) {
  const { updateUiViewState } = useApplicationStore();
  return (
    <div className="lazyollama-gui__running-tab">
      <h3 className="lazyollama-gui__section-title">Running Models</h3>

      {running_models.length > 0 ? (
        <div className="lazyollama-gui__running-grid">
          {running_models.map((model) => (
            <div key={model.id} className="lazyollama-gui__running-card">
              <div className="lazyollama-gui__running-header">
                <div className="lazyollama-gui__running-name">
                  <Box className="lazyollama-gui__running-icon" />
                  <h4 className="lazyollama-gui__model-name">{model.name}</h4>
                </div>
                <div className="lazyollama-gui__model-tags">
                  {model.tags.map((tag) => (
                    <span key={tag} className="lazyollama-gui__model-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lazyollama-gui__metrics">
                <div className="lazyollama-gui__metric-row">
                  <span>Memory Usage</span>
                  <span>4.2 GB</span>
                </div>
                <div className="lazyollama-gui__progress-container">
                  <div className="lazyollama-gui__progress-bar" style={{ width: '70%' }}></div>
                </div>
              </div>

              <div className="lazyollama-gui__metrics">
                <div className="lazyollama-gui__metric-row">
                  <span>Uptime</span>
                  <span>2h 34m</span>
                </div>
              </div>

              <div className="lazyollama-gui__running-actions">
                <button className="lazyollama-gui__button lazyollama-gui__button--danger">
                  <Square className="lazyollama-gui__button-icon" />
                  Stop Model
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="lazyollama-gui__empty-state">
          <Box className="lazyollama-gui__empty-icon" />
          <h3 className="lazyollama-gui__empty-title">No Models Running</h3>
          <p className="lazyollama-gui__empty-text">
            Start a model from the Models tab to see it here.
          </p>
          <button
            className="lazyollama-gui__button lazyollama-gui__button--primary"
            onClick={() => updateUiViewState('models')}
          >
            Go to Models
          </button>
        </div>
      )}
    </div>
  );
}

export default LazyOllamaDashboardRunningModelsView;

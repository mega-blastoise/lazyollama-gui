import React from 'react';
import { Box, ChevronDown, Download, Play, Square, X } from 'lucide-react';
import { useApplicationStore } from '@/gui/store';
import { LazyOllamaDashboardModelsViewProps } from './types';

function LazyOllamaDashboardModelsView({ models }: LazyOllamaDashboardModelsViewProps) {
  const {
    setExpandedModel,
    ui: { expanded_model }
  } = useApplicationStore();
  return (
    <div className="lazyollama-gui__models-tab">
      <div className="lazyollama-gui__section-header">
        <h3 className="lazyollama-gui__section-title">Available Models</h3>
        <div className="lazyollama-gui__filter-buttons">
          <button className="lazyollama-gui__filter-button lazyollama-gui__filter-button--active">
            All
          </button>
          <button className="lazyollama-gui__filter-button">Downloaded</button>
          <button className="lazyollama-gui__filter-button">Running</button>
        </div>
      </div>

      <div className="lazyollama-gui__models-list">
        {models.available.map((model) => (
          <div key={model.id} className="lazyollama-gui__model-card">
            <div
              className="lazyollama-gui__model-header"
              onClick={() => setExpandedModel(model.id)}
            >
              <div className="lazyollama-gui__model-info">
                <Box
                  className={`lazyollama-gui__model-icon ${model.running ? 'lazyollama-gui__model-icon--running' : ''}`}
                />
                <div>
                  <h4 className="lazyollama-gui__model-name">{model.name}</h4>
                  <p className="lazyollama-gui__model-description">{model.description}</p>
                </div>
              </div>

              <div className="lazyollama-gui__model-meta">
                <div className="lazyollama-gui__model-tags">
                  {model.tags.map((tag) => (
                    <span key={tag} className="lazyollama-gui__model-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <ChevronDown
                  className={`lazyollama-gui__chevron ${expanded_model === model.id ? 'lazyollama-gui__chevron--expanded' : ''}`}
                />
              </div>
            </div>

            {expanded_model === model.id && (
              <div className="lazyollama-gui__model-actions">
                {!model.downloaded && (
                  <button className="lazyollama-gui__button lazyollama-gui__button--primary">
                    <Download className="lazyollama-gui__button-icon" />
                    Pull Model
                  </button>
                )}

                {model.downloaded && !model.running && (
                  <button className="lazyollama-gui__button lazyollama-gui__button--success">
                    <Play className="lazyollama-gui__button-icon" />
                    Start Model
                  </button>
                )}

                {model.running && (
                  <button className="lazyollama-gui__button lazyollama-gui__button--danger">
                    <Square className="lazyollama-gui__button-icon" />
                    Stop Model
                  </button>
                )}

                {model.downloaded && (
                  <button className="lazyollama-gui__button lazyollama-gui__button--secondary">
                    <X className="lazyollama-gui__button-icon" />
                    Remove
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LazyOllamaDashboardModelsView;

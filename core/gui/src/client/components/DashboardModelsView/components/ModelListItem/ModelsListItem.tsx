import React from 'react';
import { Box, ChevronDown, Play, Square, X } from 'lucide-react';
import { Button } from '@lazyollama-gui/typescript-react-components';
import { useApplicationStore } from '@/gui/store';
import { OllamaModel } from '@/gui/types';
import { ComprehensiveModel } from '../../DashboardModelsView.utils';

function ModelCard({ model }: { model: ComprehensiveModel }) {
  const {
    setExpandedModel,
    ui: { expanded_model }
  } = useApplicationStore();
  return (
    <div key={model.id} className="lazyollama-gui__model-card">
      <div
        className="lazyollama-gui__model-header"
        onClick={() =>
          setExpandedModel({
            ...model,
            tags: [model.model_spec.replace(`${model.name}`, '')]
          } as OllamaModel)
        }
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
            <span key={model.model_parameters} className="lazyollama-gui__model-tag">
              {model.model_parameters}
            </span>
          </div>
          <ChevronDown
            className={`lazyollama-gui__chevron ${expanded_model?.id === model.id ? 'lazyollama-gui__chevron--expanded' : ''}`}
          />
        </div>
      </div>

      {expanded_model?.id === model.id && (
        <div className="lazyollama-gui__model-actions">
          {!model.downloaded && <Button variant="primary">Pull Model</Button>}

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
  );
}

export default ModelCard;

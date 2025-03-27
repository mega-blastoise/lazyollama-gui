import React from 'react';
import { Box, ChevronDown, Download, Play, Square, X } from 'lucide-react';
import { Button, useToast } from '@lazyollama-gui/typescript-react-components';
import { useApplicationStore } from '@/gui/store';
import { OllamaModel } from '@/gui/types';
import { ComprehensiveModel } from '../../DashboardModelsView.utils';
import { postMessageToWorker } from '@/gui/workers';
import { OllamaRPCAPIAction } from '@lazyollama-gui/typescript-common-types';

function ModelCard({ model }: { model: ComprehensiveModel }) {
  const {
    setExpandedModel,
    ui: { expanded_model },

    state: sharedState,
    updateAppSharedState
  } = useApplicationStore();

  const { showToast } = useToast();

  function onDownloadPress() {
    console.warn('Attempting to pull model: %s', model.model_spec);
    showToast({
      variant: 'info',
      content: `Queuing Model Pull: ${model.model_spec}`,
      duration: 3000
    });

    updateAppSharedState({
      apiQueues: {
        ...sharedState.apiQueues,
        pullQueued: [...sharedState.apiQueues.pullQueued, model.model_spec]
      }
    });

    postMessageToWorker({
      type: OllamaRPCAPIAction.ModelPull,
      data: {
        model: model.model_spec
      }
    });
  }

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
          <Button
            size="sm"
            variant="outline"
            disabled={model.downloaded}
            onClick={onDownloadPress}
          >
            <Download className="lazyollama-gui__button-icon" />
            Pull Model
          </Button>

          <Button size="sm" variant="outline" disabled={!model.downloaded || model.running}>
            <Play className="lazyollama-gui__button-icon" />
            Start Model
          </Button>

          <Button size="sm" variant="outline" disabled={!model.running}>
            <Square className="lazyollama-gui__button-icon" />
            Stop Model
          </Button>
          <Button size="sm" variant="outline" disabled={!model.downloaded || model.running}>
            <X className="lazyollama-gui__button-icon" />
            Remove
          </Button>
          {/* )} */}
        </div>
      )}
    </div>
  );
}

export default ModelCard;

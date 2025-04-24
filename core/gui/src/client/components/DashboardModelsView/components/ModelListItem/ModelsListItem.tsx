import React from 'react';
import { Box, ChevronDown, Download, Play, Square, X, Loader } from 'lucide-react';
import { OllamaRPCAPIAction } from '@lazyollama-gui/typescript-common-types';
import { Button, useToast } from '@lazyollama-gui/typescript-react-components';

import { default as LinearProgressLoader } from '@/gui/components/Atoms/LinearProgressLoader/LinearProgressLoader';
import { useApplicationStore } from '@/gui/store';
import { OllamaModel } from '@/gui/types';
import { postMessageToWorker } from '@/gui/workers';

import { ComprehensiveModel } from '../../DashboardModelsView.utils';

function ModelCard({ model }: { model: ComprehensiveModel }) {
  const {
    setExpandedModel,
    ui: { expanded_model },
    state: sharedState,
    api: { session },
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

    console.log(
      'Updating shared app state: Adding %s to apiQueues.pullQueued',
      model.model_spec
    );
    updateAppSharedState({
      apiQueues: {
        ...sharedState.apiQueues,
        pullQueued: [...sharedState.apiQueues.pullQueued, model.model_spec]
      }
    });

    console.log('Posting "QueuePullModel" job to worker thread.');
    postMessageToWorker({
      type: OllamaRPCAPIAction.ModelPull,
      data: {
        model: model.model_spec
      }
    });
  }

  const isInDownloadQueue = sharedState.apiQueues.pullQueued.includes(model.model_spec);

  return (
    <div key={model.id} className="lazyollama-gui__model-card">
      <div
        className="lazyollama-gui__model-header"
        onClick={() => {
          if (expanded_model?.id === model.id) {
            setExpandedModel(null);
          } else {
            setExpandedModel({
              ...model,
              tags: [model.model_spec.replace(`${model.name}`, '')]
            } as OllamaModel);
          }
        }}
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
            disabled={
              model.downloaded ||
              Boolean(
                session.available.find(({ model_spec }) => model_spec === model.model_spec)
              ) ||
              isInDownloadQueue
            }
            onClick={onDownloadPress}
          >
            {isInDownloadQueue ? (
              <LinearProgressLoader max={100} min={0} infinite />
            ) : (
              <>
                <Download className="lazyollama-gui__button-icon" />
                Pull Model
              </>
            )}
          </Button>

          <Button
            size="sm"
            variant="outline"
            disabled={
              !model.downloaded ||
              !session.available.find(({ model_spec }) => model_spec === model.model_spec) ||
              model.running
            }
          >
            <Play className="lazyollama-gui__button-icon" />
            Start Model
          </Button>

          <Button
            size="sm"
            variant="outline"
            disabled={
              !model.running ||
              !session.running.find(({ model_spec }) => model_spec === model.model_spec)
            }
          >
            <Square className="lazyollama-gui__button-icon" />
            Stop Model
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={
              !model.downloaded ||
              model.running ||
              !session.available.find(({ model_spec }) => model_spec === model.model_spec)
            }
          >
            <X className="lazyollama-gui__button-icon" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
}

export default ModelCard;

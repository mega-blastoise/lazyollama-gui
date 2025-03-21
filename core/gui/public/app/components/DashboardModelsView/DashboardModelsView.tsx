import React, { useMemo } from 'react';
import { Box, ChevronDown, Download, Play, Search, Square, X } from 'lucide-react';
import { useApplicationStore } from '@/gui/store';
import { Button, Typography } from '@lazyollama-gui/typescript-react-components';

import {
  getComprehensiveModelsList,
  filterEngine,
  ComprehensiveModel
} from './DashboardModelsView.utils';
import { OllamaModel } from '@/gui/types';

let pageCount = 50;

function LazyOllamaDashboardModelsView() {
  const [popular, setPopularActive] = React.useState(true);
  const [all, setAllActive] = React.useState(false);
  const [running, setRunningActive] = React.useState(false);
  const [downloaded, setDownloadedActive] = React.useState(false);

  const [page, setPage] = React.useState(1);
  const [range, setRange] = React.useState([0, pageCount]);

  function onPopularChipClick() {
    if (popular) {
      setPopularActive(false);
      return;
    }

    setPopularActive(true);
    setAllActive(false);
    setDownloadedActive(false);
  }

  function onAllChipClick() {
    if (all) {
      setAllActive(false);
      return;
    }

    setAllActive(true);
    setPopularActive(false);
    setDownloadedActive(false);
  }

  function onDownloadedChipClick() {
    if (downloaded) {
      setDownloadedActive(false);
      return;
    }

    setDownloadedActive(true);
    setAllActive(false);
    setPopularActive(false);
  }

  function onRunningChipClick() {
    if (running) {
      setRunningActive(false);
      return;
    }

    setRunningActive(true);
    setAllActive(false);
    setDownloadedActive(false);
  }

  function onNextPageClick() {
    const currentMaxRange = range[1];
    if (currentMaxRange + pageCount >= models.length) {
      return;
    } else {
      setRange([currentMaxRange, currentMaxRange + pageCount]);
    }
  }

  function onPreviousPageClick() {
    const currentMinRange = range[0];
    if (currentMinRange - pageCount <= 0) {
      return;
    } else {
      setRange([currentMinRange - pageCount, currentMinRange]);
    }
  }

  const {
    api,
    ui: { expanded_model },
    setExpandedModel
  } = useApplicationStore();

  let models = useMemo(
    () =>
      filterEngine(getComprehensiveModelsList(api) || [], popular, all, downloaded, running),
    [popular, all, downloaded, running, api]
  );

  const numOfModels = models.length;

  const pages = Math.ceil(numOfModels / pageCount);

  return (
    <div className="lazyollama-gui__models-tab">
      <div className="lazyollama-gui__section-header">
        <Typography variant="h3" weight="semibold" className="lazyollama-gui__section-title">
          Model Management
        </Typography>

        <div className="lazyollama-gui__section-actions">
          <div className="lazyollama-gui__search-container">
            <Search className="lazyollama-gui__search-icon" />
            <input
              type="text"
              className="lazyollama-gui__search-input"
              placeholder="Search..."
            />
          </div>
        </div>
      </div>

      <div className="lazyollama-gui__models-filters">
        <div className="lazyollama-gui__filter-buttons">
          <Button
            onClick={onPopularChipClick}
            variant={popular ? 'secondary' : 'outline'}
            size="sm"
          >
            Popular
          </Button>
          <Button onClick={onAllChipClick} variant={all ? 'secondary' : 'outline'} size="sm">
            All
          </Button>
          <Button
            onClick={onRunningChipClick}
            variant={running ? 'secondary' : 'outline'}
            size="sm"
          >
            Running
          </Button>
          <Button
            onClick={onDownloadedChipClick}
            variant={downloaded ? 'secondary' : 'outline'}
            size="sm"
          >
            Downloaded
          </Button>
        </div>
      </div>

      <div className="lazyollama-gui__models-list">
        {models.slice(range[0], range[1]).map((model) => (
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
        ))}
      </div>
    </div>
  );
}

export default LazyOllamaDashboardModelsView;

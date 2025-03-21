import React, { useMemo, useDeferredValue } from 'react';
import { Search } from 'lucide-react';
import { useApplicationStore } from '@/gui/store';
import { Button, Typography } from '@lazyollama-gui/typescript-react-components';
import { ModelsList } from './components/ModelsList';
import {
  getComprehensiveModelsList,
  filterEngine
} from './DashboardModelsView.utils';

let pageCount = 50;

function LazyOllamaDashboardModelsView() {
  const [popular, setPopularActive] = React.useState(true);
  const [all, setAllActive] = React.useState(false);
  const [running, setRunningActive] = React.useState(false);
  const [downloaded, setDownloadedActive] = React.useState(false);

  const [search, setSearch] = React.useState('');
  const deferredSearchValue = useDeferredValue(search);

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
      filterEngine(
        getComprehensiveModelsList(api) || [],
        deferredSearchValue,
        popular,
        all,
        downloaded,
        running
      ),
    [deferredSearchValue, popular, all, downloaded, running, api]
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

        <div className="lazyollama-gui__pagination">
          <Button onClick={onPreviousPageClick} variant="outline" size="sm">
            Previous
          </Button>
          <div className="lazyollama-gui__pagination-info nunito-sans">
            {range[0] + 1}-{range[1]} of {models.length}
          </div>
          <Button onClick={onNextPageClick} variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>

      <ModelsList models={models} range={[range[0], range[1]]} />
    </div>
  );
}

export default LazyOllamaDashboardModelsView;

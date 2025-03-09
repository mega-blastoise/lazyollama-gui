import './Dashboard.css';

import React, { Suspense } from 'react';
import { useTheme } from '@lazyollama-gui/typescript-react-components';
import { LazyOllamaDashboardSidebar } from '@/gui/components/DashboardSidebar';
import { LazyOllamaDashboardSectionHeader } from '@/gui/components/DashboardSectionHeader';
import { useApplicationStore } from '@/gui/store';

const LazyOllamaDashboardModelsView = React.lazy(() =>
  import('../DashboardModelsView').then(({ LazyOllamaDashboardModelsView }) => ({
    default: LazyOllamaDashboardModelsView
  }))
);

const LazyOllamaDashboardRunningModelsView = React.lazy(() =>
  import('../DashboardRunningModelsView').then(({ LazyOllamaDashboardRunningModelsView }) => ({
    default: LazyOllamaDashboardRunningModelsView
  }))
);

const LazyOllamaDashboardStatsView = React.lazy(() =>
  import('../DashboardStatsView').then(({ LazyOllamaDashboardStatsView }) => ({
    default: LazyOllamaDashboardStatsView
  }))
);

const LazyOllamaDashboardSettingsView = React.lazy(() =>
  import('../DashboardSettingsView').then(({ LazyOllamaDashboardSettingsView }) => ({
    default: LazyOllamaDashboardSettingsView
  }))
);

function LazyOllamaDashboardMainContent() {
  const {
    ui: { view },
    api
  } = useApplicationStore();

  return (
    <main className="lazyollama-gui__content">
      <Suspense fallback="TODO(Nick): Add a loader">
        {view === 'models' && (
          <LazyOllamaDashboardModelsView
            models={{ available: api.available_models, running: api.running_models }}
          />
        )}
        {view === 'running' && (
          <LazyOllamaDashboardRunningModelsView running_models={api.running_models} />
        )}
        {view === 'stats' && <LazyOllamaDashboardStatsView />}
        {view === 'settings' && <LazyOllamaDashboardSettingsView />}
      </Suspense>
    </main>
  );
}

const LazyOllamaDashboard = () => {
  const { theme } = useTheme();
  const darkMode = theme === 'dark';

  return (
    <div
      className={`lazyollama-gui ${darkMode ? 'lazyollama-gui--dark' : 'lazyollama-gui--light'}`}
    >
      <LazyOllamaDashboardSidebar />
      <div className="lazyollama-gui__main">
        <LazyOllamaDashboardSectionHeader />
        <LazyOllamaDashboardMainContent />
      </div>
    </div>
  );
};

export default LazyOllamaDashboard;

import React, { Suspense } from 'react';
import { useApplicationStore } from '@/gui/store';

const LazyOllamaDashboardModelsView = React.lazy(() => import('../DashboardModelsView'));
const LazyOllamaDashboardRunningModelsView = React.lazy(() => import('../DashboardRunningModelsView'));
const LazyOllamaDashboardStatsView = React.lazy(() => import('../DashboardStatsView'));
const LazyOllamaDashboardSettingsView = React.lazy(() => import('../DashboardSettingsView'));

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
            models={{ available: api.models.available, running: api.models.running }}
          />
        )}
        {view === 'running' && (
          <LazyOllamaDashboardRunningModelsView running_models={api.models.running} />
        )}
        {view === 'stats' && <LazyOllamaDashboardStatsView />}
        {view === 'settings' && <LazyOllamaDashboardSettingsView />}
      </Suspense>
    </main>
  );
}

export default LazyOllamaDashboardMainContent;

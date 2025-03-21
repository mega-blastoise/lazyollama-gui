import React, { Suspense } from 'react';
import { useApplicationStore } from '@/gui/store';

const LazyOllamaDashboardModelsView = React.lazy(() => import('../DashboardModelsView'));
const LazyOllamaDashboardStatsView = React.lazy(() => import('../DashboardStatsView'));
const LazyOllamaDashboardSettingsView = React.lazy(() => import('../DashboardSettingsView'));

function LazyOllamaDashboardMainContent() {
  const {
    ui: { view },
  } = useApplicationStore();

  return (
    <main className="lazyollama-gui__content">
      <Suspense fallback="TODO(Nick): Add a loader">
        {view === 'models' && <LazyOllamaDashboardModelsView />}
        {view === 'stats' && <LazyOllamaDashboardStatsView />}
        {view === 'settings' && <LazyOllamaDashboardSettingsView />}
      </Suspense>
    </main>
  );
}

export default LazyOllamaDashboardMainContent;

import React from 'react';
import { useApplicationStore } from '@/gui/store';
import { Typography } from '@lazyollama-gui/typescript-react-components';

function LazyOllamaDashboardSectionHeader() {
  const {
    ui: { view }
  } = useApplicationStore();

  return (
    <header className="lazyollama-gui__header">
      <Typography variant="h2" className="lazyollama-gui__header-title">
        {view === 'home' && 'Home'}
        {view === 'models' && 'Models'}
        {view === 'stats' && 'Statistics'}
        {view === 'settings' && 'Settings'}
      </Typography>
    </header>
  );
}

export default LazyOllamaDashboardSectionHeader;

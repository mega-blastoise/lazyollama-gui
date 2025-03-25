import '@lazyollama-gui/typescript-react-components/main.css';
import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Dashboard } from '../pages/Dashboard';

hydrateRoot(document, <Dashboard />);

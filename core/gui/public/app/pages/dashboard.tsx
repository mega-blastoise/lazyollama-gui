import '@lazyollama-gui/typescript-react-components/main.css';
import React from 'react';
import { renderComponentToDom } from '../lib/mount';
import OllamaDashboard from '../components/Dashboard/Dashboard';

renderComponentToDom(OllamaDashboard);

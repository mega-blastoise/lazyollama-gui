import React from 'react';
import OllamaDashboard from '../components/Dashboard/Dashboard';
import { withPageLayout } from './layout';

export const Dashboard = withPageLayout<{}>(OllamaDashboard);

export default Dashboard;

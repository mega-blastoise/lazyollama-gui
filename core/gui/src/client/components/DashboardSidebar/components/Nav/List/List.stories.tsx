import React from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import LazyOllamaDashboardSidebarNavigationList from './List';
import StorybookDecorators from '@/gui/lib/StorybookDecorators';

export default {
  title: 'Components/DashboardSidebarNavigationList',
  component: LazyOllamaDashboardSidebarNavigationList,
  decorators: [StorybookDecorators.withLazyOllamaWebThemeProvider],
  argTypes: {}
} as Meta<typeof LazyOllamaDashboardSidebarNavigationList>;

export const Default: StoryObj<typeof LazyOllamaDashboardSidebarNavigationList> = {};

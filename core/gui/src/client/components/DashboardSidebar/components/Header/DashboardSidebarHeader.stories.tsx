import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import LazyOllamaDashboardSidebarHeader from './DashboardSidebarHeader';
import StorybookDecorators from '@/gui/lib/StorybookDecorators';

const meta: Meta<typeof LazyOllamaDashboardSidebarHeader> = {
  title: 'Components/DashboardSidebarHeader',
  component: LazyOllamaDashboardSidebarHeader,
  decorators: [StorybookDecorators.withLazyOllamaWebThemeProvider],
  tags: ['autodocs'],
  argTypes: {}
};

export default meta;

type DashboardSidebarStory = StoryObj<typeof LazyOllamaDashboardSidebarHeader>;

export const Default: DashboardSidebarStory = {};

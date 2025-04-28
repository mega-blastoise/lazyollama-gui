import React from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import LazyOllamaDashboard from './Dashboard';
import StorybookDecorators from '@/gui/lib/StorybookDecorators';

const meta: Meta<typeof LazyOllamaDashboard> = {
  title: 'Components/Dashboard',
  component: LazyOllamaDashboard,
  decorators: [StorybookDecorators.withLazyOllamaWebThemeProvider],
  tags: ['autodocs'],
  argTypes: {}
};

export default meta;

export type DashboardStory = StoryObj<typeof LazyOllamaDashboard>;

export const Default: DashboardStory = {};

export const DarkMode: DashboardStory = {
  parameters: {
    backgrounds: { default: 'dark' }
  },
  decorators: [StorybookDecorators.withDarkMode]
};

export const LightMode: DashboardStory = {
  parameters: {
    backgrounds: { default: 'light' }
  },
  decorators: [StorybookDecorators.withLightMode]
};

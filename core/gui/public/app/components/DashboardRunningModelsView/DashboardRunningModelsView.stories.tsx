import React from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import LazyOllamaDashboardRunningModelsView from './DashboardRunningModelsView';
import StorybookDecorators from '@/gui/lib/StorybookDecorators';

const meta: Meta<typeof LazyOllamaDashboardRunningModelsView> = {
  title: 'Components/DashboardRunningModelsView',
  component: LazyOllamaDashboardRunningModelsView,
  decorators: [StorybookDecorators.withLazyOllamaWebThemeProvider],
  tags: ['autodocs'],
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof LazyOllamaDashboardRunningModelsView>;

export const Default: Story = {
  args: {
    running_models: []
  },
  render: (args) => <LazyOllamaDashboardRunningModelsView {...args} />
};


export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' }
  },
  decorators: [StorybookDecorators.withDarkMode]
};

export const LightMode: Story = {
  parameters: {
    backgrounds: { default: 'light' }
  },
 
  decorators: [StorybookDecorators.withLightMode]
};
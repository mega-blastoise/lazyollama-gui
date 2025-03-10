import React from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import LazyOllamaDashboardRunningModelsView from './DashboardRunningModelsView';
import StorybookDecorators from '@/gui/lib/StorybookDecorators';
import "./DashboardRunningModelsView.css"

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
    running_models: [{
      id: "cdc",
      name: "test model 4.0",
      description: "walmart claude",
      downloaded: false,
      tags: ["tag1", "tag2"],
      running: false,
      model_prefix: "wc",
      model_spec: `40:40`,
      model_parameters: "parameter"
    }]
  },
  render: (args) => <LazyOllamaDashboardRunningModelsView {...args} />
};


export const DarkMode: Story = {
  args: {
    running_models: []
  },
  parameters: {
    backgrounds: { default: 'dark' }
  },
  decorators: [StorybookDecorators.withDarkMode]
};

export const LightMode: Story = {
  args: {
    running_models: []
  },
  parameters: {
    backgrounds: { default: 'light' }
  },
 
  decorators: [StorybookDecorators.withLightMode]
};
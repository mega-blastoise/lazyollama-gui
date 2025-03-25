import React from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import LazyOllamaDashboardModelsView from './DashboardModelsView';
import StorybookDecorators from '@/gui/lib/StorybookDecorators';

const meta: Meta<typeof LazyOllamaDashboardModelsView> = {
  title: 'Components/DashboardModelsView',
  component: LazyOllamaDashboardModelsView,
  decorators: [StorybookDecorators.withLazyOllamaWebThemeProvider],
  tags: ['autodocs'],
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof LazyOllamaDashboardModelsView>;

export const Default: Story = {
  args: {
    models: {
      available: [],
      running: []
    }
  },
  render: (args) => <LazyOllamaDashboardModelsView {...args} />
};

export const WithModels: Story = {
  args: {
    models: {
      available: [
        {
          id: 'gpt-4', 
          name: 'GPT-4',
          description: '',
          model_prefix: 'gpt-4',
          model_parameters: '334b',
          model_spec: 'gpt-4:334b',
          tags: ['334B'],
          downloaded: false,
          running: false
        },
        {
          id: 'gpt-4-32k', 
          name: 'GPT-4-32k',
          description: '',
          model_prefix: 'gpt-4-32k',
          model_parameters: '334b',
          model_spec: 'gpt-4-32k:334b',
          tags: ['334B'],
          downloaded: false,
          running: false
        }
      ], // prettier-ignore
      running: [
        {
          id: 'gpt-4',
          name: 'GPT-4',
          description: '',
          model_prefix: 'gpt-4',
          model_parameters: '334b',
          model_spec: 'gpt-4:334b',
          tags: ['334B'],
          downloaded: false,
          running: true
        }
      ]
    }
  }
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

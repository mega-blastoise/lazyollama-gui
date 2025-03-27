import React from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import DashboardSettingsView from './DashboardSettingsView';
import StorybookDecorators from '@/gui/lib/StorybookDecorators';

const meta: Meta<typeof DashboardSettingsView> = {
  title: 'Components/DashboardSettingsView',
  component: DashboardSettingsView,
  decorators: [StorybookDecorators.withLazyOllamaWebThemeProvider],
  tags: ['autodocs'],
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof DashboardSettingsView>;

export const Default: Story = {
  args: {},
  render: () => <DashboardSettingsView />
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

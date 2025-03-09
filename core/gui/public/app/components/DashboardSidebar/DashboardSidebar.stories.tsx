import React from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import DashboardSidebar from './DashboardSidebar';
import StorybookDecorators from '@/gui/lib/StorybookDecorators';

const meta: Meta<typeof DashboardSidebar> = {
  title: 'Components/DashboardSidebar',
  component: DashboardSidebar,
  decorators: [StorybookDecorators.withLazyOllamaWebThemeProvider],
  tags: ['autodocs'],
  argTypes: {}
};

export default meta;

type DashboardSidebarStory = StoryObj<typeof DashboardSidebar>;

export const Default: DashboardSidebarStory = {
  render: () => <DashboardSidebar />
};

export const DarkMode: DashboardSidebarStory = {
  parameters: {
    backgrounds: { default: 'dark' }
  },
  decorators: [StorybookDecorators.withDarkMode]
};

export const LightMode: DashboardSidebarStory = {
  parameters: {
    backgrounds: { default: 'light' }
  },
  decorators: [StorybookDecorators.withLightMode]
};

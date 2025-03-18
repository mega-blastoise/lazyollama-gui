import React from 'react';
import { type StoryObj, type Meta } from '@storybook/react';
import StorybookDecorators from '@/gui/lib/StorybookDecorators';
import DashboardSectionHeader from './DashboardSectionHeader';

type DashboardSectionHeaderMeta = Meta<typeof DashboardSectionHeader>;
type DashboardSectionHeaderStory = StoryObj<typeof DashboardSectionHeader>;

export default {
  title: 'Components/DashboardSectionHeader',
  component: DashboardSectionHeader,
  decorators: [StorybookDecorators.withLazyOllamaWebThemeProvider]
} as DashboardSectionHeaderMeta;

export const Default: DashboardSectionHeaderStory = {
  render: () => <DashboardSectionHeader />
};

export const DarkMode: DashboardSectionHeaderStory = {
  parameters: {
    backgrounds: { default: 'dark' }
  },
  decorators: [StorybookDecorators.withDarkMode]
};

export const LightMode: DashboardSectionHeaderStory = {
  parameters: {
    backgrounds: { default: 'light' }
  },
  decorators: [StorybookDecorators.withLightMode]
};

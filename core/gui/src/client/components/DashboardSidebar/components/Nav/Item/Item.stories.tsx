import React from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import LazyOllamaDashboardSidebarNavigationItem from './Item';
import StorybookDecorators from '@/gui/lib/StorybookDecorators';

const meta: Meta<typeof LazyOllamaDashboardSidebarNavigationItem> = {
  title: 'Components/DashboardSidebarNavigationItem',
  component: LazyOllamaDashboardSidebarNavigationItem,
  decorators: [StorybookDecorators.withLazyOllamaWebThemeProvider],
  tags: ['autodocs'],
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof LazyOllamaDashboardSidebarNavigationItem>;

export const Default: Story = {
  args: {
    label: 'Home',
    to: 'home'
  },
  render: (args) => <LazyOllamaDashboardSidebarNavigationItem {...args} />
};

import React from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import LazyOllamaDashboardSidebarFooter from './Footer';
import StorybookDecorators from '@/gui/lib/StorybookDecorators';

type Story = StoryObj<typeof LazyOllamaDashboardSidebarFooter>;

const meta: Meta<typeof LazyOllamaDashboardSidebarFooter> = {
  title: 'Components/DashboardSidebarFooter',
  component: LazyOllamaDashboardSidebarFooter,
  decorators: [StorybookDecorators.withLazyOllamaWebThemeProvider],
  tags: ['autodocs'],
  argTypes: {}
};

export default meta;

export const Default: Story = {};

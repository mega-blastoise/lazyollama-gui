import React from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import DashboardStatsView from './DashboardStatsView';
import StorybookDecorators from '@/gui/lib/StorybookDecorators';

const meta: Meta<typeof DashboardStatsView> = {
    title: 'Components/DashboardStatsView',
    component: DashboardStatsView,
    decorators: [StorybookDecorators.withLazyOllamaWebThemeProvider],
    tags: ['autodocs'],
    argTypes: {}
};

export default meta;

type Story = StoryObj<typeof DashboardStatsView>;

export const Default: Story = {
    args: {},
    render: () => <DashboardStatsView />
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

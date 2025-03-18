// GlassCard.stories.tsx
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import GlassCard from './Card';

const meta: Meta<typeof GlassCard> = {
  title: 'Components/GlassCard',
  component: GlassCard,
  decorators: [
    (Story) => (
      <div
        style={{
          padding: '2rem',
          background: 'linear-gradient(135deg, #2a0481 0%, #fc521f 100%)',
          height: '300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{ width: '300px' }}>
          <Story />
        </div>
      </div>
    )
  ]
};

export default meta;

type GlassCardStory = StoryObj<typeof GlassCard>;

export const Default: GlassCardStory = {
  args: {
    children: <div style={{ padding: '1rem' }}>Glass Card Content</div>,
    elevation: 'md',
    hasBorder: true,
    hasBlur: true,
    isInteractive: false,
    alignment: 'center'
  },
  render: (args) => <GlassCard {...args} />
};

export const Interactive: GlassCardStory = {
  args: {
    children: <div style={{ padding: '1rem' }}>Interactive Glass Card</div>,
    elevation: 'md',
    hasBorder: true,
    hasBlur: true,
    isInteractive: true,
    alignment: 'center'
  },
  render: (args) => <GlassCard {...args} />
};

export const HighElevation: GlassCardStory = {
  args: {
    children: <div style={{ padding: '1rem' }}>High Elevation Card</div>,
    elevation: 'xl',
    hasBorder: false,
    hasBlur: true,
    isInteractive: false,
    alignment: 'center'
  },
  render: (args) => <GlassCard {...args} />
};

import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Typography from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography
};

export default meta;

type TypographyStory = StoryObj<typeof Typography>;

export const Default: TypographyStory = {
  args: { children: 'Typography' },
  render: (args) => <Typography {...args} />
};

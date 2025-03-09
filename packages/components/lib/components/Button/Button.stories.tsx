import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button
};

export default meta;

type ButtonStory = StoryObj<typeof Button>;

export const Default: ButtonStory = {
  args: { children: 'Button' },
  render: (args) => <Button {...args} />
};

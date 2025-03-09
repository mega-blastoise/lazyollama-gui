import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input
};

export default meta;

type InputStory = StoryObj<typeof Input>;

export const Default: InputStory = {
  args: {},
  render: (args) => <Input {...args} />
};

import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Link from './Link';

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link
};

export default meta;

type LinkStory = StoryObj<typeof Link>;

export const Default: LinkStory = {
  args: { children: 'Button' },
  render: (args) => <Link {...args} />
};

import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import SearchInput from './SearchInput';

const meta: Meta<typeof SearchInput> = {
  title: 'Components/SearchInput',
  component: SearchInput
};

export default meta;

type SearchInputStory = StoryObj<typeof SearchInput>;

export const Default: SearchInputStory = {
  args: {},
  render: (args) => <SearchInput {...args} />
};

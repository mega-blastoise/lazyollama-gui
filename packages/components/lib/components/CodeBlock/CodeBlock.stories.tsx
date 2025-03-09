import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import CodeBlock from './CodeBlock';

const meta: Meta<typeof CodeBlock> = {
  title: 'Components/CodeBlock',
  component: CodeBlock
};

export default meta;

type CodeBlockStory = StoryObj<typeof CodeBlock>;

export const Default: CodeBlockStory = {
  args: {
    title: 'Example Code',
    code: `function helloWorld() {
      console.log("Hello World!");
      return true;
    }
    
    // This is a multi-line code example
    const sum = (a, b) => {
      return a + b;
    };`,
    language: 'javascript',
    showLineNumbers: true
  },
  render: (args) => <CodeBlock {...args} />
};

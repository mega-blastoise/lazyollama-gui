// Toast.stories.tsx
import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Toast from './Toast';
import { ToastProvider, useToast } from './ToastContext';
import Button from '../Button/Button';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  }
};

export default meta;

type ToastStory = StoryObj<typeof Toast>;

// Individual Toast Stories
export const Info: ToastStory = {
  args: {
    children: 'This is an informational message',
    variant: 'info',
    isVisible: true,
    position: 'bottom-right',
    duration: 0, // Set to 0 so it doesn't auto-dismiss in Storybook
  },
  render: (args) => <Toast {...args} />
};

export const Success: ToastStory = {
  args: {
    children: 'Operation completed successfully!',
    variant: 'success',
    isVisible: true,
    position: 'bottom-right',
    duration: 0,
  },
  render: (args) => <Toast {...args} />
};

export const Warning: ToastStory = {
  args: {
    children: 'This action might have consequences',
    variant: 'warning',
    isVisible: true,
    position: 'bottom-right',
    duration: 0,
  },
  render: (args) => <Toast {...args} />
};

export const Error: ToastStory = {
  args: {
    children: 'An error occurred. Please try again.',
    variant: 'error',
    isVisible: true,
    position: 'bottom-right',
    duration: 0,
  },
  render: (args) => <Toast {...args} />
};

// Toast Context Example
const ToastDemo = () => {
  const { showToast } = useToast();

  const handleShowToast = (variant: 'info' | 'success' | 'warning' | 'error') => {
    const messages = {
      info: 'This is an informational message',
      success: 'Operation completed successfully!',
      warning: 'This action might have consequences',
      error: 'An error occurred. Please try again.'
    };

    showToast({
      content: messages[variant],
      variant,
      duration: 3000,
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Button variant="primary" onClick={() => handleShowToast('info')}>
        Show Info Toast
      </Button>
      <Button variant="secondary" onClick={() => handleShowToast('success')}>
        Show Success Toast
      </Button>
      <Button variant="tertiary" onClick={() => handleShowToast('warning')}>
        Show Warning Toast
      </Button>
      <Button variant="outline" onClick={() => handleShowToast('error')}>
        Show Error Toast
      </Button>
    </div>
  );
};

export const ToastContextExample: ToastStory = {
  args: {},
  render: () => (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  )
};
import type { Meta, StoryObj } from '@storybook/react';
import { NavBar } from '../../client/components/NavBar';
import { ErrorNotification } from '../../client/components/ErrorNotification';
import React, { useState } from 'react';
import { LoadingBar } from '../../client/components/LoadingBar';

const meta = {
  title: 'General/LoadingBar',
  component: LoadingBar,
} satisfies Meta<typeof LoadingBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Visible: Story = {
  args: {
    show: true,
  },
};

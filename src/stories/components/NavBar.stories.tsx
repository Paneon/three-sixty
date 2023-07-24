import type { Meta, StoryObj } from '@storybook/react';
import { NavBar } from '../../client/components/NavBar';
import { ErrorNotification } from '../../client/components/ErrorNotification';
import React, { useState } from 'react';

const meta = {
  title: 'General/NavBar',
  component: NavBar,
  args: {
    onSwitchPage: () => {},
  },
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const Wrapper = () => {
  const [page, setPage] = useState('home');
  return (
    <div>
      <NavBar
        onSwitchPage={(page) => {
          setPage(page);
        }}
      />
      <br />
      <h2 style={{ textAlign: 'center' }}>{page}</h2>
    </div>
  );
};

export const Default: Story = {
  render: () => <Wrapper />,
};

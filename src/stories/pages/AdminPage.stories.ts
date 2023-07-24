import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { AdminPage } from '../../client/pages/AdminPage';
import { AdminPageLayout } from '../../client/components/AdminPage.layout';

const meta = {
  title: 'Admin/Page',
  component: AdminPageLayout,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AdminPageLayout>;

const mockPerson1 = {
  firstName: 'Alvin',
  lastName: 'M',
  email: 'example@example.com',
  role: 'developer',
  personalFormId: '',
  teamFormId: '',
  personalSpreadsheetId: '',
  teamSpreadsheetId: '',
};
const mockPerson2 = {
  ...mockPerson1,
  firstName: 'Theodor',
  lastName: 'M',
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps = {
  showLoading: false,
  progress: 0,
  error: null,
  teams: [],
  onAddTeam: () => {},
  onRemoveTeam: () => {},
  onAddPerson: () => {},
  onRemovePerson: () => {},
};

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const LoadingTeams: Story = {
  args: {
    ...defaultProps,
    showLoading: true,
  },
};

export const Teams: Story = {
  args: {
    ...defaultProps,
    teams: [
      {
        teamName: 'Apollo',
        members: [mockPerson1, mockPerson2],
      },
    ],
  },
};

export const WithProgressBar: Story = {
  args: {
    ...defaultProps,
    progress: 30,
    teams: [
      {
        teamName: 'Apollo',
        members: [mockPerson1, mockPerson2],
      },
    ],
  },
};

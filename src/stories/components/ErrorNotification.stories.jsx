import React from 'react';
import { ErrorNotification } from '../../client/components/ErrorNotification';

export default {
  title: 'General/ErrorNotification',
  component: ErrorNotification,
  tags: ['autodocs'],
};

export const WithError = {
  render: () => <ErrorNotification error={'Sample Error Message.'} />,
};

export const NoError = {
  render: () => <ErrorNotification error={null} />,
};

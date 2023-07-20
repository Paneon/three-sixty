import React from 'react';

interface ErrorProps {
  error: string | null;
}

export const ErrorNotification = ({ error = null }: ErrorProps) => {
  if (!error) {
    return null;
  }
  return (
    <div className="notification is-danger">
      <button className="delete"></button>
      <h1 className="title">Error</h1>
      <h2 className="subtitle">${error}</h2>
    </div>
  );
};

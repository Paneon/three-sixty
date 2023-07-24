import React, { useState } from 'react';
import { Toast } from 'react-bootstrap';

interface ErrorProps {
  errorMessage: string | null;
}

export const ErrorNotification = ({ errorMessage = null }: ErrorProps) => {
  const [error, setError] = useState<string | null>(errorMessage);

  if (!error) {
    return null;
  }

  return (
    <Toast
      className="my-4"
      show={!!error}
      bg="warning"
      onClose={() => setError(null)}
    >
      <Toast.Header>
        <strong className="me-auto">Error</strong>
      </Toast.Header>
      <Toast.Body>{error}</Toast.Body>
    </Toast>
  );
};

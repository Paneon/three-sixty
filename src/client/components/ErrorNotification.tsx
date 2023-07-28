import React, { useState } from 'react';
import { Toast } from 'react-bootstrap';

interface ErrorProps {
  errorMessage: string | null;
}

export const ErrorNotification = ({ errorMessage = null }: ErrorProps) => {
  const [error, setError] = useState<string | null>(errorMessage);

  const showError = error !== '' && error !== null;

  if (!showError) {
    return null;
  }

  return (
    <Toast
      className="my-4"
      show={true}
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

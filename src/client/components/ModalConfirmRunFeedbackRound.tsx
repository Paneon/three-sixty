import { Button, Form, Modal } from 'react-bootstrap';
import React, { FormEventHandler, useEffect, useState } from 'react';
import { TOnAddPerson, TOnRunFeedbackRound } from '../pages/AdminPage';

interface Props {
  show: boolean;
  teamName: string;
  onHide: VoidFunction;
  onConfirm: TOnRunFeedbackRound;
}

export const ModalConfirmRunFeedbackRound = ({
  show,
  teamName,
  onConfirm,
  onHide,
}: Props) => {
  const handleConfirm: FormEventHandler = (e) => {
    e.preventDefault();
    onConfirm(teamName);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Run Feedback Round</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Confirm you want to start a round of feedback for the team &quot;
          {teamName}&quot;.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={handleConfirm}>
          Confirm
        </Button>
        <Button variant="outline-secondary" onClick={onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

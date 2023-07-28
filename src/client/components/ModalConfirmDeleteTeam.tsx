import { Button, Form, Modal } from 'react-bootstrap';
import React, { FormEventHandler, useEffect, useState } from 'react';
import {
  TOnAddPerson,
  TOnRemoveTeam,
  TOnRunFeedbackRound,
} from '../pages/AdminPage';

interface Props {
  show: boolean;
  teamName: string;
  onHide: VoidFunction;
  onConfirm: TOnRemoveTeam;
}

export const ModalConfirmDeleteTeam = ({
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
        <Modal.Title>Delete Team</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Confirm you want to delete the team &quot;{teamName}&quot;.
          <br />
          This will delete all team members, their forms and feedback. Ensure
          you have backed up anything you care about beforehand.
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

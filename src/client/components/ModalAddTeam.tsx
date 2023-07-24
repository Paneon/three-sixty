import { Button, Form, Modal } from 'react-bootstrap';
import React, { useState } from 'react';
import { TOnAddTeam } from '../pages/AdminPage';

interface Props {
  show: boolean;
  onHide: VoidFunction;
  onAddTeam: TOnAddTeam;
}
export const ModalAddTeam = ({ show, onHide, onAddTeam }: Props) => {
  const [teamName, setTeamName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    onAddTeam(teamName);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Team</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="add-team-name">
            <Form.Label>Team Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. The trombones"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
            <Form.Text className="text-muted">
              Enter the name for your new team here
            </Form.Text>
          </Form.Group>
          <Button variant="primary" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Submit'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

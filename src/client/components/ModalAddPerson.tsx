import { Button, Form, Modal, ProgressBar } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { serverFunctions } from '../utils/serverFunctions';
import { TOnAddPerson } from '../pages/AdminPage';

interface Props {
  show: boolean;
  teamName: string;
  onHide: VoidFunction;
  onAddPerson: TOnAddPerson;
}

const AddPersonModal = ({ show, teamName, onAddPerson, onHide }: Props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');

  const handleAddPerson = (e) => {
    e.preventDefault();
    onAddPerson(firstName, lastName, role, email, teamName);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Person</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId={`${teamName}-add-name`}>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. Steve"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Form.Text className="text-muted">
              Enter the first or given name for your team member
            </Form.Text>
          </Form.Group>

          <Form.Group controlId={`${teamName}-add-surname`}>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. Smith"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Form.Text className="text-muted">
              Enter the lastname/surname for your team member
            </Form.Text>
          </Form.Group>

          <Form.Group controlId={`${teamName}-add-role`}>
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option>Engineer</option>
              <option>Product Manager</option>
              <option>Scrum Master</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId={`${teamName}-add-email`}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="steve.smith@mysweetbiz.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              Enter the email for your team member
            </Form.Text>
          </Form.Group>

          <Button variant="primary" onClick={handleAddPerson}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddPersonModal;

import React, { useState } from 'react';
import { TeamMemberRow } from './TeamMemberRow';
import { Button, Card } from 'react-bootstrap';
import { IPerson } from '../../types/IPerson';
import {
  TOnAddPerson,
  TOnRemovePerson,
  TOnRemoveTeam,
  TOnRunFeedbackRound,
} from '../pages/AdminPage';
import ModalAddPerson from './ModalAddPerson';
import { ModalConfirmRunFeedbackRound } from './ModalConfirmRunFeedbackRound';
import { ModalConfirmDeleteTeam } from './ModalConfirmDeleteTeam';

interface TeamCardProps {
  teamName: string;
  members: IPerson[];
  onRemovePerson: TOnRemovePerson;
  onRemoveTeam: TOnRemoveTeam;
  onAddPerson: TOnAddPerson;
  onRunFeedbackRound: TOnRunFeedbackRound;
}
export const TeamCard = ({
  teamName,
  members,
  onRemovePerson,
  onRemoveTeam,
  onAddPerson,
  onRunFeedbackRound,
}: TeamCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmRunModal, setShowConfirmRunModal] = useState(false);
  const [showConfirmDeleteTeam, setShowConfirmDeleteTeam] = useState(false);

  const showAddMemberModal = () => {
    setShowModal(true);
  };

  const showRunFeedbackRoundModal = () => {
    setShowConfirmRunModal(true);
  };
  const showConfirmDeletionModal = () => {
    setShowConfirmDeleteTeam(true);
  };

  const handleOnRemove = (firstName: string, lastName: string) => {
    onRemovePerson(firstName, lastName, teamName);
  };

  const handleRemoveTeam = () => {
    setShowConfirmDeleteTeam(false);
    onRemoveTeam(teamName);
  };

  return (
    <Card className="my-2">
      <Card.Header>
        <Card.Title>{teamName}</Card.Title>
      </Card.Header>
      <Card.Body>
        <ModalAddPerson
          show={showModal}
          onAddPerson={onAddPerson}
          teamName={teamName}
          onHide={() => setShowModal(false)}
        />
        <ModalConfirmRunFeedbackRound
          show={showConfirmRunModal}
          teamName={teamName}
          onHide={() => setShowConfirmRunModal(false)}
          onConfirm={onRunFeedbackRound}
        />
        <ModalConfirmRunFeedbackRound
          show={showConfirmRunModal}
          teamName={teamName}
          onHide={() => setShowConfirmRunModal(false)}
          onConfirm={onRunFeedbackRound}
        />
        <ModalConfirmDeleteTeam
          show={showConfirmDeleteTeam}
          teamName={teamName}
          onHide={() => setShowConfirmDeleteTeam(false)}
          onConfirm={handleRemoveTeam}
        />
        <table className="table is-fullwidth is-hoverable">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Role</th>
              <th>Email Address</th>
              <th>Remove From Team</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, i) => {
              return (
                <TeamMemberRow
                  key={i}
                  member={member}
                  onRemove={handleOnRemove}
                />
              );
            })}
          </tbody>
        </table>
      </Card.Body>
      <Card.Footer>
        <Button
          variant="outline-primary"
          onClick={showAddMemberModal}
          className="me-2"
        >
          Add Team Member
        </Button>
        <Button
          variant="outline-secondary"
          onClick={showRunFeedbackRoundModal}
          className="me-2"
        >
          Run new feedback round
        </Button>
        <Button variant="warning" onClick={showConfirmDeletionModal}>
          Delete Team
        </Button>
      </Card.Footer>
    </Card>
  );
};

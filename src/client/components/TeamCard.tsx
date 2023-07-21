import React from 'react';
import { serverFunctions } from '../utils/serverFunctions';
import { TeamMemberRow } from './TeamMemberRow';
import { Button, Card } from 'react-bootstrap';
import { IPerson } from '../../types/IPerson';

interface TeamCardProps {
  teamName: string;
  members: IPerson[];
  onRemovePerson: (
    firstName: string,
    lastName: string,
    teamName: string,
  ) => void;
  onRemoveTeam: (teamName: string) => void;
}
export const TeamCard = ({
  teamName,
  members,
  onRemovePerson,
  onRemoveTeam,
}: TeamCardProps) => {
  const showAddMemberModal = () => {};

  const showRunFeedbackRoundModal = () => {};

  const handleOnRemove = (firstName: string, lastName: string) => {
    onRemovePerson(firstName, lastName, teamName);
  };

  const handleRemoveTeam = () => {
    onRemoveTeam(teamName);
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>{teamName}</Card.Title>
      </Card.Header>
      <Card.Body>
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
        <Button variant="primary" onClick={showAddMemberModal} className="me-2">
          Add Team Member
        </Button>
        <Button
          variant="primary"
          onClick={showRunFeedbackRoundModal}
          className="me-2"
        >
          Run new feedback round
        </Button>
        <Button variant="primary" onClick={handleRemoveTeam}>
          Delete Team
        </Button>
      </Card.Footer>
    </Card>
  );
};

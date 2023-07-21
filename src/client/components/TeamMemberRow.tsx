import React, { useState } from 'react';
import { Badge, Button } from 'react-bootstrap';
import { IPerson } from '../../types/IPerson';

interface Props {
  member: IPerson;
  onRemove: (firstName: string, lastName: string) => void;
}

export const TeamMemberRow = ({ member, onRemove }: Props) => {
  const [deletionInProgress, setDeletionInProgress] = useState(false);

  const triggerDeletion = () => {
    setDeletionInProgress(true);
    onRemove(member.firstName, member.lastName);
  };

  return (
    <tr>
      <th>{member.firstName}</th>
      <th>{member.lastName}</th>
      <th>{member.role}</th>
      <th>{member.email}</th>
      <th>
        {deletionInProgress ? (
          <Badge bg="warning">Deleting</Badge>
        ) : (
          <Button variant="danger" onClick={triggerDeletion}>
            Remove {member.firstName}
          </Button>
        )}
      </th>
    </tr>
  );
};

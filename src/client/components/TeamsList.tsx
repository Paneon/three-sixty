import { ViewModel } from '../../types/ViewModel';
import { TeamCard } from './TeamCard';
import React from 'react';
import {
  TOnAddPerson,
  TOnRemovePerson,
  TOnRemoveTeam,
  TOnRunFeedbackRound,
} from '../pages/AdminPage';

interface Props {
  teams: ViewModel[];
  onRemovePerson: TOnRemovePerson;
  onRemoveTeam: TOnRemoveTeam;
  onAddPerson: TOnAddPerson;
  onRunFeedbackRound: TOnRunFeedbackRound;
}
export const TeamsList = ({
  teams,
  onRemovePerson,
  onRemoveTeam,
  onAddPerson,
  onRunFeedbackRound,
}: Props) => {
  return (
    <>
      {teams.map((team, i) => {
        return (
          <TeamCard
            key={i}
            teamName={team.teamName}
            members={team.members}
            onRemovePerson={onRemovePerson}
            onRemoveTeam={onRemoveTeam}
            onAddPerson={onAddPerson}
            onRunFeedbackRound={onRunFeedbackRound}
          />
        );
      })}
    </>
  );
};

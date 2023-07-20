import React from 'react';
import { serverFunctions } from '../utils/serverFunctions';

interface TeamCardProps {
  teamName: string;
  members: Person[];
  onRemovePerson: (
    firstName: string,
    lastName: string,
    teamName: string,
  ) => void;
}
export const TeamCard = ({
  teamName,
  members,
  onRemovePerson,
}: TeamCardProps) => {
  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title title is-4">${teamName}</p>
      </header>
      <div className="card-content">
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
            {members.map(({ firstName, lastName, role, email }) => {
              return (
                <tr>
                  <th>${firstName}</th>
                  <th>${lastName}</th>
                  <th>${role}</th>
                  <th>${email}</th>
                  <th>
                    <a
                      onClick={(e) =>
                        onRemovePerson(firstName, lastName, teamName)
                      }
                    >
                      Remove ${firstName}
                    </a>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <footer className="card-footer">
        <a id="${teamName}-add" className="card-footer-item">
          Add Team Member
        </a>
        <a id="${teamName}-start" className="card-footer-item">
          Run new feedback round
        </a>
        <a id="${teamName}-delete" className="card-footer-item">
          Delete Team
        </a>
      </footer>
    </div>
  );
};

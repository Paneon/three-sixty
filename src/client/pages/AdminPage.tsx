import React, { useEffect, useState } from 'react';
import { Google } from '../../types/GoogleRunScript';
import { serverFunctions } from '../utils/serverFunctions';
import { ViewModel } from '../../types/ViewModel';
import { AdminPageLayout } from '../components/AdminPage.layout';

declare const google: Google;

export type TOnRemovePerson = (
  firstName: string,
  lastName: string,
  teamName: string,
) => void;
export type TOnAddTeam = (teamName: string) => void;
export type TOnRemoveTeam = (teamName: string) => void;

export type TOnAddPerson = (
  firstName: string,
  lastName: string,
  role: string,
  email: string,
  team: string,
) => void;

let interval;

export const AdminPage = () => {
  const [teams, setTeams] = useState([] as ViewModel[]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onSuccessHandler = (responseData) => {
    setIsLoading(false);
    if ('error' in responseData && responseData.error) {
      setError(responseData.error);
      return;
    }
    setTeams(responseData);
  };

  const onErrorHandler = (error: ErrorMessage) => {
    setIsLoading(false);
    setError(error.error);
  };

  const handleAddTeam = (teamName: string) => {
    setIsLoading(true);
    serverFunctions
      .addTeam(teamName)
      .then(onSuccessHandler)
      .catch(onErrorHandler);
  };

  const handleOnAddPerson: TOnAddPerson = (
    firstName,
    lastName,
    role,
    email,
    team,
  ) => {
    setProgress(2);

    serverFunctions
      .addPerson({ firstName, lastName, email, role, team })
      .then((responseData) => {
        setProgress(0);
        clearInterval(interval);
        onSuccessHandler(responseData);
      })
      .catch(onErrorHandler);

    interval = setInterval(() => {
      setProgress((prevState) => prevState + 2);
    }, 1000);
  };

  const handleOnRemovePerson = (
    firstName: string,
    lastName: string,
    teamName: string,
  ) => {
    serverFunctions
      .removePerson({ firstName, lastName, teamName })
      .then(onSuccessHandler)
      .catch(onErrorHandler);
  };

  const handleRemoveTeam = (teamName: string) => {
    setIsLoading(true);
    serverFunctions
      .removeTeam(teamName)
      .then(onSuccessHandler)
      .catch(onErrorHandler);
  };

  useEffect(() => {
    setIsLoading(true);
    serverFunctions.getTeams().then(onSuccessHandler).catch(onErrorHandler);
  }, []);

  return (
    <AdminPageLayout
      showLoading={isLoading}
      progress={progress}
      error={error}
      teams={teams}
      onAddPerson={handleOnAddPerson}
      onRemovePerson={handleOnRemovePerson}
      onAddTeam={handleAddTeam}
      onRemoveTeam={handleRemoveTeam}
    />
  );
};

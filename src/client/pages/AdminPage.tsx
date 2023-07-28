import React, { useEffect, useState } from 'react';
import { Google } from '../../types/GoogleRunScript';
import { serverFunctions } from '../utils/serverFunctions';
import { isViewModel, ViewModel } from '../../types/ViewModel';
import { AdminPageLayout } from '../components/AdminPage.layout';
import {
  IErrorMessage,
  isErrorMessage,
  isErrorResponse,
} from '../../types/Error';

declare const google: Google;

export type TOnRemovePerson = (
  firstName: string,
  lastName: string,
  teamName: string,
) => void;
export type TOnAddTeam = (teamName: string) => void;
export type TOnRemoveTeam = (teamName: string) => void;
export type TOnRunFeedbackRound = (teamName: string) => void;

export type TOnAddPerson = (
  firstName: string,
  lastName: string,
  role: string,
  email: string,
  team: string,
) => void;

let interval: NodeJS.Timer;

export const AdminPage = () => {
  const [teams, setTeams] = useState([] as ViewModel[]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onSuccessHandler = (responseData: ViewModel[] | IErrorMessage) => {
    setIsLoading(false);
    console.log('onSuccess', responseData);

    if (
      Array.isArray(responseData) &&
      responseData.every((item) => isViewModel(item))
    ) {
      setTeams(responseData);
      return;
    }

    if (isErrorMessage(responseData)) {
      setError(responseData.error);
      return;
    }

    throw Error('Invalid Response Data: ' + JSON.stringify(responseData));
  };

  const onErrorHandler = (error: unknown) => {
    setIsLoading(false);
    console.warn('GAS Server Error');
    console.dir(error);

    if (isErrorResponse(error)) {
      const message = `${error.message} ${error.stack}`;
      console.log(message);
      setError(message);
    } else {
      setError(error as string);
    }
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

  const triggerFeedbackRound: TOnRunFeedbackRound = (teamName: string) => {
    setIsLoading(true);
    serverFunctions
      .runFeedbackRound(teamName)
      .then((teamName: string) => {
        setIsLoading(false);
      })
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
      onRunFeedbackRound={triggerFeedbackRound}
    />
  );
};

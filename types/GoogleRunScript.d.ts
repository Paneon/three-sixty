import {
  runFeedbackRound,
  addPerson,
  removePerson,
  addTeam,
  removeTeam,
  getTeams,
} from '../App';

export interface Google {
  script: {
    run: {
      withSuccessHandler(callback: CallableFunction): ScriptFunctions;
    };
  };
}

interface ScriptFunctions {
  runFeedbackRound: typeof runFeedbackRound;
  addPerson: typeof addPerson;
  removePerson: typeof removePerson;
  addTeam: typeof addTeam;
  removeTeam: typeof removeTeam;
  getTeams: typeof getTeams;
}

declare let google: Google;

import {
  runFeedbackRound,
  addPerson,
  removePerson,
  addTeam,
  removeTeam,
  getTeams,
} from '../server';

interface ChainableFunction {
  withFailureHandler(
    callback: CallableFunction,
  ): ChainableFunction & ScriptFunctions;
  withSuccessHandler(
    callback: CallableFunction,
  ): ChainableFunction & ScriptFunctions;
}

export interface Google {
  script: {
    run: ChainableFunction & ScriptFunctions;
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

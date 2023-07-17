import {
  runFeedbackRound,
  addPerson,
  removePerson,
  addTeam,
  removeTeam,
  getTeams,
} from '../App';

interface ChainableFunction {
  withFailureHandler(
    callback: CallableFunction,
  ): ChainableFunction | ScriptFunctions;
  withSuccessHandler(
    callback: CallableFunction,
  ): ChainableFunction | ScriptFunctions;
}

export interface Google {
  script: {
    run: ChainableFunction;
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

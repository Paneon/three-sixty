import HtmlOutput = GoogleAppsScript.HTML.HtmlOutput;
import { TeamRepository } from './repositories/TeamRepository';
import { PersonFactory } from './factories/PersonFactory';
import { PersonService } from './services/PersonService';
import { PersonRepository } from './repositories/PersonRepository';
import { FeedbackRoundService } from './services/FeedbackRoundService';
import { FeedbackRepository } from './repositories/FeedbackRepository';
import { ViewModel } from '../types/ViewModel';

// eslint-disable-next-line no-console
Logger.log('VERSION: 1.1');

declare let global: Record<string, unknown>;

global.doGet = doGet;
global.getTeams = getTeams;
global.addTeam = addTeam;
global.removeTeam = removeTeam;
global.addPerson = addPerson;
global.removePerson = removePerson;
global.runFeedbackRound = runFeedbackRound;
global.getFeedbackData = getFeedbackData;

export function doGet(): HtmlOutput {
  return HtmlService.createTemplateFromFile('index').evaluate();
}

export function include(filename: string): string {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

export function getTeams(): ViewModel[] {
  return TeamRepository.getTeams();
}

export function addTeam(teamName: string): ViewModel[] {
  TeamRepository.addTeam(teamName);

  return getTeams();
}

export function removeTeam(teamName: string): ViewModel[] {
  TeamRepository.removeTeam(teamName);

  return getTeams();
}

export function addPerson({
  firstName,
  lastName,
  email,
  role,
  team,
}: Record<string, string>): ViewModel[] {
  const person = PersonFactory.create(firstName, lastName, email, role);
  const personService = new PersonService(person.name);
  personService.addPerson(person, team);

  return getTeams();
}

export function updatePerson(
  teamName: string,
  firstName: string,
  lastName: string,
) {
  const person = PersonRepository.getPerson(teamName, firstName, lastName);
}

export function runFeedbackRound(teamName: string): string {
  const feedbackRoundService = new FeedbackRoundService();
  const teamRepository = new TeamRepository();
  const teamSheet = teamRepository.getTeamSheet(teamName);

  feedbackRoundService.run(teamSheet);

  return teamName;
}

export function removePerson({
  firstName,
  lastName,
  teamName,
}: Record<string, string>): ViewModel[] {
  PersonRepository.removePerson({ firstName, lastName, teamName });
  return getTeams();
}

export function getFeedbackData(name: string) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return FeedbackRepository.getFeedbackData(name);
}

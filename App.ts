import { TeamRepository } from './src/repositories/TeamRepository';
import { FeedbackRepository } from './src/repositories/FeedbackRepository';
import { PersonRepository } from './src/repositories/PersonRepository';
import { PersonService } from './src/services/PersonService';
import { PersonFactory } from './src/factories/PersonFactory';
import { FeedbackRoundService } from './src/services/FeedbackRoundService';
import HtmlOutput = GoogleAppsScript.HTML.HtmlOutput;

// eslint-disable-next-line no-console
Logger.log('VERSION: 1.1');

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
}): ViewModel[] {
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

export function removePerson({ firstName, lastName, teamName }): ViewModel[] {
  PersonRepository.removePerson({ firstName, lastName, teamName });
  return getTeams();
}

export function getFeedbackData(name: string) {
  FeedbackRepository.getFeedbackData(name);
}

import { Constants } from './namespaces/Constants';
import { Email } from './namespaces/Email';
import HtmlOutput = GoogleAppsScript.HTML.HtmlOutput;
import { GoogleDriveService } from './src/services/GoogleDriveService';
import { TeamRepository } from './src/repositories/TeamRepository';
import { FeedbackRepository } from './src/repositories/FeedbackRepository';
import { PersonRepository } from './src/repositories/PersonRepository';
import { FormService } from './src/services/FormService';

// eslint-disable-next-line no-console
console.info('VERSION: 1.1');
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
  const lock = LockService.getScriptLock();
  lock.tryLock(15000);
  const folder = GoogleDriveService.getOrCreateWorkingFolder();
  const name = [firstName, lastName].filter(Boolean).join(' ');
  const formService = new FormService();

  const forms = [
    formService.createFeedbackForm(`${name}'s Self-Reflection`, true, role),
    formService.createFeedbackForm(`${name}'s Team Feedback`, false, role),
  ];
  const spreadsheets = [
    SpreadsheetApp.create(`${name}'s Self-Reflection Results`),
    SpreadsheetApp.create(`${name}'s Team Feedback Results`),
  ];
  const { 0: personalForm, 1: teamForm } = forms;
  const [pfid, tfid, psid, tsid] = [...forms, ...spreadsheets].map((f) =>
    f.getId(),
  );
  personalForm.setDestination(FormApp.DestinationType.SPREADSHEET, psid);
  teamForm.setDestination(FormApp.DestinationType.SPREADSHEET, tsid);
  forms.forEach((file) =>
    GoogleDriveService.addFileToWorkingFolder(folder, file),
  );
  spreadsheets.forEach((file) =>
    GoogleDriveService.addFileToWorkingFolder(folder, file),
  );
  TeamRepository.getOrCreateTeamSpreadsheet(folder)
    .getSheetByName(team)
    .appendRow([firstName, lastName, email, pfid, tfid, psid, tsid, role]);
  Utilities.sleep(15000);
  lock.releaseLock();

  return getTeams();
}

function multiplyArray(arr, times) {
  return times ? arr.concat(multiplyArray(arr, times - 1)) : [];
}

export function runFeedbackRound(teamName: string): string {
  const folder = GoogleDriveService.getOrCreateWorkingFolder();
  const teamSheet =
    TeamRepository.getOrCreateTeamSpreadsheet(folder).getSheetByName(teamName);
  const team = teamSheet.getDataRange().getValues();

  // if there are more than chunkSize number of people limit the number of forms
  // each person receives
  const chunkSize = team.length > 4 ? 4 : team.length - 1;
  const allFeedbackRequests = multiplyArray(team, chunkSize);
  const rotatedPeers = [
    allFeedbackRequests[allFeedbackRequests.length - 1],
    ...allFeedbackRequests.slice(1, allFeedbackRequests.length - 1),
    allFeedbackRequests[0],
  ];
  const teamWithPeers = team.map((person, index) => {
    const startIndex = index * chunkSize;
    const endIndex = startIndex + chunkSize;
    return [...person, rotatedPeers.slice(startIndex, endIndex)];
  });

  teamWithPeers.forEach(
    (
      [firstName, lastName, email, pfid, tfid, psid, tsid, role, peers],
      i,
      original,
    ) => {
      const personalSpreadsheet = SpreadsheetApp.openById(psid);
      const personalResultsSheet = personalSpreadsheet.getSheetByName(
        Constants.DEFAULT_RESULTS_SHEET,
      );
      const newSheetRequired = personalResultsSheet.getLastRow() > 1;
      const numberOfRounds = personalSpreadsheet
        .getSheets()
        .filter((sheet) => sheet.getName() !== Constants.DEFAULT_SHEET).length;
      if (newSheetRequired) {
        personalSpreadsheet.insertSheet(
          `Form Responses ${numberOfRounds + 1}`,
          { template: personalResultsSheet },
        );
      }
      const teamSpreadSheet = SpreadsheetApp.openById(tsid);
      const teamResultsSheet = teamSpreadSheet.getSheetByName(
        Constants.DEFAULT_RESULTS_SHEET,
      );
      if (newSheetRequired) {
        teamSpreadSheet.insertSheet(`Form Responses ${numberOfRounds + 1}`, {
          template: teamResultsSheet,
        });
      }
      const personalFormUrl = FormApp.openById(pfid).getPublishedUrl();
      Email.sendEmail(email, 'New 360 Feedback Round', {
        firstName,
        personalFormUrl,
        peers,
      });
    },
  );
  return teamName;
}

export function removePerson({ firstName, lastName, teamName }): ViewModel[] {
  PersonRepository.removePerson({ firstName, lastName, teamName });
  return getTeams();
}

export function getFeedbackData(name: string) {
  FeedbackRepository.getFeedbackData(name);
}

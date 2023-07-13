import { Constants } from './namespaces/Constants';
import { Form } from './namespaces/Form';
import { Email } from './namespaces/Email';
import HtmlOutput = GoogleAppsScript.HTML.HtmlOutput;
import { TeamRepository } from './src/repositories/TeamRepository';
import { GoogleDriveService } from './src/services/GoogleDriveService';
import { PersonRepository } from './src/repositories/PersonRepository';

// eslint-disable-next-line no-console
console.info('VERSION: 1.1');

export function doGet(): HtmlOutput {
  return HtmlService.createTemplateFromFile('index').evaluate();
}

export function include(filename: string): string {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

export function addTeam(teamName: string): ViewModel[] {
  const sanitisedName = teamName.replace(' ', '-');
  const teamSpreadSheet = TeamRepository.getOrCreateTeamSpreadsheet(
    GoogleDriveService.getOrCreateWorkingFolder(),
  );
  teamSpreadSheet.insertSheet(sanitisedName);

  return TeamRepository.getTeams();
}

export function removeTeam(teamName: string): ViewModel[] {
  const teamSpreadSheet = TeamRepository.getOrCreateTeamSpreadsheet(
    GoogleDriveService.getOrCreateWorkingFolder(),
  );
  teamSpreadSheet.deleteSheet(teamSpreadSheet.getSheetByName(teamName));

  return TeamRepository.getTeams();
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

  const forms = [
    Form.createFeedbackForm(`${name}'s Self-Reflection`, true, role),
    Form.createFeedbackForm(`${name}'s Team Feedback`, false, role),
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

  return TeamRepository.getTeams();
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

export function removePerson({ name, teamName }) {
  return PersonRepository.removePerson(name, teamName);
}

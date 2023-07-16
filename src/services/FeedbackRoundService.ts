import { TeamRepository } from '../repositories/TeamRepository';
import { GoogleDriveService } from './GoogleDriveService';
import { Constants } from '../../namespaces/Constants';
import { Email } from '../../namespaces/Email';
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;

export class FeedbackRoundService {
  constructor() {}

  run(teamSheet: Sheet) {
    const team = teamSheet.getDataRange().getValues();

    // if there are more than chunkSize number of people limit the number of forms
    // each person receives
    const chunkSize = team.length > 4 ? 4 : team.length - 1;
    const allFeedbackRequests = this.multiplyArray(team, chunkSize);
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
          .filter(
            (sheet) => sheet.getName() !== Constants.DEFAULT_SHEET,
          ).length;
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
        // TODO E-Mail Service
        Email.sendEmail(email, 'New 360 Feedback Round', {
          firstName,
          personalFormUrl,
          peers,
        });
      },
    );
  }

  private multiplyArray(arr, times) {
    return times ? arr.concat(this.multiplyArray(arr, times - 1)) : [];
  }
}

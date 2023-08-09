import { Email } from '../../../namespaces/Email';
import { DEFAULT_RESULTS_SHEET, DEFAULT_SHEET, MAX_FEEDBACK_RECEIVERS } from '../../shared/config';
import { PersonFactory } from '../factories/PersonFactory';
import { Person } from '../models/Person';
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;
import { TeamMemberWithPeers } from '../models/TeamMemberWithPeers';

export class FeedbackRoundService {
  run(teamSheet: Sheet) {
    const team = this.getTeamData(teamSheet);
    const chunkSize = this.calculateChunkSize(team);
    const allFeedbackRequests = this.multiplyArray<Person>(team, chunkSize);
    const rotatedPeers = this.rotatePeers(allFeedbackRequests);

    const teamWithPeers = this.assignPeers(team, chunkSize, rotatedPeers);

    teamWithPeers.forEach((teamMemberWithPeers, i, original) => {
      this.manageSpreadsheetForTeamMember(teamMemberWithPeers);
      this.sendEmailToTeamMember(teamMemberWithPeers);
    });
  }

  public manageSpreadsheetForTeamMember(teamMember: TeamMemberWithPeers) {
    const personalSpreadsheet = SpreadsheetApp.openById(teamMember.personalSpreadsheetId!);
    const personalResultsSheet = personalSpreadsheet.getSheetByName(DEFAULT_RESULTS_SHEET);

    const numberOfRounds = personalSpreadsheet.getSheets().filter((sheet) => sheet.getName() !== DEFAULT_SHEET).length;

    const newSheetRequired = personalResultsSheet.getLastRow() > 1;
    if (newSheetRequired) {
      personalSpreadsheet.insertSheet(`Form Responses ${numberOfRounds + 1}`, {
        template: personalResultsSheet,
      });
    }
    const teamSpreadSheet = SpreadsheetApp.openById(teamMember.teamSpreadsheetId!);
    const teamResultsSheet = teamSpreadSheet.getSheetByName(DEFAULT_RESULTS_SHEET);

    if (newSheetRequired) {
      teamSpreadSheet.insertSheet(`Form Responses ${numberOfRounds + 1}`, {
        template: teamResultsSheet,
      });
    }
  }

  public sendEmailToTeamMember(teamMember: TeamMemberWithPeers) {
    const personalFormUrl = FormApp.openById(teamMember.personalFormId!).getPublishedUrl();

    Email.sendEmail(teamMember.email, 'New 360 Feedback Round', teamMember, personalFormUrl);
  }

  public assignPeers(team: Person[], chunkSize: number, rotatedPeers: Person[]): TeamMemberWithPeers[] {
    return team.map((person, index) => {
      const startIndex = index * chunkSize;
      const endIndex = startIndex + chunkSize;
      return new TeamMemberWithPeers(person, rotatedPeers.slice(startIndex, endIndex));
    });
  }

  public getTeamData(teamSheet: Sheet): Person[] {
    return teamSheet
      .getDataRange()
      .getValues()
      .map((row: string[]) => {
        return PersonFactory.createFromRow(row);
      });
  }

  public calculateChunkSize(team: Person[]): number {
    return team.length > MAX_FEEDBACK_RECEIVERS ? MAX_FEEDBACK_RECEIVERS : team.length - 1;
  }

  public rotatePeers(allFeedbackRequests: Person[]) {
    return [allFeedbackRequests[allFeedbackRequests.length - 1], ...allFeedbackRequests.slice(1, allFeedbackRequests.length - 1), allFeedbackRequests[0]];
  }

  public multiplyArray<T>(arr: T[], times: number): T[] {
    return times ? arr.concat(this.multiplyArray(arr, times - 1)) : [];
  }
}

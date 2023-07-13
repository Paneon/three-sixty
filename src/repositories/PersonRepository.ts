import { GoogleDriveService } from '../services/GoogleDriveService';
import { TeamRepository } from './TeamRepository';
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;

export class PersonRepository {
  static removePerson(name, teamName): ViewModel[] {
    const folder = GoogleDriveService.getOrCreateWorkingFolder();
    const teamSheet =
      TeamRepository.getOrCreateTeamSpreadsheet(folder).getSheetByName(
        teamName,
      );
    const rowIndex = PersonRepository.getPersonsIndex(teamSheet, name);
    const { 0: docIds } = teamSheet.getRange(rowIndex, 4, 1, 4).getValues();
    docIds.forEach((id) => folder.removeFile(DriveApp.getFileById(id)));
    teamSheet.deleteRow(rowIndex);
    return TeamRepository.getTeams();
  }

  static getPersonsIndex(sheet: Sheet, name: string) {
    return (
      sheet
        .getDataRange()
        .getValues()
        .map((row) => row.slice(0, 2).join('').toLowerCase())
        .indexOf(`${name}`.toLowerCase()) + 1
    );
  }
}

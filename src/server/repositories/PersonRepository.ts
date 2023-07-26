import { GoogleDriveService } from '../services/GoogleDriveService';
import { TeamRepository } from './TeamRepository';
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;
import { PersonFactory } from '../factories/PersonFactory';
import { Person } from '../models/Person';

export class PersonRepository {
  static removePerson({
    firstName,
    lastName,
    teamName,
  }: Record<string, string>) {
    const folder = GoogleDriveService.getOrCreateWorkingFolder();
    const teamSheet =
      TeamRepository.getOrCreateTeamSpreadsheet(folder).getSheetByName(
        teamName,
      );
    const rowIndex = PersonRepository.getPersonsIndex(
      teamSheet,
      firstName,
      lastName,
    );
    const { 0: docIds } = teamSheet.getRange(rowIndex, 4, 1, 4).getValues();
    docIds.forEach((id: string) => folder.removeFile(DriveApp.getFileById(id)));
    teamSheet.deleteRow(rowIndex);
  }

  static getPerson(
    teamName: string,
    firstName: string,
    lastName: string,
  ): Person {
    const teamRepository = new TeamRepository();
    const sheet = teamRepository.getTeamSheet(teamName);

    const index = PersonRepository.getPersonsIndex(sheet, firstName, lastName);
    // TODO Remove typecasts
    const data = sheet.getDataRange().getValues()[index - 1] as string[];

    return PersonFactory.createFromRow(data);
  }

  static getPersonsIndex(sheet: Sheet, firstName: string, lastName: string) {
    return (
      sheet
        .getDataRange()
        .getValues()
        .map((row) => row.slice(0, 2).join('').toLowerCase())
        .indexOf(`${firstName}${lastName}`.toLowerCase()) + 1
    );
  }
}

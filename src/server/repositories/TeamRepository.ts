import Folder = GoogleAppsScript.Drive.Folder;
import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import { GoogleDriveService } from '../services/GoogleDriveService';
import { ViewModelFactory } from '../factories/ViewModelFactory';
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;
import { ViewModel } from '../../types/ViewModel';
import { DEFAULT_SHEET } from '../config';

export class TeamRepository {
  static TEAM_SHEET_NAME = 'teams';

  private spreadsheet: Spreadsheet | null = null;
  private teamSheets: Record<string, Sheet>[] = [];

  private readonly folder: GoogleAppsScript.Drive.Folder;

  constructor() {
    this.folder = GoogleDriveService.getOrCreateWorkingFolder();
  }

  getSpreadsheet() {
    if (this.spreadsheet) {
      return this.spreadsheet;
    }

    const files = this.folder.getFilesByName(TeamRepository.TEAM_SHEET_NAME);
    if (files.hasNext()) {
      this.spreadsheet = SpreadsheetApp.open(files.next());

      return this.spreadsheet;
    }

    return this.createSpreadsheet();
  }

  getTeamSheet(teamName: string) {
    return this.getSpreadsheet().getSheetByName(teamName);
  }

  createSpreadsheet() {
    const spreadsheet = SpreadsheetApp.create(TeamRepository.TEAM_SHEET_NAME);

    return GoogleDriveService.addFileToWorkingFolder(this.folder, spreadsheet);
  }

  /** @deprecated */
  static getOrCreateTeamSpreadsheet(folder: Folder): Spreadsheet {
    const files = folder.getFilesByName(TeamRepository.TEAM_SHEET_NAME);
    if (files.hasNext()) {
      return SpreadsheetApp.open(files.next());
    }
    const ss = SpreadsheetApp.create(TeamRepository.TEAM_SHEET_NAME);
    return GoogleDriveService.addFileToWorkingFolder(folder, ss);
  }

  static addTeam(teamName: string) {
    const sanitisedName = teamName.replace(' ', '-');
    const teamSpreadSheet = TeamRepository.getOrCreateTeamSpreadsheet(
      GoogleDriveService.getOrCreateWorkingFolder(),
    );
    teamSpreadSheet.insertSheet(sanitisedName);
  }

  static removeTeam(teamName: string) {
    const teamSpreadSheet = TeamRepository.getOrCreateTeamSpreadsheet(
      GoogleDriveService.getOrCreateWorkingFolder(),
    );
    teamSpreadSheet.deleteSheet(teamSpreadSheet.getSheetByName(teamName));
  }

  static getTeams(): ViewModel[] {
    return TeamRepository.getOrCreateTeamSpreadsheet(
      GoogleDriveService.getOrCreateWorkingFolder(),
    )
      .getSheets()
      .filter((sheet) => sheet.getName() !== DEFAULT_SHEET)
      .map((sheet) => ViewModelFactory.createFromSheet(sheet));
  }
}

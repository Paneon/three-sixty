import { Constants } from '../../namespaces/Constants';
import Folder = GoogleAppsScript.Drive.Folder;
import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import { GoogleDriveService } from '../services/GoogleDriveService';
import { ViewModelFactory } from '../factories/ViewModelFactory';

export class TeamRepository {
  static getOrCreateTeamSpreadsheet(folder: Folder): Spreadsheet {
    const files = folder.getFilesByName(Constants.TEAM_SHEET);
    if (files.hasNext()) {
      return SpreadsheetApp.open(files.next());
    }
    const ss = SpreadsheetApp.create(Constants.TEAM_SHEET);
    return GoogleDriveService.addFileToWorkingFolder(folder, ss);
  }

  static getTeams(): ViewModel[] {
    return TeamRepository.getOrCreateTeamSpreadsheet(
      GoogleDriveService.getOrCreateWorkingFolder(),
    )
      .getSheets()
      .filter((sheet) => sheet.getName() !== Constants.DEFAULT_SHEET)
      .map((sheet) => ViewModelFactory.createFromSheet(sheet));
  }
}

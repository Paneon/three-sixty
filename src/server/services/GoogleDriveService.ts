import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import Form = GoogleAppsScript.Forms.Form;
import { Constants } from '../../namespaces/Constants';
import Folder = GoogleAppsScript.Drive.Folder;

export class GoogleDriveService {
  static addFileToWorkingFolder<T extends Spreadsheet | Form>(
    folder,
    file: T,
  ): T {
    const temp = DriveApp.getFileById(file.getId());
    folder.addFile(temp);
    DriveApp.getRootFolder().removeFile(temp);

    return file;
  }

  static getOrCreateWorkingFolder(): Folder {
    const folders = DriveApp.getFoldersByName(Constants.FOLDER);
    return folders.hasNext()
      ? folders.next()
      : DriveApp.createFolder(Constants.FOLDER);
  }
}

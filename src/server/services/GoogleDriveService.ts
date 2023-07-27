import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import Form = GoogleAppsScript.Forms.Form;
import Folder = GoogleAppsScript.Drive.Folder;
import { FOLDER } from '../../shared/config';

export class GoogleDriveService {
  static addFileToWorkingFolder<T extends Spreadsheet | Form>(
    folder: Folder,
    file: T,
  ): T {
    const temp = DriveApp.getFileById(file.getId());
    folder.addFile(temp);
    DriveApp.getRootFolder().removeFile(temp);

    return file;
  }

  static getOrCreateWorkingFolder(): Folder {
    const folders = DriveApp.getFoldersByName(FOLDER);
    return folders.hasNext() ? folders.next() : DriveApp.createFolder(FOLDER);
  }
}

import { GoogleDriveService } from './GoogleDriveService';
import { FormService } from './FormService';
import { TeamRepository } from '../repositories/TeamRepository';
import { RowFactory } from '../factories/RowFactory';

export class PersonService {
  constructor(
    private fileService = new GoogleDriveService(),
    private formService = new FormService(),
  ) {}
  addPerson(person: Person, teamName: string) {
    // Lock
    const lock = LockService.getScriptLock();
    lock.tryLock(15000);
    const name = person.name;
    const folder = GoogleDriveService.getOrCreateWorkingFolder();

    const forms = [
      this.formService.createSelfReflectionForm(),
      this.formService.createFeedbackForm(name),
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
      .getSheetByName(teamName)
      .appendRow(
        RowFactory.createPersonOfTeamRow(person, pfid, psid, tfid, tsid),
      );

    // Release Lock
    Utilities.sleep(15000);
    lock.releaseLock();
  }
}

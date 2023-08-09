import { GoogleDriveService } from './GoogleDriveService';
import { FormService } from './FormService';
import { TeamRepository } from '../repositories/TeamRepository';
import { RowFactory } from '../factories/RowFactory';
import { Person } from '../models/Person';

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

    const teamForm = this.formService.createFeedbackForm(name, teamName);
    const personalForm = this.formService.createSelfReflectionForm(name, teamName);

    const personalSpreadsheet = SpreadsheetApp.create(`${name}'s Self-Reflection Results`);
    const teamSpreadsheet = SpreadsheetApp.create(`${name}'s Team Feedback Results`);

    const spreadsheets = [personalSpreadsheet, teamSpreadsheet];

    const pfid = personalForm.getId();
    const tfid = teamForm.getId();
    const psid = personalSpreadsheet.getId();
    const tsid = teamSpreadsheet.getId();

    personalForm.setDestination(FormApp.DestinationType.SPREADSHEET, psid);
    teamForm.setDestination(FormApp.DestinationType.SPREADSHEET, tsid);

    [teamForm, personalForm, teamSpreadsheet, personalSpreadsheet].forEach((file) => GoogleDriveService.addFileToWorkingFolder(folder, file));

    TeamRepository.getOrCreateTeamSpreadsheet(folder)
      .getSheetByName(teamName)
      .appendRow(RowFactory.createPersonOfTeamRow(person, pfid, psid, tfid, tsid));

    // Release Lock
    Utilities.sleep(15000);
    lock.releaseLock();
  }
}

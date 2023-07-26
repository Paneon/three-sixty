import { Person } from '../models/Person';

export enum PersonRowColum {
  FIRST_NAME = 0,
  LAST_NAME = 1,
  E_MAIL = 2,
  PERSONAL_FORM = 3,
  TEAM_FORM = 4,
  PERSONAL_SHEET = 5,
  TEAM_SHEET = 6,
  ROLE = 7,
}

export class RowFactory {
  static createPersonOfTeamRow(
    person: Person,
    personalFormId,
    personalSpreadsheetId,
    teamFormId,
    teamSpreadsheetId,
  ): string[] {
    return [
      person.firstName,
      person.lastName,
      person.email,
      personalFormId,
      teamFormId,
      personalSpreadsheetId,
      teamSpreadsheetId,
      person.role,
    ] as string[];
  }
}

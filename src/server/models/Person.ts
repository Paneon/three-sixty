import { PersonRow, RowFactory } from '../factories/RowFactory';

export class Person {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public role: string,
    public personalFormId: string | null = null,
    public teamFormId: string | null = null,
    public personalSpreadsheetId: string | null = null,
    public teamSpreadsheetId: string | null = null,
  ) {}

  get name() {
    return this.firstName + ' ' + this.lastName;
  }

  public toRow(): PersonRow {
    return RowFactory.createTeamMemberRowFromPerson(this);
  }
}

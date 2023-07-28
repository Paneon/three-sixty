import { PersonRowColum } from './RowFactory';
import { Person } from '../models/Person';

export class PersonFactory {
  static createFromRow(row: string[]): Person {
    // [firstName, lastName, email, pfid, tfid, psid, tsid, role, peers]
    return new Person(
      row[PersonRowColum.FIRST_NAME],
      row[PersonRowColum.LAST_NAME],
      row[PersonRowColum.E_MAIL],
      row[PersonRowColum.ROLE],
      row[PersonRowColum.PERSONAL_FORM],
      row[PersonRowColum.TEAM_FORM],
      row[PersonRowColum.PERSONAL_SHEET],
      row[PersonRowColum.TEAM_SHEET],
    );
  }

  static create(
    firstName: string,
    lastName: string,
    email: string,
    role: string,
  ) {
    return new Person(firstName, lastName, email, role);
  }
}

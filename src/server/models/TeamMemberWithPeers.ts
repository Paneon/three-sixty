import { RowFactory } from '../factories/RowFactory';
import { Person } from './Person';

export class TeamMemberWithPeers extends Person {
  constructor(
    person: Person,
    public peers: Person[],
  ) {
    super(
      person.firstName,
      person.lastName,
      person.email,
      person.role,
      person.personalFormId,
      person.teamFormId,
      person.personalSpreadsheetId,
      person.teamSpreadsheetId,
    );
  }
}

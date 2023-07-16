export class PersonFactory {
  static createFromRow(row: string[]): Person {
    return {
      firstName: row[0],
      lastName: row[1],
      role: row[7],
      email: row[2],
    };
  }
}

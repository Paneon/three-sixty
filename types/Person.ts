class Person implements Person {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public role: string,
    public personalFormId: string = null,
    public teamFormId: string = null,
    public personalSpreadsheetId: string = null,
    public teamSpreadsheetId: string = null,
  ) {}

  get name() {
    return this.firstName + ' ' + this.lastName;
  }
}

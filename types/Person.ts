class Person implements Person {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public role: string,
  ) {}

  get name() {
    return this.firstName + ' ' + this.lastName;
  }
}

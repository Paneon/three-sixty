export interface IPerson {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  personalFormId: string | null;
  teamFormId: string | null;
  personalSpreadsheetId: string | null;
  teamSpreadsheetId: string | null;
}

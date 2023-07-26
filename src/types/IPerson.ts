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

export function isPerson(obj: unknown): obj is IPerson {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'firstName' in obj &&
    'lastName' in obj
  );
}

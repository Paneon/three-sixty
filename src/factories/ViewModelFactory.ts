import Sheet = GoogleAppsScript.Spreadsheet.Sheet;

export class ViewModelFactory {
  static createFromSheet(sheet: Sheet): ViewModel {
    return {
      teamName: sheet.getName(),
      members: sheet
        .getDataRange()
        .getValues()
        .map((row: string[]) => ({
          name: row[0],
          role: row[7], // TODO clarify if 7 is correct
          email: row[1],
        })),
    };
  }
}

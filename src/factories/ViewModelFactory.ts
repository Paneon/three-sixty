import Sheet = GoogleAppsScript.Spreadsheet.Sheet;
import { PersonFactory } from './PersonFactory';

export class ViewModelFactory {
  static createFromSheet(sheet: Sheet): ViewModel {
    return {
      teamName: sheet.getName(),
      members: sheet
        .getDataRange()
        .getValues()
        .map((row: string[]) => {
          return PersonFactory.createFromRow(row);
        })
        .filter(({ firstName }) => firstName.trim() !== ''), // Filters null out,,
    };
  }
}

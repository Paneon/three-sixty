import Sheet = GoogleAppsScript.Spreadsheet.Sheet;
import { PersonFactory } from './PersonFactory';
import { ViewModel } from '../../types/ViewModel';

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

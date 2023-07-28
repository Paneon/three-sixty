import { IQuestion } from '../../types/IQuestion';
import { TeamValue } from '../../types/TeamValue';
import { Connotation } from '../../types/Connotation';

export type RawQuestionRow = [string, string, number];
export type QuestionDataRow = [string, TeamValue, Connotation];

export class QuestionFactory {
  static createFromRawDataRow(row: RawQuestionRow): IQuestion {
    return {
      title: row[0].toString(),
      value: TeamValue[row[1].toString()] as TeamValue,
      connotation: Connotation[row[2].toString()] as Connotation,
    };
  }

  static createFromQuestionDataRow(row: QuestionDataRow): IQuestion {
    return {
      title: row[0].toString(),
      value: row[1],
      connotation: row[2],
    };
  }

  static createFromRawDataRows(rows: RawQuestionRow[]) {
    return rows.map((row) => QuestionFactory.createFromRawDataRow(row));
  }

  static createFromQuestionDataRows(rows: QuestionDataRow[]) {
    return rows.map((row) => QuestionFactory.createFromQuestionDataRow(row));
  }
}

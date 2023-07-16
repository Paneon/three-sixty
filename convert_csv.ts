/* eslint-disable no-console */
import * as path from 'path';
import * as fs from 'fs';
import { parse } from 'csv-parse';
import { Question } from './types/Question';

const csvFilePath = path.resolve(__dirname, './questions.csv');

const headers = ['title', 'value', 'connotation'];

const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

let output = `/**
 * Generated file by convert_csv script.
 */

export const Questions = [`;

parse(
  fileContent,
  {
    delimiter: ',',
    columns: headers,
    fromLine: 2,
  },
  (error, result: Question[]) => {
    if (error) {
      console.error(error);
      throw error;
    }

    result.map((q) => {
      output += `
  ['${q.title.replace(/'/g, "\\'")}', '${q.value}', ${q.connotation}],`;
    });

    output += `
];`;

    console.log(output);
  },
);

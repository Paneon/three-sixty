#!/usr/bin/env ts-node
/* eslint-disable no-console,@typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');
const { parse } = require('csv-parse');
const { Question } = require('./types/Question');

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
  (error, result) => {
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

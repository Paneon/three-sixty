import { Constants } from './Constants';
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;

export namespace Results {
  const VALUE_MAPPING: Record<string, number> = {
    'Are smashing it': 3,
    'Are spot on': 2,
    'Have room to do more': 1,
  };

  const sheetData = (sheet: Sheet): string[][] =>
    sheet.getRange(2, 1, sheet.getLastRow(), sheet.getLastColumn()).getValues();

  const coreValues = (data: string[][]): string[][] =>
    data.map((datum) => datum.slice(3, -2));

  const valueToNumeric = (data: string[][]): number[][] =>
    data.map((datum) => datum.map((item) => VALUE_MAPPING[item]));

  const dataToChartValues = (
    data: number[],
    headers: string[],
  ): ChartValues[] => data.map((n, i) => ({ value: headers[i], result: n }));

  const sustains = (data: string[][]): string[] =>
    data.reduce((res, datum) => [...res, ...datum.slice(-2, -1)], []);

  const improvements = (data: string[][]): string[] =>
    data.reduce((res, datum) => [...res, ...datum.slice(-1)], []);

  const numericMatrixToAverage = (data: number[][]): number[] => {
    const sum = data
      .slice(1)
      .reduce((res, datum) => datum.map((n, i) => n + res[i]), data[0]);
    return sum.map((n) => n / data.length);
  };

  const formatData = (
    groupedPersonalData: string[][][],
    groupedTeamData: string[][][],
    headers: string[],
    name: string,
  ): ResultPayload[] => {
    const zippedData = groupedPersonalData.map((e, i) => [
      e,
      groupedTeamData[i],
    ]);

    return zippedData.map(([personalResults, teamResults]) => {
      const personCore = coreValues(personalResults);
      const personNumeric = valueToNumeric(personCore);
      const personChartValues = dataToChartValues(personNumeric[0], headers);
      const personSustains = sustains(personalResults);
      const personImprovements = improvements(personalResults);
      const teamCore = coreValues(teamResults);
      const teamNumeric = valueToNumeric(teamCore);
      const teamAverage = numericMatrixToAverage(teamNumeric);
      const teamChartValues = dataToChartValues(teamAverage, headers);
      const teamSustains = sustains(teamResults);
      const teamImprovements = improvements(teamResults);

      return {
        individual: {
          values: personChartValues,
        },
        team: {
          values: teamChartValues,
        },
        name: name,
        sustain: [...personSustains, ...teamSustains],
        improve: [...personImprovements, ...teamImprovements],
      };
    });
  };

  const getHeaders = (sheets: Sheet[]): string[] => {
    const { 0: firstSheet } = sheets;
    const { 0: sheetHeaders } = firstSheet
      .getRange(1, 1, 1, firstSheet.getMaxColumns())
      .getValues();

    return sheetHeaders
      .filter(Boolean)
      .slice(3, -2)
      .map((header) => header.substring(0, header.indexOf('[')));
  };

  export function createPayload(
    personalSpreadsheetId: string,
    teamSpreadsheetId: string,
    name: string,
  ): ResultPayload[] {
    const personalSpreadsheet = SpreadsheetApp.openById(personalSpreadsheetId);
    const teamSpreadsheet = SpreadsheetApp.openById(teamSpreadsheetId);
    const isNotDefaultSheet = (sheet) =>
      sheet.getName() !== Constants.DEFAULT_SHEET;
    const personalSheets = personalSpreadsheet
      .getSheets()
      .filter(isNotDefaultSheet);
    const teamSheets = teamSpreadsheet.getSheets().filter(isNotDefaultSheet);
    const headers = getHeaders(personalSheets);
    const getRowsPerRound = (sheet) => sheet.getLastRow() - 1;
    const rowsPerRoundPersonal = personalSheets.map(getRowsPerRound).reverse();
    const rowsPerRoundTeam = teamSheets.map(getRowsPerRound).reverse();
    const personalData = sheetData(
      personalSpreadsheet.getSheetByName(Constants.DEFAULT_RESULTS_SHEET),
    );
    const teamData = sheetData(
      teamSpreadsheet.getSheetByName(Constants.DEFAULT_RESULTS_SHEET),
    );
    const groupRounds = (data) => (result, n, i, original) => {
      if (i === original.length - 1) {
        return result;
      }
      return [...result, data.slice(n, original[i + 1])];
    };
    const groupedPersonalData = [0, ...rowsPerRoundPersonal].reduce(
      groupRounds(personalData),
      [],
    );
    const groupedTeamData = [0, ...rowsPerRoundTeam].reduce(
      groupRounds(teamData),
      [],
    );

    return formatData(groupedPersonalData, groupedTeamData, headers, name);
  }
}

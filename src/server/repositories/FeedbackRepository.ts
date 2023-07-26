/* eslint-disable @typescript-eslint/no-unsafe-return */
import { GoogleDriveService } from '../services/GoogleDriveService';
import { TeamRepository } from './TeamRepository';
import { Results } from '../../../namespaces/Results';
import { ErrorPayloadFactory } from '../factories/ErrorPayloadFactory';
import { PersonRepository } from './PersonRepository';

export class FeedbackRepository {
  /**
   * TODO Add parameter for teamName to simplify process
   * @param name
   */
  static getFeedbackData(name: string) {
    try {
      const { 0: firstName, 1: lastName } = name.split(' ');
      const folder = GoogleDriveService.getOrCreateWorkingFolder();
      const teamRepository = new TeamRepository();
      const { 0: teamSheet } = teamRepository
        .getSpreadsheet()
        .getSheets()
        .filter(
          (sheet) =>
            PersonRepository.getPersonsIndex(sheet, firstName, lastName) > 0,
        );
      const { 5: psid, 6: tsid } = teamSheet.getDataRange().getValues()[
        PersonRepository.getPersonsIndex(teamSheet, firstName, lastName) - 1
      ];
      // TODO Remove typecasts
      return Results.createPayload(psid as string, tsid as string, name);
    } catch (error) {
      console.error(error);
      return ErrorPayloadFactory.create(
        `Could not find any data for ${name}. Ensure you have entered the name in the format: Firstname Lastname`,
      );
    }
  }
}

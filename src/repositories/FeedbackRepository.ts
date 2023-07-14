import { GoogleDriveService } from '../services/GoogleDriveService';
import { TeamRepository } from './TeamRepository';
import { Results } from '../../namespaces/Results';
import { ErrorPayloadFactory } from '../factories/ErrorPayloadFactory';
import { PersonRepository } from './PersonRepository';

export class FeedbackRepository {
  static getFeedbackData(name: string) {
    try {
      const { 0: firstName, 1: lastName } = name.split(' ');
      const folder = GoogleDriveService.getOrCreateWorkingFolder();
      const { 0: teamSheet } = TeamRepository.getOrCreateTeamSpreadsheet(folder)
        .getSheets()
        .filter(
          (sheet) =>
            PersonRepository.getPersonsIndex(sheet, firstName, lastName) > 0,
        );
      const { 5: psid, 6: tsid } = teamSheet.getDataRange().getValues()[
        PersonRepository.getPersonsIndex(teamSheet, firstName, lastName) - 1
      ];
      return Results.createPayload(psid, tsid, name);
    } catch (error) {
      console.error(error);
      return ErrorPayloadFactory.create(
        `Could not find any data for ${name}. Ensure you have entered the name in the format: Firstname Lastname`,
      );
    }
  }
}

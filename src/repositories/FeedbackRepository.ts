import { GoogleDriveService } from '../services/GoogleDriveService';
import { TeamRepository } from './TeamRepository';
import { Results } from '../../namespaces/Results';

export class FeedbackRepository {
  static getFeedbackData(name: string) {
    try {
      const folder = GoogleDriveService.getOrCreateWorkingFolder();
      const { 0: teamSheet } = TeamRepository.getOrCreateTeamSpreadsheet(folder)
        .getSheets()
        .filter((sheet) => getPersonsIndex(sheet, name) > 0);
      const { 5: psid, 6: tsid } = teamSheet.getDataRange().getValues()[
        getPersonsIndex(teamSheet, name) - 1
      ];
      return Results.createPayload(psid, tsid, name);
    } catch (error) {
      return errorPayload(
        `Could not find any data for ${name}. Ensure you have entered the name in the format: Firstname Lastname`,
      );
    }
  }
}

import { GASClient } from 'gas-client';
import * as publicServerFunctions from '../../server/index';

const { serverFunctions } = new GASClient<typeof publicServerFunctions>({
  // this is necessary for local development but will be ignored in production
  allowedDevelopmentDomains: (origin) =>
    origin.endsWith('https://script.google.com'),
});

export { serverFunctions };

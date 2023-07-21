import { Connotation } from './Connotation';
import { TeamValue } from './TeamValue';

export interface Question {
  title: string;
  value: TeamValue;
  connotation: Connotation;
}

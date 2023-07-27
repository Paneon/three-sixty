import { Connotation } from './Connotation';
import { TeamValue } from './TeamValue';

export interface IQuestion {
  title: string;
  value: TeamValue;
  connotation: Connotation;
}

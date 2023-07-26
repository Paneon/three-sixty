import { IPerson, isPerson } from './IPerson';

export interface ViewModel {
  teamName: string;
  members: IPerson[];
}

export function isViewModel(obj: unknown): obj is ViewModel {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'teamName' in obj &&
    typeof obj.teamName === 'string' &&
    'members' in obj &&
    Array.isArray(obj.members) &&
    obj.members.every((member) => isPerson(member))
  );
}

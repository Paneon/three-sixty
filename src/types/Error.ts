export interface IErrorMessage {
  error: string;
}

export function isErrorMessage(obj: unknown): obj is IErrorMessage {
  return typeof obj === 'object' && obj !== null && 'error' in obj;
}

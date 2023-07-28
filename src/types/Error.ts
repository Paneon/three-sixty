export interface IErrorMessage {
  error: string;
}

interface IErrorResponse {
  name: string;
  message: string;
  stack: string;
}

export function isErrorMessage(obj: unknown): obj is IErrorMessage {
  return typeof obj === 'object' && obj !== null && 'error' in obj;
}

export function isErrorResponse(obj: unknown): obj is IErrorResponse {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'message' in obj &&
    'stack' in obj
  );
}

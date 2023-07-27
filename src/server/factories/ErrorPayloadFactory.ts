import { IErrorMessage } from '../../types/Error';

export class ErrorPayloadFactory {
  static create(errorMessage: string): IErrorMessage {
    return {
      error: errorMessage,
    };
  }
}

export class ErrorPayloadFactory {
  static create(errorMessage: string): ErrorMessage {
    return {
      error: errorMessage,
    };
  }
}

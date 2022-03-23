export default class CustomError extends Error {
  constructor(code, message) {
    super(message);
    this.statusCode = code;
  }

  errorHandler(statusCode, message) {
    return new CustomError(statusCode, message);
  }
}

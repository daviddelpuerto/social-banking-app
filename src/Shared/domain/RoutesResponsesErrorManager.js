import statusCodes from 'http-status';

export default class RoutesResponsesErrorManager {
  static getResponse({ statusCode, message, validation }) {
    return {
      statusCode,
      error: this.getErrorMessage(statusCode),
      message,
      validation,
    };
  }

  static getErrorMessage(statusCode) {
    return statusCodes[statusCode] || 'Validation failed';
  }
}

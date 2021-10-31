const STATUS_CODES_MESSAGES = {
  400: 'Bad Request',
};

export default class RoutesResponsesErrorManager {
  static getResponse({ statusCode, message, validation }) {
    return {
      statusCode,
      error: STATUS_CODES_MESSAGES[statusCode] || 'Validation failed',
      message,
      validation,
    };
  }
}

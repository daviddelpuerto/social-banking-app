export default class UserNotFound extends Error {
  constructor() {
    super('User id or account number not found');
    this.statusCode = 404;
    this.validation = {
      params: {
        source: 'params',
        keys: [
          'identifier',
        ],
        message: this.message,
      },
    };
  }
}

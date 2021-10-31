export default class InvalidPassword extends Error {
  constructor() {
    super('Invalid password');
    this.statusCode = 400;
    this.validation = {
      body: {
        source: 'body',
        keys: [
          'password',
        ],
        message: this.message,
      },
    };
  }
}

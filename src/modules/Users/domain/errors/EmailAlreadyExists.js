export default class EmailAlreadyExists extends Error {
  constructor(email) {
    super(`Email ${email} already exists`);
    this.statusCode = 400;
    this.validation = {
      body: {
        source: 'body',
        keys: [
          'email',
        ],
        message: this.message,
      },
    };
  }
}

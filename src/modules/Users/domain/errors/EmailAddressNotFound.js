export default class EmailAddressNotFound extends Error {
  constructor(email) {
    super(`Email address ${email} not found`);
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

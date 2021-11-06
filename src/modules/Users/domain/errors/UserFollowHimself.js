export default class EmailAddressNotFound extends Error {
  constructor() {
    super('You can\'t follow yourself');
    this.statusCode = 400;
  }
}

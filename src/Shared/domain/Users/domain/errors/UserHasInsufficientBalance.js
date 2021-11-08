export default class UserHasInsufficientBalance extends Error {
  constructor() {
    super('You don\'t have enough balance');
    this.statusCode = 400;
  }
}

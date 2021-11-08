export default class UserSendingMoneyToHimself extends Error {
  constructor() {
    super('You can\'t transfer money to yourself');
    this.statusCode = 400;
  }
}

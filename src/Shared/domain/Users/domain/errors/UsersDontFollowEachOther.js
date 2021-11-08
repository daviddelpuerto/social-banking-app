export default class UsersDontFollowEachOther extends Error {
  constructor() {
    super('You need to follow each other');
    this.statusCode = 400;
  }
}

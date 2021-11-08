export default class AlreadyFollowingUser extends Error {
  constructor() {
    super('You are already following the user');
    this.statusCode = 400;
  }
}

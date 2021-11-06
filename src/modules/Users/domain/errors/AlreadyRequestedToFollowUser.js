export default class AlreadyRequestedToFollowUser extends Error {
  constructor() {
    super('Already requested to follow user');
    this.statusCode = 400;
  }
}

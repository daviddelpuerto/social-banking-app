import MongoRepository from '../../../../Shared/infrastructure/persistence/mongo/MongoRepository';

export default class MongoUsersRepository extends MongoRepository {
  emailExists(email) {
    return this.Model.exists({ email });
  }

  createUser(user) {
    const record = new this.Model(user).save();

    return record;
  }

  findOneByEmail(email) {
    return this.Model.findOne({ email });
  }

  async findUserPasswordByEmail(email) {
    const user = await this.Model.findOne({ email }).select('password');
    return user.password;
  }

  findOneByIdOrAccountNumber(identifier) {
    const selectFields = ['email', 'connectionRequests'];
    if (this.isValidObjectId(identifier)) {
      return this.Model.findOne({ _id: identifier }).select(selectFields);
    }
    return this.Model.findOne({ accountNumber: identifier }).select(selectFields);
  }

  followAlreadyRequested({ requesterUser, userToFollow }) {
    return this.Model.findOne({
      $or: [
        { _id: userToFollow, connectionRequests: requesterUser },
        { _id: userToFollow, followers: requesterUser },
      ],
    });
  }
}
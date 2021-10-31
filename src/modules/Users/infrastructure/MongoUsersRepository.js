export default class MongoUsersRepository {
  constructor(Model) {
    this.Model = Model;
  }

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
}

import mongoose from 'mongoose';

export default class MongoRepository {
  constructor(Model) {
    this.Model = Model;
    this.mongoose = mongoose;
  }

  isValidObjectId(id) {
    if (this.mongoose.Types.ObjectId.isValid(id)) {
      if ((String)(new this.mongoose.Types.ObjectId(id)) === id) {
        return true;
      }

      return false;
    }
    return false;
  }
}

import MongoRepository from '../../../../Shared/infrastructure/persistence/mongo/MongoRepository';

export default class MongoTransactionsRepository extends MongoRepository {
  createTransaction(transaction) {
    const record = new this.Model(transaction).save();

    return record;
  }
}

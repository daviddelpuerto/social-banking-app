import TransactionDateValueObject from '../../../Shared/domain/value-object/TransactionDateValueObject';

export default class Transaction {
  constructor({
    senderId, senderAccount, receiverId, receiverAccount, balance, timestamp,
  }) {
    this.sender = senderId;
    this.senderAccount = senderAccount;
    this.receiver = receiverId;
    this.receiverAccount = receiverAccount;
    this.balance = balance;
    this.state = 'pending';
    if (timestamp) {
      this.timestamp = new TransactionDateValueObject(timestamp).value;
    }
  }

  processed() {
    this.state = 'processed';
  }

  cancel() {
    this.state = 'canceled';
  }

  setCreationDate(timestamp) {
    this.timestamp = new TransactionDateValueObject(timestamp).value;
  }
}

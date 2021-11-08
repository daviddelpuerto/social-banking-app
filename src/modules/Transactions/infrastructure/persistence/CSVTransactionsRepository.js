import fs from 'fs-extra';

export default class CSVTransactionsRepository {
  constructor() {
    this.CSV_FILE_PATH = './var/transactions/transactions.csv';
  }

  async createTransaction(transaction) {
    const {
      senderAccount, receiverAccount, balance, timestamp,
    } = transaction;
    await fs.appendFile(this.CSV_FILE_PATH, `${senderAccount},${receiverAccount},${balance},${timestamp}\n`);
  }
}

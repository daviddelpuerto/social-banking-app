import { Container } from 'typedi';
import Transaction from '../domain/Transaction';
import UserNotFound from '../../../Shared/domain/Users/domain/errors/UserNotFound';
import UserSendingMoneyToHimself from '../../../Shared/domain/Users/domain/errors/UserSendingMoneyToHimself';
import UsersDontFollowEachOther from '../../../Shared/domain/Users/domain/errors/UsersDontFollowEachOther';
import UserHasInsufficientBalance from '../../../Shared/domain/Users/domain/errors/UserHasInsufficientBalance';

const { mongoUsersRepository, mongoTransactionsRepository, csvTransactionsRepository } = Container.get('repositories');

export default async function createTransaction({ senderEmail, receiverAccount, balance }) {
  const userReceivingTheTransaction = await mongoUsersRepository.findOneByIdOrAccountNumber(receiverAccount);

  if (!userReceivingTheTransaction) {
    throw new UserNotFound();
  }

  const userCreatingTheTransaction = await mongoUsersRepository.findOneByEmail(senderEmail);

  const { _id: userIdReceivingTheTransaction } = userReceivingTheTransaction;
  const { _id: userIdCreatingTheTransaction } = userCreatingTheTransaction;

  if (userIdReceivingTheTransaction.toString() === userIdCreatingTheTransaction.toString()) {
    throw new UserSendingMoneyToHimself();
  }

  const usersFollowEachOther = userReceivingTheTransaction.followers.includes(userIdCreatingTheTransaction) && userCreatingTheTransaction.followers.includes(userIdReceivingTheTransaction);

  if (!usersFollowEachOther) {
    throw new UsersDontFollowEachOther();
  }

  if (userCreatingTheTransaction.balance < balance) {
    throw new UserHasInsufficientBalance();
  }

  // Create the transaction
  const transaction = new Transaction({
    senderId: userIdCreatingTheTransaction,
    senderAccount: userCreatingTheTransaction.accountNumber,
    receiverId: userIdReceivingTheTransaction,
    receiverAccount: userReceivingTheTransaction.accountNumber,
    balance,
  });

  const balanceWithoutFees = balance < 1000 ? (balance * 0.995) : (balance * 0.99);
  userReceivingTheTransaction.balance += balanceWithoutFees;
  userCreatingTheTransaction.balance -= balance;

  transaction.processed();

  const transactionRecord = await mongoTransactionsRepository.createTransaction(transaction);

  transaction.setCreationDate(transactionRecord.createdAt);

  await csvTransactionsRepository.createTransaction(transaction);

  userCreatingTheTransaction.transactions.push(transactionRecord);

  await Promise.all([
    userReceivingTheTransaction.save(),
    userCreatingTheTransaction.save(),
  ]);
}

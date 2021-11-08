import { Router } from 'express';
import transactionsControllers from '../../controllers/transactions';
import * as transactionsRoutesValidations from '../../../../modules/Transactions/domain/RoutesValidations';
import validateToken from '../../middlewares/validateToken';

const transactions = Router();

transactions.post('/',
  validateToken,
  transactionsRoutesValidations.validateCreateTransaction,
  transactionsControllers.createTransactionController);

export default transactions;

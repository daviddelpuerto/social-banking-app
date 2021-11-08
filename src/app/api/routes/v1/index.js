import { Router } from 'express';
import usersRoutes from './users';
import transactionsRoutes from './transactions';

const v1 = Router();

v1.get('/', (req, res) => {
  try {
    return res.status(200).send('Social Banking App');
  } catch (error) {
    return res.sendStatus(500);
  }
});

v1.use('/users', usersRoutes);

v1.use('/transactions', transactionsRoutes);

export default v1;

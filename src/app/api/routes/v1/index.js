import { Router } from 'express';
import usersRoutes from './users';

const v1 = Router();

v1.get('/', (req, res) => {
  try {
    return res.status(200).send('Social Banking App');
  } catch (error) {
    return res.sendStatus(500);
  }
});

v1.use('/users', usersRoutes);

export default v1;

import { Router } from 'express';

const v1 = Router();

v1.get('/', (req, res) => {
  try {
    return res.status(200).send('Social Banking App');
  } catch (error) {
    return res.sendStatus(500);
  }
});

export default v1;

import { Router } from 'express';
import usersControllers from '../../controllers/users';
import * as usersRoutesValidations from '../../../../modules/Users/domain/RoutesValidations';

const users = Router();

users.post('/',
  usersRoutesValidations.validateCreateUser,
  usersControllers.createUserController);

users.post('/login',
  usersRoutesValidations.validateLoginUser,
  usersControllers.loginUserController);

export default users;

import { Router } from 'express';
import usersControllers from '../../controllers/users';
import * as usersRoutesValidations from '../../../../modules/Users/domain/RoutesValidations';

const users = Router();

users.post('/',
  usersRoutesValidations.validateCreateUser,
  usersControllers.createUserController);

export default users;

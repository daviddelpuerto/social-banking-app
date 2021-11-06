import { Router } from 'express';
import usersControllers from '../../controllers/users';
import * as usersRoutesValidations from '../../../../modules/Users/domain/RoutesValidations';
import validateToken from '../../middlewares/validateToken';

const users = Router();

users.post('/',
  usersRoutesValidations.validateCreateUser,
  usersControllers.createUserController);

users.post('/login',
  usersRoutesValidations.validateLoginUser,
  usersControllers.loginUserController);

users.post('/:identifier/follow',
  validateToken,
  usersRoutesValidations.followUser,
  usersControllers.followUserController);

export default users;

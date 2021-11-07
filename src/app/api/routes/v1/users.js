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

users.put('/:userId/follow/accept',
  validateToken,
  usersControllers.acceptFollowRequestController);

users.put('/:userId/follow/decline',
  validateToken,
  usersControllers.declineFollowRequestController);

users.delete('/:userId/follow',
  validateToken,
  usersControllers.removeFollowerController);

export default users;

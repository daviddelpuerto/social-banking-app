import createUserController from './users.create';
import followUserController from './users.follow';
import loginUserController from './users.login';
import acceptFollowRequestController from './users.acceptFollowRequest';
import declineFollowRequestController from './users.declineFollowRequest';

export default {
  createUserController,
  followUserController,
  loginUserController,
  acceptFollowRequestController,
  declineFollowRequestController,
};

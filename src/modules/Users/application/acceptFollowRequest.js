import { Container } from 'typedi';
import UserNotFound from '../../../Shared/domain/Users/domain/errors/UserNotFound';
import AlreadyFollowingUser from '../domain/errors/AlreadyFollowingUser';

const { mongoUsersRepository } = Container.get('repositories');

export default async function acceptFollowRequest({ userEmailAcceptingTheRequest, userId }) {
  const user = await mongoUsersRepository.findById(userId);

  if (!user) {
    throw new UserNotFound();
  }

  const userAcceptingTheConnection = await mongoUsersRepository.findOneByEmail(userEmailAcceptingTheRequest, true);

  const userAlreadyFollowing = await mongoUsersRepository.userAlreadyFollowing({
    requesterUser: user,
    userToFollow: userAcceptingTheConnection,
  });

  if (userAlreadyFollowing) {
    throw new AlreadyFollowingUser();
  }

  userAcceptingTheConnection.connectionRequests.pull(userId);
  userAcceptingTheConnection.followers.push(userId);
  user.following.push(userAcceptingTheConnection);

  await Promise.all([
    userAcceptingTheConnection.save(),
    user.save(),
  ]);
}

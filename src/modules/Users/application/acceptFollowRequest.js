import { Container } from 'typedi';
import UserNotFound from '../domain/errors/UserNotFound';
import AlreadyRequestedToFollowUser from '../domain/errors/AlreadyRequestedToFollowUser';

const { mongoUsersRepository } = Container.get('repositories');

export default async function acceptFollowRequest({ userEmailAcceptingTheRequest, userId }) {
  const user = await mongoUsersRepository.findById(userId);

  if (!user) {
    throw new UserNotFound();
  }

  const userAcceptingTheConnection = await mongoUsersRepository.findOneByEmail(userEmailAcceptingTheRequest, true);

  const followAlreadyRequested = await mongoUsersRepository.followAlreadyRequested({
    requesterUser: user,
    userToFollow: userAcceptingTheConnection,
  });

  if (followAlreadyRequested) {
    throw new AlreadyRequestedToFollowUser();
  }

  userAcceptingTheConnection.connectionRequests.pull(userId);
  userAcceptingTheConnection.followers.push(userId);
  user.following.push(userAcceptingTheConnection);

  await Promise.all([
    userAcceptingTheConnection.save(),
    user.save(),
  ]);
}

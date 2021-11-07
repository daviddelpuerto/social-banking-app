import { Container } from 'typedi';
import UserNotFound from '../domain/errors/UserNotFound';

const { mongoUsersRepository } = Container.get('repositories');

export default async function acceptFollowRequest({ userEmailAcceptingTheRequest, userId }) {
  const user = await mongoUsersRepository.findById(userId);

  if (!user) {
    throw new UserNotFound();
  }

  const userAcceptingTheConnection = await mongoUsersRepository.findOneByEmail(userEmailAcceptingTheRequest, true);

  userAcceptingTheConnection.connectionRequests.pull(userId);
  userAcceptingTheConnection.followers.push(userId);
  user.following.push(userAcceptingTheConnection);

  await Promise.all([
    userAcceptingTheConnection.save(),
    user.save(),
  ]);
}

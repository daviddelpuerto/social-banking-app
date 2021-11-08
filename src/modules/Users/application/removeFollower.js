import { Container } from 'typedi';
import UserNotFound from '../../../Shared/domain/Users/domain/errors/UserNotFound';

const { mongoUsersRepository } = Container.get('repositories');

export default async function declineFollowRequest({ userEmailRemovingTheRequest, userId }) {
  const user = await mongoUsersRepository.findById(userId);

  if (!user) {
    throw new UserNotFound();
  }

  const userRemovingTheConnection = await mongoUsersRepository.findOneByEmail(userEmailRemovingTheRequest, true);

  userRemovingTheConnection.followers.pull(userId);
  user.following.pull(userRemovingTheConnection);

  await Promise.all([
    userRemovingTheConnection.save(),
    user.save(),
  ]);
}

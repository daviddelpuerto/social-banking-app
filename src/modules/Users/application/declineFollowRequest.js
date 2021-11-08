import { Container } from 'typedi';
import UserNotFound from '../../../Shared/domain/Users/domain/errors/UserNotFound';

const { mongoUsersRepository } = Container.get('repositories');

export default async function declineFollowRequest({ userEmailDecliningTheRequest, userId }) {
  const user = await mongoUsersRepository.findById(userId);

  if (!user) {
    throw new UserNotFound();
  }

  const userDecliningTheConnection = await mongoUsersRepository.findOneByEmail(userEmailDecliningTheRequest, true);

  userDecliningTheConnection.connectionRequests.pull(userId);

  await userDecliningTheConnection.save();
}

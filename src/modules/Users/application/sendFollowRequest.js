import { Container } from 'typedi';
import UserNotFound from '../../../Shared/domain/Users/domain/errors/UserNotFound';
import UserFollowHimself from '../domain/errors/UserFollowHimself';
import AlreadyRequestedToFollowUser from '../domain/errors/AlreadyRequestedToFollowUser';

const { mongoUsersRepository } = Container.get('repositories');

export default async function loginUser({ requesterUserEmail, identifier }) {
  const userToFollow = await mongoUsersRepository.findOneByIdOrAccountNumber(identifier);

  if (!userToFollow) {
    throw new UserNotFound();
  }

  if (userToFollow.email === requesterUserEmail) {
    throw new UserFollowHimself();
  }

  const requesterUser = await mongoUsersRepository.findOneByEmail(requesterUserEmail);

  const followAlreadyRequested = await mongoUsersRepository.followAlreadyRequested({ requesterUser, userToFollow });

  if (followAlreadyRequested) {
    throw new AlreadyRequestedToFollowUser();
  }

  userToFollow.connectionRequests.push(requesterUser);
  await userToFollow.save();
}

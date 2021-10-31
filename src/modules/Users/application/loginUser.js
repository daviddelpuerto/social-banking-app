import { Container } from 'typedi';
import EmailAddressNotFound from '../domain/errors/EmailAddressNotFound';
import InvalidPassword from '../domain/errors/InvalidPassword';
import BCryptManager from '../../../Shared/infrastructure/BCryptManager';
import JWTManager from '../../../Shared/infrastructure/JWTManager';

const { mongoUsersRepository } = Container.get('repositories');

export default async function loginUser({ email, password }) {
  const user = await mongoUsersRepository.findOneByEmail(email);

  if (!user) {
    throw new EmailAddressNotFound(email);
  }

  const userHashedPassword = await mongoUsersRepository.findUserPasswordByEmail(email);

  const passwordMatches = await BCryptManager.compareHash(password, userHashedPassword);

  if (!passwordMatches) {
    throw new InvalidPassword();
  }

  return JWTManager.createToken(email);
}

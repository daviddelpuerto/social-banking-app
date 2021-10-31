import { Container } from 'typedi';
import User from '../domain/User';
import EmailAlreadyExists from '../domain/errors/EmailAlreadyExists';
import BCryptManager from '../../../Shared/infrastructure/BCryptManager';

const { mongoUsersRepository } = Container.get('repositories');

export default async function createUser({
  firstName, lastName, age, email, password, balance,
}) {
  const emailExists = await mongoUsersRepository.emailExists(email);

  if (emailExists) {
    throw new EmailAlreadyExists(email);
  }

  const hashedPassword = await BCryptManager.createHash(password);

  const user = new User({
    firstName,
    lastName,
    age,
    email,
    balance,
    password: hashedPassword,
  });

  return mongoUsersRepository.createUser(user);
}

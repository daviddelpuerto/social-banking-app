import { Container } from 'typedi';

const { mongoUsersRepository } = Container.get('repositories');

export default async function getUserData(userEmail) {
  return mongoUsersRepository.getUserDataByEmail(userEmail);
}

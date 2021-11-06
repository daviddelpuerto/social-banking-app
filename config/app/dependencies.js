/**
 * @HINT Create and export instances of the dependencies to be loaded by the container here
 */

import Bitnacle from 'bitnacle';
import UsersModel from '../../src/Shared/infrastructure/persistence/mongo/models/UsersModel';
import MongoUsersRepository from '../../src/modules/Users/infrastructure/persistence/MongoUsersRepository';

export default function createDependencies() {
  // Container will load dependencies from this object
  return {
    logger: new Bitnacle(),
    repositories: {
      mongoUsersRepository: new MongoUsersRepository(UsersModel),
    },
  };
}

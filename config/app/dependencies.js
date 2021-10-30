/**
 * @HINT Create and export instances of the dependencies to be loaded by the container here
 */

import Bitnacle from 'bitnacle';

export default function createDependencies() {
  // Container will load dependencies from this object
  return {
    logger: new Bitnacle(),
  };
}

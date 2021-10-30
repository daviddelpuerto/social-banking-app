import dotenv from 'dotenv';
import { Container } from 'typedi';
import createDependencies from '../../../config/app/dependencies';

function loadEnvConfig() {
  const envConfig = dotenv.config();
  if (envConfig.error) {
    process.stderr.write('⚠️  Couldn\'t find .env file  ⚠️\n');
    process.stderr.write(`${envConfig.error}\n`);
    process.exit(1);
  }
}

function loadIoCDependencies() {
  const dependencies = createDependencies();
  Object.entries(dependencies).forEach(([key, value]) => Container.set(key, value));
}

loadEnvConfig();
loadIoCDependencies();

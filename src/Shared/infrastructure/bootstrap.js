import { Container } from 'typedi';
import createDatabaseConnection from './persistence/mongo/connection';

const logger = Container.get('logger');

export default async function bootstrap() {
  logger.info('Starting application bootstrap process');
  logger.info(`Detected Node ${process.version}`);
  try {
    logger.info('Trying to estabilish database connection...');
    await createDatabaseConnection();
    logger.info('Successfully connected to MongoDB database');
  } catch (error) {
    logger.error('There was an error connecting to MongoDB database. Retrying in 5 seconds...');
    logger.error(error);
  }
}

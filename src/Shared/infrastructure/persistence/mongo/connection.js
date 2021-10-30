import mongoose from 'mongoose';
import credentials from './config/credentials';

let connection = null;

const {
  username, password, cluster, host, databaseName,
} = credentials;

export default async function createDatabaseConnection() {
  if (connection) return connection;

  const connectionUri = `mongodb+srv://${username}:${password}@${cluster}.${host}/${databaseName}?retryWrites=true&w=majority`;

  connection = await mongoose.connect(connectionUri);

  return connection;
}

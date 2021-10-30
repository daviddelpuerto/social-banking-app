const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_CLUSTER,
  DB_HOST,
  DB_NAME,
} = process.env;

export default {
  username: DB_USERNAME,
  password: DB_PASSWORD,
  cluster: DB_CLUSTER,
  host: DB_HOST,
  databaseName: DB_NAME,
};

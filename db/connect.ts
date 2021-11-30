import { Db, MongoClient } from 'mongodb';

/**
 * Caching the database connection in the global object,
 * which is where we can maintain state in a serverless environment.
 *
 * Otherwise, performance issues can occur.
 * It's possible to cache it in this manner due to the fact
 * that the container is reused across executions.
 */
global.mongo = global.mongo || {};

export const connectToDB = async () => {
  if (!global.mongo.client) {
    global.mongo.client = new MongoClient(process.env.MONGO_URI, {
      connectTimeoutMS: 10000,
    });

    console.log('Connecting to DB ...');
    await global.mongo.client.connect();
    console.log('Connected to DB');
  }

  const db: Db = global.mongo.client.db(process.env.DB_NAME);

  return { db, dbClient: global.mongo.client };
};

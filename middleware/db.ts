import { connectToDB } from '../db/connect';

declare global {
  namespace NodeJS {
    interface Global {
      mongo: any;
    }
  }
}

const db = async (req, res, next) => {
  const { db, dbClient } = await connectToDB();
  req.db = db;
  req.dbClient = dbClient;

  next();
};

export default db;

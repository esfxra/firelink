import { NextApiRequest, NextApiResponse } from 'next';
import { Db, MongoClient } from 'mongodb';
import nc from 'next-connect';
import db from '../../../middleware/db';
import onError from '../../../middleware/error';
import { createUser } from '../../../db/user';

interface Request extends NextApiRequest {
  db: Db;
  dbClient: MongoClient;
  query: { user: string[] };
}

const handler = nc<Request, NextApiResponse>({ onError });

handler.post(db, async (req, res) => {
  try {
    const result = await createUser(
      req.db,
      req.body.username,
      req.body.password
    );

    res
      .status(201)
      .json({ message: 'User created.', insertedId: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: 'Request failed.' });
  }
});

export default handler;

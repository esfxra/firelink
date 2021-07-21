import { NextApiRequest, NextApiResponse } from 'next';
import { Db, MongoClient } from 'mongodb';
import nc from 'next-connect';
import middleware from '../../../middleware/all';
import onError from '../../../middleware/error';
import {
  getUserById,
  getUserByUsername,
  updateUsername,
} from '../../../db/user';

interface Request extends NextApiRequest {
  db: Db;
  dbClient: MongoClient;
  query: { user: string[] };
}

const handler = nc<Request, NextApiResponse>({ onError });
handler.use(middleware);

handler.get(async (req, res) => {
  if (req.query.user[0] !== 'username' || !req.query.user[1]) {
    res.status(400).json({ success: false, message: 'Invalid query' });
    return;
  }

  const result = await getUserByUsername(req.db, req.query.user[1]);

  if (!result.success) {
    res.status(200).json({ success: false, message: 'User not found' });
    return;
  }

  res.status(200).json({ success: true, data: result.data });
  return;
});

handler.put(async (req, res) => {
  if (req.query.user[0] !== 'id') {
    res.status(400).send({ success: false, message: 'Invalid query' });
  }

  const user = await updateUsername(req.db, req.query.user[1], req.body);

  res.status(200).send({ success: true, data: user });
});

export default handler;

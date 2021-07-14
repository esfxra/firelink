import { NextApiRequest, NextApiResponse } from 'next';
import { Db, MongoClient } from 'mongodb';
import nc from 'next-connect';
import middleware from '../../../middleware/all';
import onError from '../../../middleware/error';
import { updateUsername } from '../../../db/user';

interface Request extends NextApiRequest {
  db: Db;
  dbClient: MongoClient;
  user: { id: string };
}

const handler = nc<Request, NextApiResponse>({ onError });
handler.use(middleware);

handler.put(async (req, res) => {
  const updatedLink = await updateUsername(
    req.db,
    req.query.id as string,
    req.body
  );

  res.send({ data: updatedLink });
});

export default handler;

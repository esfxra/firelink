import { NextApiRequest, NextApiResponse } from 'next';
import { Db, MongoClient } from 'mongodb';
import nc from 'next-connect';
import middleware from '../../../middleware/all';
import onError from '../../../middleware/error';
import { createLink } from '../../../db/link';

interface Request extends NextApiRequest {
  db: Db;
  dbClient: MongoClient;
  user: { email: string; id: string };
}

const handler = nc<Request, NextApiResponse>({ onError });
handler.use(middleware);

handler.post(async (req, res) => {
  const { insertedId } = await createLink(req.db, {
    url: req.body.url,
    title: req.body.title,
    published: req.body.published,
    createdBy: req.user.userId,
  });

  res.json({ insertedId });
});

export default handler;

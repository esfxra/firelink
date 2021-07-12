import { NextApiRequest, NextApiResponse } from 'next';
import { Db, MongoClient } from 'mongodb';
import nc from 'next-connect';
import middleware from '../../../middleware/all';
import onError from '../../../middleware/error';
import { updateLink, deleteLink } from '../../../db/link';

interface Request extends NextApiRequest {
  db: Db;
  dbClient: MongoClient;
  user: { email: string; id: string };
}

const handler = nc<Request, NextApiResponse>({ onError });
handler.use(middleware);

handler.put(async (req, res) => {
  const updatedLink = await updateLink(
    req.db,
    req.query.id as string,
    req.body
  );

  res.send({ data: updatedLink });
});

handler.delete(async (req, res) => {
  /**
   * @todo Improve the response:
   * - Add status code based on whether deletion occurred or not
   */
  const deletion = await deleteLink(req.db, req.query.id as string);

  res.send({ data: { result: deletion.deletedCount > 0 } });
});

export default handler;

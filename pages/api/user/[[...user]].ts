import { NextApiRequest, NextApiResponse } from 'next';
import { Db, MongoClient } from 'mongodb';
import nc from 'next-connect';

import db from '../../../middleware/db';
import auth from '../../../middleware/auth';
import onError from '../../../middleware/error';
import {
  getUserByUsername,
  createUser,
  updateUsername,
} from '../../../db/user';

interface Request extends NextApiRequest {
  db: Db;
  dbClient: MongoClient;
  query: { user: string[] };
}

const handler = nc<Request, NextApiResponse>({ onError });

handler.get(db, async (req, res) => {
  if (req.query.user[0] !== 'username' || !req.query.user[1]) {
    res.status(400).json({ success: false, message: 'Invalid query' });
    return;
  }

  const { success, data } = await getUserByUsername(req.db, req.query.user[1]);

  if (!success) {
    res.status(200).json({ success, message: 'User not found' });
    return;
  }

  res.status(200).json({ success, data });
  return;
});

handler.post(db, async (req, res) => {
  // Only accept POST requests at '/'
  if (req.query.user) {
    res.status(400).send({
      success: false,
      data: {
        error: 'Invalid query.',
      },
    });

    return;
  }

  // Attempt to create a new user
  try {
    const { success, data } = await createUser(
      req.db,
      req.body.username,
      req.body.password
    );

    if (!success) {
      res.status(400).json({
        success,
        data: {
          error: 'Invalid query.',
        },
      });
      return;
    }

    res.status(201).json({
      success,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: {
        error: 'Request failed.',
      },
    });
  }
});

handler.put(auth, db, async (req, res) => {
  if (req.query.user[0] !== 'id') {
    res.status(400).send({ success: false, message: 'Invalid query' });
    return;
  }

  const { success, data } = await updateUsername(
    req.db,
    req.query.user[1],
    req.body.username
  );

  if (success) {
    res.status(200).json({ success });
  } else {
    res.status(400).end();
  }
});

export default handler;

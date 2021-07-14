import { Db } from 'mongodb';
import { nanoid } from 'nanoid';

/**
 * @todo Use a sort query instead of reversing the array once received
 */
export async function getLinksByUserID(db: Db, userID: string) {
  const links = await db
    .collection('links')
    .find({ createdBy: userID })
    .toArray();

  return links.reverse();
}

export async function createLink(db: Db, link: {}) {
  const newLink = await db
    .collection('links')
    .insertOne({
      _id: nanoid(),
      ...link,
      published: false,
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
    })
    .then(({ ops }) => ops[0]);

  return newLink;
}

export async function updateLink(db: Db, id: string, updates: {}) {
  // updateOne does not return the doc, so we need 2 queries
  await db
    .collection('links')
    .updateOne(
      { _id: id },
      { $set: { ...updates, updatedAt: new Date().toDateString() } }
    );

  const updatedLink = await db.collection('links').findOne({ _id: id });
  return updatedLink;
}

export async function deleteLink(db: Db, id: string) {
  return await db.collection('links').deleteOne({ _id: id });
}

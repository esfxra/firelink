import { Db, ObjectId } from 'mongodb';

const convertToSerializable = (link: any) => {
  return {
    ...link,
    _id: link._id.toString(),
  };
};

/**
 * @todo Use a sort query instead of reversing the array once received
 */
export async function getLinksByUserID(db: Db, userID: string) {
  const links = await db
    .collection(process.env.DB_LINK_COLLECTION)
    .find({ createdBy: userID })
    .toArray();

  const serializedLinks = links.map((link) => convertToSerializable(link));

  return serializedLinks.reverse();
}

export async function createLink(db: Db, link: {}) {
  const result = await db.collection(process.env.DB_LINK_COLLECTION).insertOne({
    ...link,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  return { insertedId: result.insertedId.toString() };
}

export async function updateLink(db: Db, id: string, updates: {}) {
  // updateOne does not return the doc, so we need 2 queries
  await db
    .collection(process.env.DB_LINK_COLLECTION)
    .updateOne(
      { _id: ObjectId.createFromHexString(id) },
      { $set: { ...updates, updatedAt: new Date().toISOString() } }
    );

  const updatedLink = await db
    .collection(process.env.DB_LINK_COLLECTION)
    .findOne({ _id: id });
  return updatedLink;
}

export async function deleteLink(db: Db, id: string) {
  return await db
    .collection(process.env.DB_LINK_COLLECTION)
    .deleteOne({ _id: ObjectId.createFromHexString(id) });
}

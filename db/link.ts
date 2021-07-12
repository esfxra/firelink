import { Db } from 'mongodb';
import { nanoid } from 'nanoid';

interface Link {
  url: string;
  title: string;
}

interface CreateLink extends Link {
  createdBy: string;
}

interface UpdateLink extends Link {
  published: boolean;
}

const getLinksByUser = async (db: Db, userId: string) => {
  return db.collection('links').find({ createdBy: userId }).toArray();
};

const createLink = async (db: Db, link: CreateLink) => {
  const newLink = await db
    .collection('links')
    .insertOne({
      _id: nanoid(),
      ...link,
      published: false,
      createdAt: new Date().toDateString(),
    })
    .then(({ ops }) => ops[0]);

  return newLink;
};

const updateLink = async (db: Db, id: string, updates: UpdateLink) => {
  // updateOne does not return the doc, so we need 2 queries
  await db.collection('links').updateOne({ _id: id }, { $set: updates });

  const updatedLink = await db.collection('links').findOne({ _id: id });
  return updatedLink;
};

const deleteLink = async (db: Db, id: string) => {
  return await db.collection('links').deleteOne({ _id: id });
};

export { getLinksByUser, createLink, updateLink, deleteLink };

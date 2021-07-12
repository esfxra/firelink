import { Db, ObjectID } from 'mongodb';

const getUsers = async (db: Db) => {
  const users = await db.collection('users').find().toArray();

  return users.map((user) => {
    return {
      _id: user._id.toString(),
      name: user.name,
      image: user.image,
    };
  });
};

const getUserById = async (db: Db, id: string) => {
  return db
    .collection('users')
    .findOne({ _id: ObjectID.createFromHexString(id) });
};

export { getUsers, getUserById };

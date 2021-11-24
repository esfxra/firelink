import { Db, ObjectId } from 'mongodb';

const convertToSerializable = (user: any) => {
  return {
    _id: user._id.toString(),
    username: user.username,
    name: user.name,
    image: user.image,
  };
};

export async function getUsers(db: Db) {
  const users = await db.collection('users').find().toArray();

  return users.map((user) => {
    return convertToSerializable(user);
  });
}

export async function getUserById(db: Db, id: string) {
  const user = await db
    .collection('users')
    .findOne({ _id: ObjectId.createFromHexString(id) });

  return convertToSerializable(user);
}

export async function getUserByUsername(db: Db, username: string) {
  const user = await db.collection('users').findOne({ username: username });

  if (!user) {
    return { success: false, data: null };
  }

  return { success: true, data: convertToSerializable(user) };
}

export async function updateUsername(db: Db, id: string, username: string) {
  await db
    .collection('users')
    .updateOne(
      { _id: ObjectId.createFromHexString(id) },
      { $set: { ...{ username }, updatedAt: new Date().toISOString() } }
    );
}

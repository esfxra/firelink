import { Db, ObjectId } from 'mongodb';
import argon2 from 'argon2';

const convertToSerializable = (user: any) => {
  return {
    _id: user._id.toString(),
    username: user.username,
    name: user.name ? user.name : '',
    image: user.image ? user.image : '',
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
  try {
    const user = await db.collection('users').findOne({ username: username });

    if (!user) {
      return { success: false, data: null };
    }

    return { success: true, data: convertToSerializable(user) };
  } catch (error) {
    console.error(error);
    return { success: false, data: null };
  }
}

export async function createUser(db: Db, username: string, password: string) {
  try {
    // Hash the password with argon2
    const hashedPassword = await argon2.hash(password);

    // Insert the document with the db driver
    const result = await db
      .collection('users')
      .insertOne({ username, password: hashedPassword });

    // Return success status and data if aknowledged by db
    if (result.acknowledged) {
      return {
        success: true,
        data: {
          insertedId: result.insertedId,
        },
      };
    }

    // Return failure status
    return {
      success: false,
      data: null,
    };
  } catch (error) {
    // Log the error
    console.error(error);

    // Return failure status
    return {
      success: false,
      data: null,
    };
  }
}

export async function authenticateUser(
  db: Db,
  username: string,
  password: string
) {
  try {
    const user = await db.collection('users').findOne({ username: username });

    if (!user) {
      return { success: false, data: null };
    }

    // Compare credentials
    // Verify the password with argon2
    const passwordMatch = await argon2.verify(user.password, password);
    if (user.username === username && passwordMatch) {
      return { success: true, data: convertToSerializable(user) };
    }

    return { success: false, data: null };
  } catch (error) {
    console.error(error);
    return { success: false, data: null };
  }
}

export async function updateUsername(db: Db, id: string, username: string) {
  try {
    const result = await db
      .collection('users')
      .updateOne(
        { _id: ObjectId.createFromHexString(id) },
        { $set: { ...{ username }, updatedAt: new Date().toISOString() } }
      );

    return {
      success: true,
      data: { modifiedCount: result.modifiedCount },
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      data: null,
    };
  }
}

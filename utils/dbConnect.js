import { connect } from 'mongoose';

export default async function dbConnect() {
  try {
    // const conn = await connect(process.env.MONGO_URI, {
    const conn = await connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

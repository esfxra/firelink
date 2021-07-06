import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const user = await User.findOne({ username: id });
        if (!user) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json(user);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    // case 'POST':
    //   try {
    //     const user = await User.create(
    //       req.body
    //     ); /* create a new model in the database */
    //     res.status(201).json({ success: true, data: user });
    //   } catch (error) {
    //     res.status(400).json({ success: false });
    //   }
    //   break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}

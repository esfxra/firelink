import { getToken } from 'next-auth/jwt';

const auth = async (req, res, next) => {
  // Decode the token with the JWT secret, and attach it to req.user
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  if (token) {
    // Signed in
    req.user = token;
    next();
  } else {
    // Not Signed in
    res.status(401);
    res.end();
  }
};

export default auth;

import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

/**
 * @todo Add more providers, and consider standard username-password credentials
 */
export default (req, res) =>
  NextAuth(req, res, {
    session: {
      // DB sessions are used by default, but configuring to use jwt instead
      jwt: true,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    providers: [
      Providers.GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
    ],

    database: process.env.MONGO_URI,
    pages: {
      signIn: 'login',
    },
  });

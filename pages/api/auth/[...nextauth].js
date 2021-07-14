import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import Adapters from 'next-auth/adapters';
import Models from '../../../models';

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
    adapter: Adapters.TypeORM.Adapter(process.env.MONGO_URI, {
      models: {
        User: Models.User,
      },
    }),
    pages: {
      signIn: '/login',
    },
    callbacks: {
      async session(session, user) {
        // Note: session is the JWT payload
        if (user) {
          session.user.id = user.id;
        }

        return session;
      },
      async jwt(tokenPayload, user, account, profile, isNewUser) {
        if (tokenPayload && user) {
          return { ...tokenPayload, id: `${user.id}` };
        }

        return tokenPayload;
      },
    },
  });

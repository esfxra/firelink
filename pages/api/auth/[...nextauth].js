import NextAuth from 'next-auth';
import GiHubProvider from 'next-auth/providers/github';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';

import { connectToDB } from '../../../db/connect';

/**
 * @todo Add more providers, and consider standard username-password credentials
 */
const auth = async (req, res) => {
  const { db } = await connectToDB();

  return NextAuth(req, res, {
    session: {
      strategy: 'jwt',
    },
    secret: process.env.JWT_SECRET,
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    providers: [
      GiHubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
        profile(profile) {
          return {
            id: profile.id,
            name: profile.name,
            image: profile.avatar_url,
            email: profile.email,
            // Custom fields
            emailVerified: null,
            username: null,
          };
        },
      }),
    ],
    adapter: MongoDBAdapter({ db }),
    pages: {
      signIn: '/auth/access',
      newUser: '/auth/newUser',
    },
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          return { ...token, id: `${user.id}` };
        }

        return token;
      },
      async session({ session, user, token }) {
        if (token) {
          session.user.id = token.id;
        }

        return session;
      },
    },
  });
};

export default auth;

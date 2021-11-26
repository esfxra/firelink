import NextAuth from 'next-auth';
import GiHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';

import { connectToDB } from '../../../db/connect';
import { authenticateUser } from '../../../db/user';

/**
 * @todo Add GitLab provider
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
      CredentialsProvider({
        async authorize(credentials) {
          try {
            const { success, data } = await authenticateUser(
              db,
              credentials.username,
              credentials.password
            );

            if (!success) {
              return null;
            }

            return data;
          } catch (error) {
            console.error(error);
            return null;
          }
        },
      }),
    ],
    adapter: MongoDBAdapter({ db }),
    pages: {
      signIn: '/auth/signin',
      newUser: '/auth/newUser',
    },
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          const userId = user._id ? user._id : user.id;
          return { ...token, id: `${userId}` };
        }

        return token;
      },
      async session({ session, token }) {
        if (token) {
          session.user.id = token.id;
        }

        return session;
      },
    },
  });
};

export default auth;

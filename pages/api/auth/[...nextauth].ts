import NextAuth from 'next-auth';
import {MongoDBAdapter} from '@next-auth/mongodb-adapter';
import Auth0Provider from 'next-auth/providers/auth0';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import clientPromise from './lib/mongodb';
import CredentialsProvider from 'next-auth/providers/credentials';
import User, {UserTypes} from '../../../models/User';
import bcrypt from 'bcrypt';
import {connectDb, disconnectDb} from '../../../utils/db';

connectDb();

export default NextAuth({
  // https://next-auth.js.org/configuration/providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {label: 'Email', type: 'email', placeholder: 'email@email.com'},
        password: {label: 'Password', type: 'password'},
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;
        const user = await User.findOne<UserTypes>({email});

        if (user) {
          return SignInUser(password, user);
        } else {
          throw new Error('This email does not exist.');
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER_BASE_URL!,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.JWT_SECRET,
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  pages: {
    // signIn: '/auth/signin',  // Displays signin buttons
    signIn: '/signin',
  },
  callbacks: {
    async session({session, token}) {
      let user = await User.findById<UserTypes>(token.sub);
      if (!user) {
        return session;
      }
      session.user._id = token.sub || user._id.toString();
      session.user.role = user.role || 'user';
      return session;
    },
  },
});

const SignInUser = async (password: string | undefined, user: UserTypes) => {
  if (!user.password) {
    throw new Error('please enter your password');
  }
  if (password) {
    const testPassword = await bcrypt.compare(password, user.password);
    if (!testPassword) {
      throw new Error('Either password or email are wrong');
    }
  }
  return user;
};

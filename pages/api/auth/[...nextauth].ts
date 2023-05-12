import { login } from '@/src/utils/apollo/login';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const response = await login(
          credentials ? credentials?.username : '',
          credentials ? credentials?.password : ''
        );
        if (response) {
          const { authToken, refreshToken, sessionToken, user, customer } =
            response;
          const name = user.name;
          const id = customer.id;
          // localStorage.setItem('tokenAuth', tokenAuth);
          return {
            id,
            name,
            email: response?.user.email,
            authToken,
            refreshToken,
            sessionToken,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: any | undefined;
      user: any | undefined;
    }) {
      if (user && token) {
        token.authToken = user.authToken;
        token.refreshToken = user.refreshToken;
        token.sessionToken = user.sessionToken;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: any | undefined;
      token: any | undefined;
    }) {
      if (session && token) {
        session.user.tokens = {
          authToken: token.authToken,
          refreshToken: token.refreshToken,
          sessionToken: token.sessionToken,
        };
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);

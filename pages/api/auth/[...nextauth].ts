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
        username: {
          label: 'Email',
          type: 'text',
          placeholder: 'jsmith@gmail.com',
        },
        password: { label: 'Password', type: 'password' },
        // firstName: { label: 'Full Name', type: 'text' },
      },
      async authorize(credentials, req) {
        const response = await login(
          credentials ? credentials?.username : '',
          credentials ? credentials?.password : ''
        );
        if (response) {
          const { authToken, refreshToken, sessionToken, customer } = response;
          const { id, firstName: name, email, billing } = customer;
          const { address1: address, phone } = billing;
          // localStorage.setItem('tokenAuth', tokenAuth);
          return {
            id,
            name,
            email,
            address,
            phone,
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
        token.address= user.address;
        token.phone=user.phone ;
      }
      return token;
    },
    async session({
      session,
      // user,
      token,
    }: {
      session: any | undefined;
      // user: any | undefined;
      token: any | undefined;
    }) {
      if (session && token) {
        session.user.tokens = {
          authToken: token.authToken,
          refreshToken: token.refreshToken,
          sessionToken: token.sessionToken,
        };
        session.user.info = {
          address: token.address,
          phone: token.phone,
        };
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);

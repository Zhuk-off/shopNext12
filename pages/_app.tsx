import '@/styles/globals.scss';
import type { AppProps } from 'next/app';

import { ApolloProvider } from '@apollo/client';
import { client } from '@/src/utils/apollo/apolloClient';
import Router from 'next/router';
import NProgress from 'nprogress';
import { CartCountProvider } from '@/src/contex/CartContex';
import { ControlBarContextProvider } from '@/src/contex/ControlBarContext';
import { SessionProvider } from 'next-auth/react';

// Авторизация с использованием токена из localStorage
// const httpLink = new HttpLink({
//   uri: "https://your-graphql-api.com/graphql",
// });

// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem("token");
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <CartCountProvider>
          <ControlBarContextProvider>
            <Component {...pageProps} />
          </ControlBarContextProvider>
        </CartCountProvider>
      </SessionProvider>
    </ApolloProvider>
  );
}

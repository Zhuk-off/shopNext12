import '@/styles/globals.scss';
import type { AppProps } from 'next/app';

import { ApolloProvider } from '@apollo/client';
import { client } from '@/src/utils/apollo/apolloClient';

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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

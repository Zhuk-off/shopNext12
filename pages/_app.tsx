import '@/styles/globals.scss';
import type { AppProps } from 'next/app';

import { ApolloProvider } from '@apollo/client';
import { client } from '@/src/utils/apollo/apolloClient';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

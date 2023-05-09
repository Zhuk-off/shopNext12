import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'YOUR_GRAPHQL_API_ENDPOINT',
});

const authLink = setContext((_, { headers }) => {
  // Получите ваш Bearer токен из хранилища и добавьте его в заголовок авторизации
  const token =
    typeof localStorage !== 'undefined' ? localStorage.getItem('authToken') : null;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  uri: 'https://sp.zhu.by/graphql',
  cache: new InMemoryCache(),
});

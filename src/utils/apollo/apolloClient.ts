import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://sp.zhu.by/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      // Type policy map
      Cart: {
        fields: {
          // Field policy map for the Product type
          localStorage: {
            // Field policy for the isInCart field
            read(_, { variables }) {
              // The read function for the isInCart field
              const cartData = localStorage.getItem('cartItems');
              return cartData !== null ? JSON.parse(cartData) : null;
            },
          },
        },
      },
    },
  }),
});

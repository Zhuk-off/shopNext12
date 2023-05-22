import { IGetCart } from '@/src/interfaces/apollo/getCart.interface';
import { ICartLocalStorage } from '@/src/interfaces/cart.interface';
import { ApolloClient } from '@apollo/client';
import { AUTH_TOKEN, REFRESH_TOKEN, SESSION_TOKEN } from '../constants/tokens';
import { truncate } from 'fs';

export const getLocalStorageCartItems = (): ICartLocalStorage | null => {
  const cartData = localStorage.getItem('cartItems');
  const parsedCartData: ICartLocalStorage | null =
    cartData !== null ? JSON.parse(cartData) : null;
  return parsedCartData;
};

// Преобразовать данные корзины с сервера (запрос GET_CART_SERVER) в данные корзины в LocalSorage
export const transformedCartForLocalStorage = (
  data: IGetCart,
  sync?: boolean
): ICartLocalStorage => {
  const cartItems = data.cart.contents.edges.map((edge) => {
    const { quantity, product } = edge.node;
    return {
      id: product.node.id,
      quantity,
      databaseId: product.node.databaseId,
    };
  });

  const totalQty = cartItems.reduce((total, item) => total + item.quantity, 0);

  const transformedCart: ICartLocalStorage = {
    cartItems,
    totalPrice: 0,
    sync: sync ? sync : false,
    totalQty,
  };

  return transformedCart;
};

// Установить токены в LocalStorage
export const setTokensInLocalStorage = (
  authToken?: string,
  refreshToken?: string,
  sessionToken?: string,
  apolloClient?: ApolloClient<object>
): void => {
  if (authToken) {
    localStorage.setItem('authToken', authToken);
  }
  if (refreshToken) {
    localStorage.setItem('refreshToken', refreshToken);
  }
  if (sessionToken) {
    localStorage.setItem('sessionToken', sessionToken);
  }
  if (apolloClient) {
    updateApolloCache(apolloClient);
  }
};

// обновить кеш в Apollo
export function updateApolloCache(apolloClient: ApolloClient<object>) {
  apolloClient.resetStore();
}

export const getToken = (
  tokenName: typeof AUTH_TOKEN | typeof REFRESH_TOKEN | typeof SESSION_TOKEN
): string | null => {
  const token =
    typeof localStorage !== 'undefined'
      ? localStorage.getItem(tokenName)
      : null;
  return token;
};

export const getAuthorizationHeader = (authToken: string | null) => {
  const header = authToken ? { authorization: `Bearer ${authToken}` } : {};
  return header;
};

export const getAuthorizationHeaderWithAuthToken = () => {
  const authToken = getToken('authToken');
  const authorizationHeader = getAuthorizationHeader(authToken);
  return authorizationHeader;
};

export const localStorageRemoveTokens = (): void => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('sessionToken');
};

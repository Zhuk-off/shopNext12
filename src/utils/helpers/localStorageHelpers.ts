import { IGetCart } from '@/src/interfaces/apollo/getCart.interface';
import { ICartLocalStorage } from '@/src/interfaces/cart.interface';
import { ApolloClient } from '@apollo/client';

export const getLocalStorageCartItems = (): ICartLocalStorage | null => {
  const cartData = localStorage.getItem('cartItems');
  const parsedCartData: ICartLocalStorage | null =
    cartData !== null ? JSON.parse(cartData) : null;
  return parsedCartData;
};

// Преобразовать данные корзины с сервера (запрос GET_CART_SERVER) в данные корзины в LocalSorage
export const transformedCartForLocalStorage = (
  data: IGetCart
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
    totalQty,
  };

  return transformedCart;
};

export const setTokensInLocalStorage = (
  authToken: string,
  refreshToken: string,
  sessionToken: string,
  apolloClient: ApolloClient<object>
): void => {
  localStorage.setItem('authToken', authToken);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('sessionToken', sessionToken);
  updateApolloCache(apolloClient);
};

// обновить кеш в Apollo
export function updateApolloCache(apolloClient: ApolloClient<object>) {
  apolloClient.resetStore();
}

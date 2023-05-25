import { IFillCart } from '@/src/interfaces/apollo/getCart.interface';
import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
  OperationVariables,
  ReactiveVar,
} from '@apollo/client';
import {
  getAuthorizationHeaderWithAuthToken,
  getLocalStorageCartItems,
} from './localStorageHelpers';
import { FillCartMutationData } from '@/src/interfaces/apollo/helpers.interface';
import { convertedCartToFillMutation } from '../helpers';
import { ICartLocalStorage } from '@/src/interfaces/cart.interface';

export const syncCartWithServer = async (
  delCartServer: (
    options?:
      | MutationFunctionOptions<
          any,
          OperationVariables,
          DefaultContext,
          ApolloCache<any>
        >
      | undefined
  ) => Promise<any>,
  fillCart: (
    options?:
      | MutationFunctionOptions<
          IFillCart,
          OperationVariables,
          DefaultContext,
          ApolloCache<any>
        >
      | undefined
  ) => Promise<FetchResult<IFillCart>>,
  setCart: (cart: ICartLocalStorage) => void,
  cartVar: ReactiveVar<ICartLocalStorage>
) => {
  const header = getAuthorizationHeaderWithAuthToken();
  const cartData = getLocalStorageCartItems();
  await delCartServer({
    context: {
      headers: header,
    },
  });

  if (cartData) {
    console.log('cartData for fill', cartData);
    const fillCartMutationData: FillCartMutationData[] =
      convertedCartToFillMutation(cartData);
    console.log('cartData for fill fillCartMutationData', fillCartMutationData);
    await fillCart({
      variables: { items: fillCartMutationData },
      context: {
        headers: header,
      },
    });
    clearCartLocal(setCart,cartVar)
  }
};

export const clearCartLocal = (
  setCart: (cart: ICartLocalStorage) => void,
  cartVar: ReactiveVar<ICartLocalStorage>
): void => {
  const cartEmpty = {
    cartItems: [],
    totalPrice: 0,
    sync: false,
    totalQty: 0,
  };
  setCart(cartEmpty);
  cartVar(cartEmpty);
};

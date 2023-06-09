import { CartContext } from '@/src/contex/CartContex';
import { IFillCart } from '@/src/interfaces/apollo/getCart.interface';
import { FillCartMutationData } from '@/src/interfaces/apollo/helpers.interface';
import { ICartLocalStorage } from '@/src/interfaces/cart.interface';
import {
  FILL_CART,
  REMOVE_CART_ITEMS,
} from '@/src/utils/apollo/mutationsConst';
import { cartVar } from '@/src/utils/apollo/reactiveVar';
import { convertedCartToFillMutation } from '@/src/utils/helpers';
import {
  IAuthorizationHeader,
  getAuthorizationHeader,
  getLocalStorageCartItems,
  getToken,
  localStorageRemoveTokens,
} from '@/src/utils/helpers/localStorageHelpers';
import { useMutation } from '@apollo/client';
import classNames from 'classnames';
import { signOut, useSession } from 'next-auth/react';
import React, { forwardRef, Ref, useContext } from 'react';

interface SignOutProps {
  active: boolean;
}

const SignOut = forwardRef(function SignOutComponent(
  { active }: SignOutProps,
  ref: Ref<HTMLButtonElement>
) {
  const [cart, setCart] = useContext(CartContext);
  const { data: session } = useSession();
  const [
    fillCart,
    { data: fillCartData, error: fillCartError, loading: fillCartLoading },
  ] = useMutation<IFillCart>(FILL_CART, {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  });
  const [
    delCartServer,
    {
      data: delCartServerData,
      error: delCartServerError,
      loading: delCartServerLoading,
    },
  ] = useMutation(REMOVE_CART_ITEMS, {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  });

  const handleSignOut = async () => {
    const authToken = getToken('authToken');
    const header = getAuthorizationHeader(authToken);
    const cartData = getLocalStorageCartItems();
    // console.log('handleSignOut', authToken, header, cartData,session);

    if (cartData && cartData?.totalQty > 0) {
      await delCartServerHandle(header);
      await addLocalCartToServer(header, cartData);
      await delLocalCart();
    }
    await signOut().then(() => localStorageRemoveTokens());
    
  };

  // удалить корзину на сервере
  async function delCartServerHandle(header: IAuthorizationHeader) {
    delCartServer({
      context: {
        headers: header,
      },
    });
    // console.log('delCartServerHandle');
  }

  // добавить local на сервер
  async function addLocalCartToServer(
    header: IAuthorizationHeader,
    cartData: ICartLocalStorage
  ) {
    const fillCartMutationData: FillCartMutationData[] =
      convertedCartToFillMutation(cartData);
    await fillCart({
      variables: { items: fillCartMutationData },
      context: {
        headers: header,
      },
    });
    // console.log('addLocalCartToServer');
  }

  // удалить корзину с local
  async function delLocalCart() {
    const cartEmpty = {
      cartItems: [],
      totalPrice: 0,
      sync: false,
      totalQty: 0,
    };
    setCart(cartEmpty);
    cartVar(cartEmpty);
    // console.log('delLocalCart');
  }

  return (
    <button
      ref={ref}
      onClick={handleSignOut}
      className={classNames(
        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
        'block w-full px-4 py-2 text-left text-sm'
      )}
    >
      Выход
    </button>
  );
});

SignOut.displayName = 'SignOut';

export default SignOut;

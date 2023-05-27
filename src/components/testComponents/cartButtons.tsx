import { IFillCart, IGetCart } from '@/src/interfaces/apollo/getCart.interface';
import { FillCartMutationData } from '@/src/interfaces/apollo/helpers.interface';
import { IRefreshJwtAuthToken } from '@/src/interfaces/apollo/login.interface';
import {
  CREATE_ORDER,
  FILL_CART,
  REFRESH_JWT_AUTH_TOKEN,
  REMOVE_CART_ITEMS,
} from '@/src/utils/apollo/mutationsConst';
import {
  GET_CART_SERVER,
  GET_PRODUCTS_URI,
} from '@/src/utils/apollo/queriesConst';
import { convertedCartToFillMutation } from '@/src/utils/helpers';
import {
  getAuthorizationHeader,
  getAuthorizationHeaderWithAuthToken,
  getAuthorizationHeaderWithRefreshToken,
  getLocalStorageCartItems,
  getToken,
  setTokensInLocalStorage,
} from '@/src/utils/helpers/localStorageHelpers';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useSession } from 'next-auth/react';
import React from 'react';

function CartButtons() {
  const { data: session } = useSession();
  const [
    getProductsURI,
    {
      loading: getProductsURILoading,
      error: getProductsURIError,
      data: getProductsURIData,
    },
  ] = useLazyQuery<any>(GET_PRODUCTS_URI, { fetchPolicy: 'network-only' });
  const [
    getCartServer,
    {
      loading: getCartServerLoading,
      error: getCartServerError,
      data: getCartServerData,
    },
  ] = useLazyQuery<IGetCart>(GET_CART_SERVER, { fetchPolicy: 'network-only' });
  const [
    fillCart,
    { data: fillCartData, error: fillCartError, loading: fillCartLoading },
  ] = useMutation<IFillCart>(FILL_CART, {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  });
  const [
    refreshJwtAuthToken,
    {
      data: refreshJwtAuthTokenData,
      error: refreshJwtAuthTokenError,
      loading: refreshJwtAuthTokenLoading,
    },
  ] = useMutation<IRefreshJwtAuthToken>(REFRESH_JWT_AUTH_TOKEN, {
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
  const [
    createOrder,
    {
      data: createOrderData,
      error: createOrderError,
      loading: createOrderLoading,
    },
  ] = useMutation(CREATE_ORDER, {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  });

  const getCart = () => {
    getCartServer({
      context: {
        headers: getAuthorizationHeaderWithAuthToken(),
      },
    }).then(({ data }) => {
      console.log(data?.cart);
    });
  };

  const clearCart = () => {
    delCartServer({
      context: {
        headers: getAuthorizationHeaderWithAuthToken(),
      },
    }).then(({ data }) => {
      console.log('clearCart', data);
    });
    console.log('delCartServerHandle');
  };

  const fillCartHandle = () => {
    const cartData = getLocalStorageCartItems();
    if (cartData && cartData?.totalQty > 0) {
      const fillCartMutationData: FillCartMutationData[] =
        convertedCartToFillMutation(cartData);
      fillCart({
        variables: { items: fillCartMutationData },
        context: {
          headers: getAuthorizationHeaderWithAuthToken(),
        },
      }).then(({ data }) => {
        console.log('fillCart', data?.fillCart?.cart);
      });
    }
  };

  const refreshAuth = () => {
    const refreshToken = getToken('refreshToken');
    refreshJwtAuthToken({
      variables: {
        jwtRefreshToken: refreshToken
          ? refreshToken
          : session?.user.tokens.refreshToken,
      },
    }).then(({ data }) => {
      const authToken = data?.refreshJwtAuthToken.authToken;
      console.log(authToken);
      setTokensInLocalStorage(authToken);
    });
  };
  const createOrderHandler = () => {
    createOrder({
      variables: {
        phone: '+375292115454',
        firstName: 'Александр',
        email: 'xxxxxx.xx@gmail.com',
        address1: 'г. витебск, ул. Большая д. 10',
        customerNote: 'Примечание покупателя',
        paymentMethod: 'cod',
      },
      context: {
        headers: getAuthorizationHeaderWithRefreshToken(),
      },
    }).then(({ data }) => {
      console.log('createOrder', data);
    });
  };

  const getProductsURIHandler = async () => {
    const paths = [];
    const first = 100;
    let cursor = null;

    // await  getProductsURI({ variables: { first, cursor }}).then(({ data }) => {
    //     console.log('getProductsURI', data);
    //   });
    let allProducts: any[] = [];
    while (true) {
      let products: any = [];
      await getProductsURI({ variables: { first, cursor } }).then(
        ({ data }) => {
          products = data?.products;
          console.log('getProductsURI', data);
        }
      );
      console.log(products);

      allProducts = allProducts?.concat(products?.edges);

      if (!products?.pageInfo?.hasNextPage) {
        break;
      }
      const pagePaths = products?.edges?.map(({ node }: { node: any }) => `/product/${node.slug }`);

      paths.push(...pagePaths);

      cursor = products?.pageInfo?.endCursor;
      console.log('paths', paths);
    }

    return allProducts;
  };

  if (fillCartData) {
    // console.log('fillCartData', fillCartData.fillCart);
  }

  return (
    <div>
      <button className="border p-3" onClick={() => getCart()}>
        Корзина
      </button>
      <button className="border p-3" onClick={() => clearCart()}>
        Очистить
      </button>
      <button className="border p-3" onClick={() => fillCartHandle()}>
        FillCart
      </button>
      <button className="border p-3" onClick={() => refreshAuth()}>
        Refresh
      </button>
      <button className="border p-3" onClick={() => createOrderHandler()}>
        createOrder
      </button>
      <button className="border p-3" onClick={() => getProductsURIHandler()}>
        getProductsURI
      </button>
    </div>
  );
}

export default CartButtons;

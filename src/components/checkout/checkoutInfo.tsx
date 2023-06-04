import { GET_CUSTOMER_DATA } from '@/src/utils/apollo/queriesConst';
import {
  convertedCartToFillMutation,
  sumToStringWithComa,
} from '@/src/utils/helpers';
import { useMutation, useQuery } from '@apollo/client';
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Spinner } from '../spinner';
import {
  getAuthorizationHeaderWithAuthToken,
  getAuthorizationHeaderWithRefreshToken,
  getLocalStorageCartItems,
  getToken,
  setTokensInLocalStorage,
} from '@/src/utils/helpers/localStorageHelpers';
import { useSession } from 'next-auth/react';
import {
  ICustomerData,
  IRefreshJwtAuthToken,
} from '@/src/interfaces/apollo/login.interface';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  CREATE_ORDER,
  FILL_CART,
  REFRESH_JWT_AUTH_TOKEN,
  REMOVE_CART_ITEMS,
} from '@/src/utils/apollo/mutationsConst';
import { clearCartLocal } from '@/src/utils/helpers/serverQueryHelpers';
import { CartContext } from '@/src/contex/CartContex';
import { cartVar } from '@/src/utils/apollo/reactiveVar';
import {
  ICheckout,
  IPersonalData,
} from '@/src/interfaces/apollo/checkout.interface';
import { IFillCart } from '@/src/interfaces/apollo/getCart.interface';
import { FillCartMutationData } from '@/src/interfaces/apollo/helpers.interface';

type Inputs = {
  username: string;
  email: string;
  phone: string;
  address1Billing: string;
  comments: string;
};

export const ChekcoutInfo = ({
  sum,
  totalCount,
  loading,

  personalData,
  setPersonalData,
}: {
  sum: number;
  totalCount: number | undefined;
  loading: boolean;
  personalData: IPersonalData;
  setPersonalData: Dispatch<SetStateAction<IPersonalData>>;
}) => {
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
    fillCart,
    { data: fillCartData, error: fillCartError, loading: fillCartLoading },
  ] = useMutation<IFillCart>(FILL_CART, {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  });

  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const { data: session } = useSession();
  const [cart, setCart] = useContext(CartContext);

  const sumWithComa = sumToStringWithComa(sum);
  const {
    loading: userDataLoading,
    error: userDataError,
    data: userDataData,
  } = useQuery<ICustomerData>(GET_CUSTOMER_DATA, {
    variables: {
      id: session ? session.user.info.id : '',
    },
    context: {
      headers: getAuthorizationHeaderWithRefreshToken(),
    },
    pollInterval: 20000,
  });
  // const [personalData, setPersonalData] = useState({
  //   username: '',
  //   email: '',
  //   phone: '',
  //   address1Billing: '',
  //   comments: '',
  //   change: false,
  //   orderNumber: '',
  //   orderStatus: 'success',
  // });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const [
    createOrder,
    {
      data: createOrderData,
      error: createOrderError,
      loading: createOrderLoading,
    },
  ] = useMutation<ICheckout>(CREATE_ORDER, {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  });

  useEffect(() => {
    if (userDataData && !personalData.change) {
      setPersonalData((old) => ({
        ...old,
        username: userDataData.customer.firstName
          ? userDataData.customer.firstName
          : '',
        email: userDataData.customer.email ? userDataData.customer.email : '',
        // phone: userDataData.customer.billing.phone
        //   ? userDataData.customer.billing.phone
        //   : '',
        // address1Billing: userDataData.customer.billing.address1
        //   ? userDataData.customer.billing.address1
        // : '',
        change: false,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personalData.change, userDataData]);

  const handleFieldChange = (e: { target: { id: string; value: string } }) => {
    setPersonalData((old) => ({
      ...old,
      [e.target.id]: e.target.value,
      change: true,
    }));
  };

  const refreshAuth = async () => {
    const refreshToken = getToken('refreshToken');
    await refreshJwtAuthToken({
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
  const clearCart = async () => {
    await delCartServer({
      context: {
        headers: getAuthorizationHeaderWithAuthToken(),
      },
    }).then(({ data }) => {
      console.log('clearCart', data);
    });
    console.log('delCartServerHandle');
  };
  const fillCartHandle = async () => {
    const cartData = getLocalStorageCartItems();
    if (cartData && cartData?.totalQty > 0) {
      const fillCartMutationData: FillCartMutationData[] =
        convertedCartToFillMutation(cartData);
      await fillCart({
        variables: { items: fillCartMutationData },
        context: {
          headers: getAuthorizationHeaderWithAuthToken(),
        },
      }).then(({ data }) => {
        console.log('fillCart', data?.fillCart?.cart);
      });
    }
  };
  const createOrderHandler = async () => {
    await createOrder({
      variables: {
        phone: personalData.phone,
        firstName: personalData.username,
        email: personalData.email,
        address1: personalData.address1Billing,
        customerNote: personalData.comments,
        paymentMethod: 'cod',
      },
      context: {
        headers: getAuthorizationHeaderWithRefreshToken(),
      },
    }).then(({ data }) => {
      console.log('createOrder', data);
      clearCartLocal(setCart, cartVar);
      if (data)
        setPersonalData((old) => ({
          ...old,
          change: true,
          // если null, то вылетает ошибка - удобно для отладки
          // orderNumber: data.checkout.order.orderNumber,
          // orderStatus: data.checkout.result,
          orderNumber: data.checkout.order.orderNumber
            ? data.checkout.order.orderNumber
            : '',
          orderStatus: data.checkout.result ? data.checkout.result : '',
        }));
    });
  };

  // Если форма заполнена верно, то произойдет отправка формы (входной параметр data не нужен, потому что все есть в state)
  // TODO Устнарить БАГ - при отправки формы, если данные не введены вручную, а получены из запроса то поля - undefined
  const onSubmit: SubmitHandler<Inputs> = async () => {
    setLoadingCheckout(true);
    console.log('object');

    await refreshAuth();
    await clearCart();
    await fillCartHandle();
    await createOrderHandler();

    setLoadingCheckout(false);
  };

  // console.log(userDataData);
  console.log(personalData);
  console.log('totalCount', totalCount);

  return (
    <div className="flex flex-col space-y-3 p-8 lg:w-96">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="username"
            className="block text-left text-sm font-medium leading-6 text-gray-900"
          >
            Имя
          </label>
          <div className="mt-2">
            <input
              {...register('username', {})}
              id="username"
              name="username"
              // required
              disabled
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus-visible:outline-none sm:text-sm sm:leading-6"
              onChange={(e) => handleFieldChange(e)}
              value={personalData.username}
            />
            {/* {errors.username && (
              <span className="text-sm text-red-600" role="alert">
                {errors.username.message}
              </span>
            )} */}
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-left text-sm font-medium leading-6 text-gray-900"
          >
            Email
          </label>
          <div className="mt-2">
            <input
              {...register('email', {})}
              id="email"
              name="email"
              type="email"
              // required
              disabled
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus-visible:outline-none sm:text-sm sm:leading-6"
              onChange={(e) => handleFieldChange(e)}
              value={personalData.email}
            />
            {/* {errors.email && (
              <span className="text-sm text-red-600" role="alert">
                {errors.email.message}
              </span>
            )} */}
          </div>
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-left text-sm font-medium leading-6 text-gray-900"
          >
            Телефон
          </label>
          <div className="mt-2">
            <input
              {...register('phone', {
                required: 'Введите ваш номер телефона',
                minLength: {
                  value: 7,
                  message:
                    'Номер телефона должно содержать не менее 7 символов',
                },
              })}
              name="phone"
              id="phone"
              type="text"
              placeholder="Пример: +375 (29) 811-81-81"
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus-visible:outline-none sm:text-sm sm:leading-6"
              onChange={(e) => handleFieldChange(e)}
              value={personalData.phone}
            />
            {errors.phone && (
              <span className="text-sm text-red-600" role="alert">
                {errors.phone.message}
              </span>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="address1Billing"
            className="block text-left text-sm font-medium leading-6 text-gray-900"
          >
            Адрес
          </label>
          <div className="mt-2">
            <input
              {...register('address1Billing', {
                required: 'Введите ваш адрес',
                minLength: {
                  value: 5,
                  message: 'Адрес должен содержать не менее 5 символов',
                },
              })}
              id="address1Billing"
              name="address1Billing"
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus-visible:outline-none sm:text-sm sm:leading-6"
              onChange={(e) => handleFieldChange(e)}
              value={personalData.address1Billing}
            />
            {errors.address1Billing && (
              <span className="text-sm text-red-600" role="alert">
                {errors.address1Billing.message}
              </span>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="comments"
            className="block text-left text-sm font-medium leading-6 text-gray-900"
          >
            Комментарий к заказу
          </label>
          <div className="col-span-full">
            <div className="mt-2">
              <textarea
                {...register('comments')}
                id="comments"
                name="comments"
                rows={3}
                onChange={(e) => handleFieldChange(e)}
                className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus-visible:outline-none sm:text-sm sm:leading-6"
                defaultValue={''}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={totalCount === 0}
          className={`${
            totalCount === 0 ? 'bg-gray-400' : 'bg-pink-700 hover:bg-pink-800'
          } mt-5 block w-full rounded-md p-3 font-semibold text-white transition`}
        >
          <div className="text-center">
            {' '}
            {loadingCheckout ? (
              <div className="pt-1">
                <Spinner />
              </div>
            ) : (
              'Подтвердить заказ'
            )}
          </div>
        </button>
      </form>
    </div>
  );
};

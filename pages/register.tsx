import Container from '@/src/components/container';
import { Spinner } from '@/src/components/spinner';
import { CartContext } from '@/src/contex/CartContex';
import { IFillCart, IGetCart } from '@/src/interfaces/apollo/getCart.interface';
import { FillCartMutationData } from '@/src/interfaces/apollo/helpers.interface';
import {
  FILL_CART,
  REGISTER_CUSTOMER,
} from '@/src/utils/apollo/mutationsConst';
import { GET_CART_SERVER } from '@/src/utils/apollo/queriesConst';
import { cartVar } from '@/src/utils/apollo/reactiveVar';
import {
  convertedCartToFillMutation,
  simplifyError,
} from '@/src/utils/helpers';
import {
  getAuthorizationHeader,
  getLocalStorageCartItems,
  getToken,
  localStorageRemoveTokens,
  setTokensInLocalStorage,
  transformedCartForLocalStorage,
} from '@/src/utils/helpers/localStorageHelpers';
import { useLazyQuery, useMutation } from '@apollo/client';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  username: string;
  fullname: string;
  password: string;
  confirmPassword: string;
  policy: boolean;
};

export default function Register() {
  // hooks start -----------------------------------------------
  const [cart, setCart] = useContext(CartContext);

  const [
    fillCart,
    { data: fillCartData, error: fillCartError, loading: fillCartLoading },
  ] = useMutation<IFillCart>(FILL_CART, {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  });
  const [
    getCartServer,
    { loading: getCartLoading, error: getCartError, data: getCartData },
  ] = useLazyQuery<IGetCart>(GET_CART_SERVER);
  const [
    addNewCustomer,
    {
      data: addNewCustomerData,
      loading: addNewCustomerLoading,
      error: addNewCustomerError,
    },
  ] = useMutation(REGISTER_CUSTOMER, { errorPolicy: 'all' });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [authState, setAuthState] = useState({
    password: '12345678',
    confirmPassword: '12345678',
    username: 'zhukoffweb@gmail.com',
    fullname: 'Александр',
    policy: true,
  });
  const router = useRouter();
  const { data: session } = useSession();
  const [pageState, setPageState] = useState({
    error: '',
    status: '',
    processing: false,
  });

  // hooks end -----------------------------------------------

  const refreshToken = getToken('refreshToken');

  // Обработка ввода  -----------------------------------------------
  const handleFieldChange = (e: { target: { id: string; value: string } }) => {
    setAuthState((old) => ({ ...old, [e.target.id]: e.target.value }));
  };
  // конец Обработка ввода  -----------------------------------------------

  // Обработка ошибок  -----------------------------------------------
  if (
    addNewCustomerError &&
    addNewCustomerError.message &&
    pageState.error === ''
  ) {
    setPageState((old) => ({
      ...old,
      error: addNewCustomerError.message,
      processing: false,
    }));
  }

  const handleRegister = async () => {
    setPageState((old) => ({ ...old, processing: true, error: '' }));

    await addNewCustomer({
      variables: {
        email: authState.username,
        password: authState.password,
        firstName: authState.fullname,
      },
    }).then(({ data }) => {
      if (data && data?.registerCustomer) {
        signIn('credentials', { ...authState, redirect: false })
          .then((response) => {
            localStorageRemoveTokens();
            if (response?.ok) {
              const { authToken } = data?.registerCustomer;
              syncCart(authToken);
            } else {
              setPageState((old) => ({
                ...old,
                processing: false,
                error: response?.error ? response?.error : '',
              }));
            }
          })
          .catch((error) => {
            setPageState((old) => ({
              ...old,
              processing: false,
              error: error.message ?? 'Что-то пошло не так...',
            }));
          })
          .finally(() => {
            setPageState((old) => ({
              ...old,
              processing: false,
            }));
          });
      }
    });
  };

  if (session && refreshToken === null) {
    setTokens();
  }

  async function syncCart(authToken: string) {
    const header = getAuthorizationHeader(authToken);
    const cartData = getLocalStorageCartItems();
    if (cartData && cartData?.totalQty > 0) {
      const fillCartMutationData: FillCartMutationData[] =
        convertedCartToFillMutation(cartData);
      await fillCart({
        variables: { items: fillCartMutationData },
        context: {
          headers: header,
        },
      }).then(({ data }) => {
        getCartServerHandle(header);
      });
    }
  }

  async function getCartServerHandle(
    header: { authorization: string } | { authorization?: undefined }
  ) {
    if (header) {
      await getCartServer({
        context: {
          headers: header,
        },
      })
        .then(({ data }) => {
          if (data) {
            if (data) {
              const localStorageCart = transformedCartForLocalStorage(
                data,
                true
              );
              setCart(localStorageCart);
              cartVar(localStorageCart);
            }
          }
        })
        .finally(() =>
          setPageState((old) => ({ ...old, processing: false, status: '' }))
        );
    }
  }

  // Если форма заполнена верно, то произойдет отправка формы (входной параметр data не нужен, потому что все есть в state)
  const onSubmit: SubmitHandler<Inputs> = async () => {
    await handleRegister();
  };

  function setTokens() {
    if (session) {
      const { authToken, refreshToken, sessionToken } = session.user.tokens;
      setTokensInLocalStorage(
        authToken,
        refreshToken,
        sessionToken
        // apolloClient // обновление Apollo кеша вызывает ошибку TypeError: Cannot read properties of undefined (reading 'data')
      );
    }
  }

  if (session && refreshToken !== null && !fillCartLoading && !getCartLoading) {
    router.push('/');
  }

  // console.log('router',router)

  return (
    <>
      {session === null ? (
        <div className="fixed inset-0 overflow-y-auto">
          <Container>
            <Link
              href={'/'}
              className="flex items-center gap-1 font-medium text-indigo-600 hover:text-gray-900"
            >
              <ArrowLeftIcon width={15} height={15} /> На главную
            </Link>
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <div className="justify-cent7er flex min-h-full flex-1 flex-col px-6 py-12 lg:px-8">
                <div className="mb-12">Sign up to your account</div>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <Image
                    className="m-auto h-8 w-auto sm:h-10"
                    src="/logo.svg"
                    alt="spec1.by"
                    width={126}
                    height={24}
                  />
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                  {pageState.error !== '' && (
                    <p className="text-red-500">
                      {simplifyError(pageState.error)}
                    </p>
                  )}
                  {/* {addNewCustomerError && addNewCustomerError.message} */}
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                      <label
                        htmlFor="username"
                        className="block text-left text-sm font-medium leading-6 text-gray-900"
                      >
                        Email
                      </label>
                      <div className="mt-2">
                        <input
                          {...register('username', {
                            required: 'Поле Email обязательно для заполнения',
                            pattern: {
                              value: /\S+@\S+\.\S+/,
                              message:
                                'Поле Email должно быть в формате example@domain.com',
                            },
                          })}
                          id="username"
                          name="username"
                          type="email"
                          className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={(e) => handleFieldChange(e)}
                          value={authState.username}
                        />
                        {errors.username && (
                          <span className="text-sm text-red-600" role="alert">
                            {errors.username.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="fullname"
                        className="block text-left text-sm font-medium leading-6 text-gray-900"
                      >
                        Full name
                      </label>
                      <div className="mt-2">
                        <input
                          {...register('fullname', {
                            required:
                              'Поле Full name обязательно для заполнения',
                            minLength: 2,
                          })}
                          id="fullname"
                          name="fullname"
                          className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={(e) => handleFieldChange(e)}
                          value={authState.fullname}
                        />
                        {errors.fullname && (
                          <span className="text-sm text-red-600" role="alert">
                            {errors.fullname.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Password
                        </label>
                      </div>
                      <div className="mt-2">
                        <input
                          {...register('password', {
                            required: 'Поле Пароль обязательно для заполнения',
                            minLength: {
                              value: 1,
                              message:
                                'Поле Пароль должно содержать не менее 1 символов',
                            },
                          })}
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={(e) => handleFieldChange(e)}
                          value={authState.password}
                        />
                        {errors.password && (
                          <span className="text-sm text-red-600" role="alert">
                            {errors.password.message}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="confirmPassword"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Confirm Password
                        </label>
                      </div>
                      <div className="mt-2">
                        <input
                          {...register('confirmPassword', {
                            validate: (value) =>
                              value === authState.password ||
                              'Пароли не совпадают',
                          })}
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          autoComplete="current-password"
                          className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={(e) => handleFieldChange(e)}
                          value={authState.confirmPassword}
                        />
                        {errors.confirmPassword && (
                          <span className="text-sm text-red-600" role="alert">
                            {errors.confirmPassword.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="mt-8 flex gap-2 ">
                      <input
                        className="h-4 w-4"
                        {...register('policy', {
                          required:
                            'Вы должны согласиться с политикой конфиденциальности',
                        })}
                        type="checkbox"
                        checked={authState.policy}
                        name="policy"
                        id="policy"
                        onChange={() =>
                          setAuthState((old) => ({
                            ...old,
                            policy: !authState.policy,
                          }))
                        }
                      />

                      <span className="shrink-1 block text-left text-sm text-gray-600">
                        Email me about product updates and resources. If this
                        box is checked, Stripe will occasionally send helpful
                        and relevant emails. You can unsubscribe at any time.
                        Privacy Policy
                      </span>
                    </div>
                    {errors.policy && (
                      <span className="text-sm text-red-600" role="alert">
                        {errors.policy.message}
                      </span>
                    )}

                    <div>
                      <button
                        className="mt-8 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        // onClick={handleAuth}
                        disabled={pageState.processing}
                        type="submit"
                      >
                        {pageState.processing ? (
                          <div className="pt-1">
                            <Spinner />
                          </div>
                        ) : (
                          'Sign up'
                        )}
                      </button>
                    </div>
                  </form>
                  <span className="mt-3 inline-block">
                    <span>Have an account? </span>
                    <Link
                      className="text-indigo-600 hover:text-gray-900"
                      href="/login"
                    >
                      Sign in
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </Container>
        </div>
      ) : null}
    </>
  );
}

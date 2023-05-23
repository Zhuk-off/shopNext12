import Container from '@/src/components/container';
import { Spinner } from '@/src/components/spinner';
import { CartContext } from '@/src/contex/CartContex';
import { IFillCart, IGetCart } from '@/src/interfaces/apollo/getCart.interface';
import { FillCartMutationData } from '@/src/interfaces/apollo/helpers.interface';
import { FILL_CART } from '@/src/utils/apollo/mutationsConst';
import { GET_CART_SERVER } from '@/src/utils/apollo/queriesConst';
import { cartVar } from '@/src/utils/apollo/reactiveVar';
import { convertedCartToFillMutation } from '@/src/utils/helpers';
import {
  getAuthorizationHeader,
  getLocalStorageCartItems,
  getToken,
  localStorageRemoveTokens,
  setTokensInLocalStorage,
  transformedCartForLocalStorage,
} from '@/src/utils/helpers/localStorageHelpers';
import { useLazyQuery, useMutation } from '@apollo/client';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  username: string;
  password: string;
};

export default function Login() {
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
  // const apolloClient = useApolloClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();
  const [authState, setAuthState] = useState({
    username: 'zhukoffweb@gmail.com',
    password: '12345678',
  });
  const { data: session } = useSession();
  const [pageState, setPageState] = useState({
    error: '',
    status: '',
    processing: false,
  });

  const handleFieldChange = (e: { target: { id: string; value: string } }) => {
    setAuthState((old) => ({ ...old, [e.target.id]: e.target.value }));
  };
  const simplifyError = (error: string) => {
    const errorMap: { [key: string]: string } = {
      CredentialsSignin: 'Не верный логин или пароль',
    };
    return errorMap[error] ?? 'Не известная ошибка';
  };

  /* Авторизация в NextAuth + установка токенов в localStorage + редирект */
  const handleAuth = async () => {
    setPageState((old) => ({
      ...old,
      processing: true,
      status: '...авторизация',
    }));
    await signIn('credentials', { ...authState, redirect: false }).then(() =>
      localStorageRemoveTokens()
    );
  };

  const refreshToken = getToken('refreshToken');
  /*  хз, для дублируется в запросе на авторизацию, но почему-то тут в этом исполнении лучше работает */
  if (session && refreshToken === null) {
    const { authToken } = session.user.tokens;
    syncCart(authToken);
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
        // console.log('fillCart', data?.fillCart.added);
        getCartServerHandle(header);
      });
    } else {
      await getCartServerHandle(header);
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
            // console.log('getCartServer', data.cart.contents.edges);
            if (data) {
              const localStorageCart = transformedCartForLocalStorage(
                data,
                true
              );
              setCart(localStorageCart);
              cartVar(localStorageCart);
              // console.log('local cart', localStorageCart);
            }
          }
        })
        .finally(() =>
          setPageState((old) => ({ ...old, processing: false, status: '' }))
        );
    }
  }

  // Отправка формы ReactHookForm (входной параметр data не нужен, потому что все есть в state)
  const onSubmit: SubmitHandler<Inputs> = () => {
    handleAuth();
  };

  const handleSignOut = () => {
    signOut().then(() => localStorageRemoveTokens());
  };

  /* Если пользователь авторизован редиректим на главную */
  if (
    session &&
    cart?.sync &&
    getCartData &&
    !getCartLoading &&
    !fillCartLoading
  ) {
    const { authToken, refreshToken, sessionToken } = session.user.tokens;
    setTokensInLocalStorage(
      authToken,
      refreshToken,
      sessionToken
      // apolloClient // обновление Apollo кеша вызывает ошибку TypeError: Cannot read properties of undefined (reading 'data')
    );
    // console.log('router back done');
    router.back();
  }

  if (session && refreshToken !== null) {
    console.log('router back  session && refreshToken !== null');
    try {
      router.back();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="fixed inset-0 overflow-y-auto">
        <Container>
          <Link
            href={'/'}
            className="flex items-center gap-1 font-medium text-indigo-600 hover:text-gray-900"
          >
            <ArrowLeftIcon width={15} height={15} /> На главную
          </Link>
          {session === null ? (
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <div className="justify-cent7er flex min-h-full flex-1 flex-col px-6 py-12 lg:px-8">
                <div className="mb-12">Sign in to your account</div>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <Image
                    className="m-auto h-8 w-auto sm:h-10"
                    src="/logo.svg"
                    alt="spec1.by"
                    width={126}
                    height={24}
                  />
                </div>
                {/* {session ? 'Sign In' : 'Sign Out'} */}
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                  {pageState.error !== '' && (
                    <p className="text-red-500">
                      {simplifyError(pageState.error)}
                    </p>
                  )}
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
                          required
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
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Password
                        </label>
                        <div className="text-sm">
                          <Link
                            href="/reset-pass"
                            className="font-semibold text-indigo-600 hover:text-indigo-500"
                          >
                            Forgot password?
                          </Link>
                        </div>
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
                          required
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
                    </div>

                    <div>
                      <button
                        className="mt-8 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        type="submit"
                      >
                        {pageState.processing ? (
                          <div className="pt-1">
                            <Spinner />
                          </div>
                        ) : (
                          'Sign in'
                        )}
                      </button>
                      <span className="block h-2 text-xs text-gray-500">
                        {fillCartLoading || getCartLoading
                          ? '...синхронизация корзины'
                          : pageState.status}
                      </span>

                      {/* <button
                        className="mt-8 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        type="submit"
                        onClick={() => handleSignOut()}
                      >
                        Sign out
                      </button> */}
                    </div>
                  </form>
                  <span className="mt-3 inline-block">
                    <span>Don&apos;t have an account? </span>
                    <Link
                      className="text-blue-600 hover:text-gray-900"
                      href="/register"
                    >
                      Sign up
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <div className="justify-cent7er flex min-h-full flex-1 flex-col px-6 py-12 lg:px-8">
                <div className="mb-12 text-xl font-semibold text-green-500">
                  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    Authorization was successful!
                    <span className="block h-2 text-xs text-gray-500">
                      {fillCartLoading || getCartLoading
                        ? '...синхронизация корзины'
                        : pageState.status}
                    </span>
                    {/* <button
                          className="mt-8 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          type="submit"
                          onClick={() => router.back()}
                        >
                          Назад
                        </button>
                    <button
                          className="mt-8 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          type="submit"
                          onClick={() => handleSignOut()}
                        >
                          Sign out
                        </button> */}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>
      </div>
    </>
  );
}

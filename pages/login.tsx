import Container from '@/src/components/container';
import { ADD_PRODUCT_TO_CART } from '@/src/utils/apollo/queriesConst';
import { useApolloClient, useMutation } from '@apollo/client';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  username: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();
  const [authState, setAuthState] = useState({
    username: 'zhukoffweb@gmail.com',
    password: '1',
  });
  const { data: session } = useSession();
  const [addProduct, { data: addProductData, loading: loadingProduct }] =
    useMutation(ADD_PRODUCT_TO_CART);

  const [pageState, setPageState] = useState({
    error: '',
    processing: false,
  });

  // Получим токен для будущей проверки есть ли он?
  const [refreshToken, setRefreshToken] = useState<string | null>('');
  useEffect(() => {
    const refreshTokenFromLocalStorage = localStorage.getItem('refreshToken');
    setRefreshToken(refreshTokenFromLocalStorage);
  }, []);

  if (session) {
    router.push('/');
  }

  const handleFieldChange = (e: { target: { id: string; value: string } }) => {
    setAuthState((old) => ({ ...old, [e.target.id]: e.target.value }));
  };

  const simplifyError = (error: string) => {
    const errorMap: { [key: string]: string } = {
      CredentialsSignin: 'Не верный логин или пароль',
    };
    return errorMap[error] ?? 'Не известная ошибка';
  };

  const handleAuth = async () => {
    setPageState((old) => ({ ...old, processing: true, error: '' }));
    signIn('credentials', { ...authState, redirect: false })
      .then((response) => {
        console.log(response);
        if (response?.ok) {
          // пользователь аторизован
          console.log(response);
          router.push('/');
        } else {
          setPageState((old) => ({
            ...old,
            processing: false,
            error: response?.error ? response?.error : '',
          }));
        }
      })
      .catch((error) => {
        console.log(error);
        setPageState((old) => ({
          ...old,
          processing: false,
          error: error.message ?? 'Что-то пошло не так...',
        }));
      });
  };

  // console.log(authState.username, authState.password)
  console.log('session', session);

  // для обновления кеша в Apollo
  const apolloClient = useApolloClient();
  function updateApolloCache() {
    apolloClient.resetStore();
  }

  if (session && (refreshToken === null || refreshToken === '')) {
    const { authToken, refreshToken, sessionToken } = session.user.tokens;
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('sessionToken', sessionToken);
    updateApolloCache();
    window.location.reload();
  }

  console.log('mutation', addProductData);

  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('sessionToken');
    signOut();
  };

  const authToken =
    typeof localStorage !== 'undefined'
      ? localStorage.getItem('authToken')
      : null;
  const authorizationHeader = authToken
    ? { authorization: `Bearer ${authToken}` }
    : {};

  // Если форма заполнена верно, то произойдет отправка формы (входной параметр data не нужен, потому что все есть в state)
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // запустим функцию для авторизации
    console.log(errors);
    console.log(data);

    handleAuth();
  };

  console.log('errors', errors);

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
                        disabled={pageState.processing}
                      >
                        Sign in
                      </button>
                    </div>
                  </form>

                  <button
                    className="mt-3 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() =>
                      addProduct({
                        context: {
                          headers: authorizationHeader,
                        },
                      })
                    }
                  >
                    Add product
                  </button>
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
          </Container>
        </div>
      ) : null}
    </>
  );
}

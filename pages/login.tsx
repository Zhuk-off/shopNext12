import { ADD_PRODUCT_TO_CART } from '@/src/utils/apollo/queriesConst';
import { useApolloClient, useMutation } from '@apollo/client';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [authState, setAuthState] = useState({
    username: '',
    password: '',
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
          //  router.push('/')
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

  return (
    <div className="fixed inset-0 overflow-y-auto">
      <div>
        <p>Signed in as {session && session?.user?.name}</p>
        <button className="border p-2" onClick={() => handleSignOut()}>
          Sign out
        </button>
      </div>
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
              <p className="text-red-500">{simplifyError(pageState.error)}</p>
            )}
            <div>
              <label
                htmlFor="login"
                className="block text-left text-sm font-medium leading-6 text-gray-900"
              >
                Login
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="login"
                  required
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => handleFieldChange(e)}
                  value={authState.username}
                />
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
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => handleFieldChange(e)}
                  value={authState.password}
                />
              </div>
            </div>

            <div>
              <button
                className="mt-8 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleAuth}
                disabled={pageState.processing}
              >
                Sign in
              </button>
            </div>

            <button
              type="submit"
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
          </div>
        </div>
      </div>
    </div>
  );
}

import { IDataLogin } from '@/src/interfaces/apollo/login.interface';
import { LOGIN_AUTH } from '@/src/utils/apollo/mutationsConst';
import {
  ADD_PRODUCT_TO_CART,
  GET_CART_TOTAL,
} from '@/src/utils/apollo/queriesConst';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Dispatch, FormEvent, Fragment, SetStateAction, useState } from 'react';

export default function LoginModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const [auth, { data, loading, error, reset }] =
    useMutation<IDataLogin>(LOGIN_AUTH);

  const [addProduct, { data: addProductData, loading: loadingProduct }] =
    useMutation(ADD_PRODUCT_TO_CART);

  // для обновления кеша в Apollo
  const apolloClient = useApolloClient();
  function updateApolloCache() {
    apolloClient.resetStore();
  }

  const authToken =
    typeof localStorage !== 'undefined'
      ? localStorage.getItem('authToken')
      : null;
  const authorizationHeader = authToken
    ? { authorization: `Bearer ${authToken}` }
    : {};

  const { loading: cartTotalLoading, data: cartTotal } = useQuery(
    GET_CART_TOTAL,
    {
      context: {
        headers: authorizationHeader,
      },
    }
  );

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  function closeModal() {
    setIsOpen(false);
  }

  function handleForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // предотвращаем отправку формы по умолчанию
    // выполняем действия с данными формы, например, отправляем их на сервер
    auth({ variables: { username: login, password: pass } });
  }

  if (data && !loading) {
    console.log(data);
    const { authToken, refreshToken, sessionToken } = data.login;
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('sessionToken', sessionToken);
    updateApolloCache();
    window.location.reload();
  }

  if (error) {
    // console.log('error', error);
    reset();
  }

  if (data) {
    console.log('dataAuth', data);
    console.log('name', data.login.user.name);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Sign in to your account
                  </Dialog.Title>
                  {/* {error && <p className="text-red-600">{error.message}</p>} */}
                  <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
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
                      <form
                        className="space-y-6"
                        onSubmit={handleForm} // обработчик отправки формы
                      >
                        <p>{}</p>
                        <div>
                          <label
                            htmlFor="login"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Login
                          </label>
                          <div className="mt-2">
                            <input
                              id="login"
                              name="login"
                              // type="login"
                              // autoComplete="email"
                              onChange={(e) => setLogin(e.target.value)}
                              value={login}
                              required
                              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                              onChange={(e) => setPass(e.target.value)}
                              value={pass}
                              required
                              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div>
                          <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={() => setIsOpen(!isOpen)}
                          >
                            Sign in
                          </button>
                        </div>
                      </form>
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

import { Fragment, useContext, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { CartContext } from '@/src/contex/CartContex';
import { useMutation, useReactiveVar } from '@apollo/client';
import { cartVar } from '@/src/utils/apollo/reactiveVar';
import {
  IAuthorizationHeader,
  getAuthorizationHeader,
  getLocalStorageCartItems,
  getToken,
  localStorageRemoveTokens,
} from '@/src/utils/helpers/localStorageHelpers';
import { IFillCart } from '@/src/interfaces/apollo/getCart.interface';
import {
  FILL_CART,
  REMOVE_CART_ITEMS,
} from '@/src/utils/apollo/mutationsConst';
import { ICartLocalStorage } from '@/src/interfaces/cart.interface';
import { FillCartMutationData } from '@/src/interfaces/apollo/helpers.interface';
import { convertedCartToFillMutation } from '@/src/utils/helpers';
import { syncCartWithServer } from '@/src/utils/helpers/serverQueryHelpers';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function AccountButton() {
  const cartA = useReactiveVar(cartVar);
  const router = useRouter();
  const { data: session } = useSession();
  const [cart, setCart] = useContext(CartContext);
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
    await syncCartWithServer(delCartServer, fillCart, setCart, cartVar);
    signOut().then(() => localStorageRemoveTokens());
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const Basket = (
    <Menu.Item>
      {({ active }) => (
        <Link
          href="/order"
          className={classNames(
            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
            'flex items-center gap-1 px-4 py-2 text-sm'
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
          Корзина
          <div className="order-last ml-auto rounded-full bg-[#CE041F] px-1 text-xs text-white">
            {cartA.totalQty}
          </div>
        </Link>
      )}
    </Menu.Item>
  );

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-full
           bg-white px-4 py-1 font-medium text-gray-900 shadow-sm ring-1
           ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="my-auto h-4 w-4 text-gray-900"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            Аккаунт
            <ChevronDownIcon
              className="-mr-1 h-5 w-5 text-gray-900"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {!session ? (
                <div className="my-2 flex flex-col gap-y-2">
                  <div className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.0}
                      stroke="currentColor"
                      className="mx-auto h-10 w-10 text-gray-900"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div className="text-center">
                    <Menu.Item>
                      <button
                        onClick={() => handleLogin()}
                        className="rounded-full border bg-[#CE041F] px-6 py-1 font-medium text-white transition hover:bg-[#A41F30] hover:text-white  focus:outline-none"
                      >
                        Войти
                      </button>
                    </Menu.Item>
                  </div>
                  {Basket}
                </div>
              ) : (
                <>
                  <div className="order-last mb-1 ml-auto px-4 py-2 text-center text-sm font-medium text-gray-900">
                    {session.user.email}
                  </div>
                  {Basket}
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/my-account"
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Личные данные
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => handleSignOut()}
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block w-full px-4 py-2 text-left text-sm'
                        )}
                      >
                        Выход
                      </button>
                    )}
                  </Menu.Item>
                </>
              )}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}

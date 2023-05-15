import { CartContext } from '@/src/contex/CartContex';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

export default function MyAccountNavMenu() {
  const [cart] = useContext(CartContext);
  const router = useRouter();
  return (
    <nav className="">
      <ul>
        <li className="block w-full origin-top-right bg-white text-left text-gray-700 shadow-sm ring-1 ring-black ring-opacity-5 hover:bg-gray-100 hover:text-gray-900 focus:outline-none">
          <Link href="/order" className="flex items-center gap-1 px-4 py-2">
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
            <div className="order-last ml-auto rounded-full bg-pink-700 px-1 text-xs text-white">
              {cart ? cart?.totalQty : null}
            </div>
          </Link>
        </li>
        <li
          className={`${
            router?.route === '/my-account'
              ? 'bg-gray-100 text-gray-900'
              : 'bg-white text-gray-700'
          }block w-full origin-top-right 
      shadow-sm ring-1 ring-black ring-opacity-5 hover:bg-gray-100 hover:text-gray-900 focus:outline-none`}
        >
          <Link
            href="/my-account"
            className="flex items-center gap-1 px-4 py-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="my-auto h-4 w-4 text-gray-900"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              ></path>
            </svg>
            Личные данные
          </Link>
        </li>
        <li
          className={`${
            router?.route === '/my-account/history'
              ? 'bg-gray-100 text-gray-900'
              : 'bg-white text-gray-700'
          }block w-full origin-top-right 
      shadow-sm ring-1 ring-black ring-opacity-5 hover:bg-gray-100 hover:text-gray-900 focus:outline-none`}
        >
          <Link href="#" className="flex items-center gap-1 px-4 py-2">
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
                d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
              />
            </svg>
            История покупок
          </Link>
        </li>
      </ul>
    </nav>
  );
}

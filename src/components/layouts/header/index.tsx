import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import LocationContacts from './locationContacts';
import Promotions from './promotions';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <LocationContacts />
        <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start">
          <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
            <Link href="/">
              <Image
                className="h-8 w-auto sm:h-10"
                src='/logo.png'
                alt="spec1.by"
                width={126}
                height={24}
              />
            </Link>
          </div>
          <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
            <Link
              href="/"
              className="font-medium text-gray-500 hover:text-gray-900"
            >
              Каталог
            </Link>
            <Link
              href="/sale"
              className="font-medium text-gray-500 hover:text-gray-900"
            >
              Акции
            </Link>
            <Link
              href="/delivery"
              className="font-medium text-gray-500 hover:text-gray-900"
            >
              Доставка и оплата
            </Link>
            <Link
              href="/contact"
              className="font-medium text-gray-500 hover:text-gray-900"
            >
              Контакты
            </Link>
          </div>

          <div className="-mr-2 flex items-center md:hidden">
            <button
              type="button"
              className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </nav>
        <Promotions/>
      </div>

      <div className="hidden md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/"
            className="font-medium text-gray-600 hover:text-gray-800"
          >
            Каталог
          </Link>
          <Link
            href="/sale"
            className="font-medium text-gray-600 hover:text-gray-800"
          >
            Акции
          </Link>
          <Link
            href="/delivery"
            className="font-medium text-gray-600 hover:text-gray-800"
          >
            Доставка и оплата
          </Link>
          <Link
            href="/contact"
            className="font-medium text-gray-600 hover:text-gray-800"
          >
            Контакты
          </Link>
        </div>
      </div>
      src\icons
    </header>
  );
};

export default Header;

import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, Fragment, SetStateAction } from 'react';
import NavDropdown from './NavDropdown';
import { MenuItem } from '@/src/interfaces/apollo/buildMenu.interface';
import AccountButton from './accountButton';
import CartButton from './cartButton';
import { CartCountProvider } from '@/src/contex/CartContex';

const NavMenu = ({
  menu,
  setIsMenuOpen,
  isMenuOpen,
}: {
  menu: MenuItem[];
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  isMenuOpen: boolean;
}) => {
  return (
    <nav className="relative flex items-center justify-between bg-gray-100 sm:h-10 lg:justify-start">
      <div className="flex flex-shrink-0 flex-grow items-center lg:flex-grow-0">
        <Link href="/">
          <Image
            className="h-8 w-auto sm:h-10"
            src="/logo.svg"
            alt="spec1.by"
            width={126}
            height={24}
          />
        </Link>
      </div>
      <div className="hidden items-center md:ml-10 md:flex md:space-x-8 md:pr-4">
        <NavDropdown
          menu={menu}
          setIsMenuOpen={setIsMenuOpen}
          isMenuOpen={isMenuOpen}
        />

        {/* <Link
          href="/sale"
          className="font-medium text-gray-500 hover:text-gray-900"
        >
          Акции
        </Link> */}
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
        <AccountButton />
        <CartButton />
      </div>

      <div className="-mr-2 flex items-center md:hidden">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
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
  );
};

export default NavMenu;

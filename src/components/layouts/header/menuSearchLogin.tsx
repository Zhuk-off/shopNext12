import Image from 'next/image';
import Link from 'next/link';
import {
  Dispatch,
  Fragment,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import NavDropdown from './NavDropdown';
import AccountButton from './accountButton';
import CartButton from './cartButton';
import { Dialog, Transition } from '@headlessui/react';
import { MenuItem } from '@/src/interfaces/apollo/buildMenu.interface';
import { DataContext } from '.';

const NavMenu = ({
  setIsMenuOpen,
  isMenuOpen,
  menu,
}: {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  isMenuOpen: boolean;
  menu: MenuItem[];
}) => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const { setSubMenuItems } = useContext(DataContext);
  const handleMouseEnter = (data: MenuItem[]) => {
    setSubMenuItems(data);
  };

  return (
    <nav className="relative flex items-center justify-between bg-gray-100 pt-4 sm:h-10 md:pt-0 lg:justify-start">
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
        <NavDropdown setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
        {/* <Link
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
        </Link> */}
        <AccountButton />
        <CartButton />
      </div>

      <div className="-mr-2 flex items-center md:hidden">
        <button
          type="button"
          onClick={openModal}
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

          <div className="fixed inset-0 h-screen w-screen overflow-y-auto">
            <div className="flex h-screen w-screen items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative h-full w-full transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex gap-3 text-lg font-medium leading-6 text-gray-900"
                  >
                    <div className="mr-10 flex flex-wrap gap-x-4 gap-y-2">
                      <AccountButton />
                      <CartButton />
                    </div>
                  </Dialog.Title>
                  <div className="absolute right-4 top-0 mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      X
                    </button>
                  </div>
                  <div className="h-full overflow-y-auto">
                    {menu && (
                      <menu className="h-52">
                        {menu.map((menuItem) => (
                          <li
                            key={menuItem.id + Math.random.toString()}
                            className="mt-2 text-gray-600 hover:bg-red-50 hover:text-red-600"
                          >
                            <Link
                              href={menuItem.slug}
                              className="block py-1"
                              onMouseEnter={() =>
                                handleMouseEnter(
                                  menuItem?.children ? menuItem?.children : []
                                )
                              }
                              onClick={closeModal}
                            >
                              <span className="font-semibold">
                                {menuItem.name}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </menu>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </nav>
  );
};

export default NavMenu;

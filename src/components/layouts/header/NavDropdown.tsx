import Link from 'next/link';
import { useState } from 'react';

const NavDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative font-medium text-gray-500 ">
      <button
        className="rounded-full border bg-gray-300 px-6 py-1 font-medium 
        transition
        hover:bg-gray-400 hover:text-white focus:bg-gray-500 focus:text-white focus:outline-none"
        onClick={toggleDropdown}
      >
        Каталог
      </button>
      {isOpen && (
        <div className="fixed left-0 top-28 z-50 w-full bg-white shadow-lg">
          <ul className="container mx-auto max-w-7xl px-2 py-2 sm:px-6 lg:px-8">
            <li className="mb-2">
              <Link
                href="/"
                className="font-medium text-gray-700 hover:text-gray-900"
              >
                Home
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/"
                className="font-medium text-gray-700 hover:text-gray-900"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="font-medium text-gray-700 hover:text-gray-900"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavDropdown;

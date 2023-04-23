import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export const NavButtons = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: any;
  totalPages: any;
  onPageChange: any;
}) => {
  const totalPaginationPages = totalPages < 1 ? 1 : totalPages;

  let buttons: JSX.Element[] = [];
  let arr: (string | number)[] = [];

  if (totalPaginationPages <= 7) {
    arr = Array.from({ length: totalPaginationPages }, (_, index) => index + 1);

    buttons = arr.map((item) => (
      <button
        onClick={() => onPageChange(item)}
        key={item}
        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
          item === currentPage
            ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
        }`}
      >
        {item}
      </button>
    ));
  } else {
    if (currentPage <= 3 || currentPage > totalPaginationPages - 3) {
      for (let i = 1; i <= 3; i++) {
        arr.push(i);
      }
      arr.push('...');
      for (let i = 1; i <= 3; i++) {
        arr.push(totalPaginationPages - (3 - i));
      }

      buttons = arr.map((item, index) => {
        let page = item;
        if ('...' === item && currentPage <= 3) {
          page = 4;
        }
        if ('...' === item && currentPage >= totalPaginationPages - 2) {
          page = totalPaginationPages - 3;
        }
        return (
          <button
            onClick={() => onPageChange(page)}
            key={item.toString() + index.toString()}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
              item === currentPage
                ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
            }`}
          >
            {item}
          </button>
        );
      });
    }
    if (currentPage > 3 && currentPage <= totalPaginationPages - 3) {
      arr.push(1);
      arr.push('...');
      arr.push(currentPage - 1);
      arr.push(currentPage);
      arr.push(currentPage + 1);
      arr.push('...');
      arr.push(totalPaginationPages);
      buttons = arr.map((item, index) => {
        let page = item;

        if ('...' === item && index === 1) {
          page = currentPage - 2;
        }
        if ('...' === item && index === 5) {
          page = currentPage + 2;
        }
        return (
          <button
            onClick={() => onPageChange(page)}
            key={item.toString() + index.toString()}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
              item === currentPage
                ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
            }`}
          >
            {item}
          </button>
        );
      });
    }
  }

  return (
    <nav
      className="isolate inline-flex -space-x-px rounded-md shadow-sm"
      aria-label="Pagination"
    >
      <button
        onClick={() =>
          onPageChange(currentPage !== 1 ? currentPage - 1 : currentPage)
        }
        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
      >
        <span className="sr-only">Previous</span>
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
      </button>

      {buttons?.map((item) => item)}

      <button
        onClick={() =>
          onPageChange(
            currentPage !== totalPaginationPages
              ? currentPage + 1
              : totalPaginationPages
          )
        }
        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
      >
        <span className="sr-only">Next</span>
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </nav>
  );
};

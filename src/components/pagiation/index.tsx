import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';

// export const Pagination = ({
//   total,
//   pages,
// }: {
//   total: string;
//   pages: number;
// }) => {
//   const [currentPage, setCurrentPage] = useState(1);
// const currentClasses = 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
// const defaultClasses = 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
//   return (
//     <>
//       <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
//         <div>
//           <p className="text-sm text-gray-700">
//             Страница <span className="font-medium">1</span> из{' '}
//             <span className="font-medium">{pages}.</span> Всего{' '}
//             <span className="font-medium">{total}</span> товаров
//           </p>
//         </div>
//         <div>
//           <nav
//             className="isolate inline-flex -space-x-px rounded-md shadow-sm"
//             aria-label="Pagination"
//           >
//             <Link
//               href="#"
//               className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
//             >
//               <span className="sr-only">Previous</span>
//               <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
//             </Link>
//             {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
//             Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
//             <Link
//               href="#"
//               aria-current="page"
//               className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentClasses}`}
//             >
//               1
//             </Link>
//             <Link
//               href="#"
//               className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${defaultClasses}`}
//             >
//               2
//             </Link>
//             <Link
//               href="#"
//               className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
//             >
//               3
//             </Link>
//             <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
//               ...
//             </span>
//             <Link
//               href="#"
//               className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
//             >
//               8
//             </Link>
//             <Link
//               href="#"
//               className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//             >
//               9
//             </Link>
//             <Link
//               href="#"
//               className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//             >
//               10
//             </Link>
//             <Link
//               href="#"
//               className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//             >
//               <span className="sr-only">Next</span>
//               <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
//             </Link>
//           </nav>
//         </div>
//       </div>
//     </>
//   );
// };

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: any;
  totalPages: any;
  onPageChange: any;
}) {
  const handlePrevClick = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextClick = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div>
      <button onClick={handlePrevClick} disabled={currentPage === 1} className='border py-2 px-4'>
        Назад
      </button>
      <span className='mt-3 inline-block px-3'>
        Страница {currentPage} из {totalPages}
      </span>
      <button onClick={handleNextClick} disabled={currentPage === totalPages} className='border py-2 px-4'>
        Вперед
      </button>
    </div>
  )
}

export default Pagination;

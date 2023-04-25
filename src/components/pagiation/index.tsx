import { NavButtons } from './navButtons';

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalProducts,
}: {
  currentPage: any;
  totalPages: any;
  onPageChange: any;
  totalProducts: any;
}) {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      {/* адаптивные кнопки вперед-назад */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() =>
            onPageChange(currentPage !== 1 ? currentPage - 1 : currentPage)
          }
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Назад
        </button>
        <button
          onClick={() =>
            onPageChange(
              currentPage !== totalPages ? currentPage + 1 : totalPages
            )
          }
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Вперед
        </button>
      </div>
      {/* блок с информацией и пагинацией */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Страница <span className="font-medium">{currentPage}</span> из{' '}
            <span className="font-medium">{totalPages}.</span> Количество
            товаров: <span className="font-medium">{totalProducts}</span>
          </p>
        </div>
        <div>
          <NavButtons
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Pagination;

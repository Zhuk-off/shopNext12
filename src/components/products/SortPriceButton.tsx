import { useContext } from 'react';
import { ControlBarContext } from '../pagiation/productsList';
import { SortPrice } from '@/src/interfaces/productsView.interface';

export const SortPriceButton = () => {
  const { controlBar, setControlBars } = useContext(ControlBarContext);

  const sortPrice = controlBar.sortPrice;
  const toggleSortPrice = () => {
    let sort: SortPrice = '';
    if (sortPrice === '') {
      sort = 'ASC';
    } else if (sortPrice === 'ASC') {
      sort = 'DESC';
    } else if (sortPrice === 'DESC') {
      sort = '';
    }
    setControlBars((prevState) => ({
      ...prevState, // сохраняем предыдущее состояние объекта
      sortPrice: sort,
      sortName: '', // чтобы реализовать переключатель
    }));
  };

  return (
    <button
      title="Сортировать по цене"
      className="mr-2 text-blue-500 underline hover:text-red-500"
      onClick={toggleSortPrice}
    >
      {sortPrice === 'DESC' ? (
        <span className="flex items-center">цене{svgArrowDown}</span>
      ) : sortPrice !== '' ? (
        <span className="flex items-center">цене{svgArrowUp}</span>
      ) : (
        <span className="flex items-center">цене{svgArrowNone}</span>
      )}
    </button>
  );
};

// Изображения svg
const svgArrowUp = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    className="h-4 w-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18"
    />
  </svg>
);
const svgArrowDown = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    className="h-4 w-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3"
    />
  </svg>
);

const svgArrowNone = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    className="h-4 w-4"
  ></svg>
);

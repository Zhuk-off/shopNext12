import { useContext } from 'react';
import { SortName } from '@/src/interfaces/productsView.interface';
import { ControlBarContext } from '@/src/contex/ControlBarContext';

export const SortNameButton = () => {
  const { controlBar, setControlBars } = useContext(ControlBarContext);

  const sortName = controlBar.sortName;
  const toggleSortPrice = () => {
    let sort: SortName = '';
    if (sortName === '') {
      sort = 'ASC';
    } else if (sortName === 'ASC') {
      sort = 'DESC';
    } else if (sortName === 'DESC') {
      sort = '';
    }

    setControlBars((prevState) => ({
      ...prevState, // сохраняем предыдущее состояние объекта
      sortName: sort,
      sortPrice: '', // чтобы реализовать переключатель
    }));
  };

  return (
    <button
      title="Сортировать по названию"
      className="mr-2 text-blue-500 underline hover:text-red-500"
      onClick={toggleSortPrice}
    >
      {sortName === 'DESC' ? (
        <span className="flex items-center">названию{svgArrowDown}</span>
      ) : sortName !== '' ? (
        <span className="flex items-center">названию{svgArrowUp}</span>
      ) : (
        <span className="flex items-center">названию{svgArrowNone}</span>
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
    strokeWidth="1.5"
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
    strokeWidth="1.5"
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

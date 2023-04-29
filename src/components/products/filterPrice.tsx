import { useContext, useState } from 'react';
import { ControlBarContext } from '../pagiation/productsList';
import { SortPrice } from '@/src/interfaces/productsView.interface';

export const FilterPrice = () => {
  const { controlBar, setControlBars } = useContext(ControlBarContext);
  const [minPrice, setMinPrice] = useState<number | null | undefined | string>(
    controlBar.minPrice
  );
  const [maxPrice, setMaxPrice] = useState<number | null | undefined | string>(
    controlBar.maxPrice
  );

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.replace(',', '.'); // заменяем запятые на точки
    setMinPrice(input);
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.replace(',', '.'); // заменяем запятые на точки
    setMaxPrice(input);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // преобразование в число или null значений input
    let minPriceNumber: number | null = null;
    let maxPriceNumber: number | null = null;
    if (typeof minPrice === 'string') {
      minPriceNumber = parseFloat(minPrice);
    } else if (typeof minPrice === 'number') {
      minPriceNumber = minPrice;
    }
    if (typeof maxPrice === 'string') {
      maxPriceNumber = parseFloat(maxPrice);
    } else if (typeof maxPrice === 'number') {
      maxPriceNumber = maxPrice;
    }

    // отправляем запрос с минимальной и максимальной ценами
    setControlBars((prevState) => ({
      ...prevState,
      minPrice: minPriceNumber,
      maxPrice: maxPriceNumber,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center mx-2 flex-col md:flex-row gap-2 justify-items-center">
        <span className='block'>Цена</span>
      <label className="text-base" htmlFor="minPrice">
        <span className='pr-2'>от</span>
        <input
          type="text"
          value={minPrice ? minPrice : ''}
          onChange={handleMinPriceChange}
          className="w-32 rounded-md border border-gray-400 px-2 py-1 focus:outline-none focus:ring-gray-400"
        />
      </label>
      <label className="text-base mx-2 " htmlFor="maxPrice">
        <span className='pr-2'>до</span>
        <input
          value={maxPrice ? maxPrice : ''}
          onChange={handleMaxPriceChange}
          className="w-32 rounded-md border border-gray-400 px-2 py-1 focus:outline-none focus:ring-gray-400"
        />
      </label>
      <button
        type="submit"
        className="rounded-full border mx-2 bg-pink-700 px-6 py-1 font-medium text-white transition hover:bg-pink-800 hover:text-white focus:outline-none"
      >
        Применить
      </button>
    </form>
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
      stroke-linecap="round"
      stroke-linejoin="round"
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
      stroke-linecap="round"
      stroke-linejoin="round"
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

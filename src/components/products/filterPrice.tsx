import { useContext, useState } from 'react';
import { SortPrice } from '@/src/interfaces/productsView.interface';
import { ControlBarContext } from '@/src/contex/ControlBarContext';

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

  // console.log(controlBar);

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-2 flex flex-col items-center justify-items-center gap-2 lg:flex-row"
    >
      <span className="block">Цена</span>
      <label className="flex items-center text-base" htmlFor="minPrice">
        <span className="pr-2">от</span>
        <input
          type="text"
          value={minPrice ? minPrice : ''}
          onChange={handleMinPriceChange}
          className="w-32 rounded-md border border-gray-400 px-2 py-1 focus:outline-none focus:ring-gray-400"
        />
      </label>
      <label className="mx-2 flex items-center text-base" htmlFor="maxPrice">
        <span className="pr-2">до</span>
        <input
          value={maxPrice ? maxPrice : ''}
          onChange={handleMaxPriceChange}
          className="w-32 rounded-md border border-gray-400 px-2 py-1 focus:outline-none focus:ring-gray-400"
        />
      </label>
      <button
        type="submit"
        className="mx-2 rounded-full border bg-pink-700 px-6 py-1 font-medium text-white transition hover:bg-pink-800 hover:text-white focus:outline-none"
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

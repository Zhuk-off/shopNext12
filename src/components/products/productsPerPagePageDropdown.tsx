import { useContext } from 'react';
import { isPerPage } from '@/src/utils/helpers';
import { ControlBarContext } from '@/src/contex/ControlBarContext';

export default function ProductsPerPageDropdown() {
  const { controlBar, setControlBars } = useContext(ControlBarContext);

  const handleNumProductsChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const perPage = Number(event.target.value);
    if (isPerPage(perPage)) {
      setControlBars((prevState) => ({
        ...prevState,
        productsPerPage: perPage,
      }));
    } else {
      console.error(
        'Нарушение типов PerPage в компоненте ProductsPerPageDropdown'
      );
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="my-4">
        <label htmlFor="num-products-select" className="mr-2">
          Количество товаров:
        </label>
        <select
          id="num-products-select"
          className="cursor-pointer rounded border border-gray-400 p-1 transition-all duration-300 ease-in-out hover:bg-gray-100 focus:outline-none focus:ring-gray-400"
          value={controlBar.productsPerPage}
          onChange={handleNumProductsChange}
        >
          <option value={12}>12</option>
          <option value={24}>24</option>
          <option value={48}>48</option>
          <option value={96}>96</option>
        </select>
      </div>

      {/* здесь будет вывод списка товаров */}
    </div>
  );
}

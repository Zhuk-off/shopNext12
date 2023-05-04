import { CartContext } from '@/src/contex/CartContex';
import { addToCart } from '@/src/utils/cart';
import { useContext, useEffect, useState } from 'react';

export const ProductQuantity = ({
  id,
  databaseId,
}: {
  id: string;
  databaseId: number;
}) => {
  const [cart, setCart] = useContext(CartContext);
  const count = cart?.cartItems.find((item) => item.id === id)?.quantity ?? 1;
  const [inputCount, setInputCount] = useState(count ? count.toString() : '0');

  useEffect(() => {
    setInputCount(count.toString());
  }, [count]);

  const handleInput = (value: string) => {
    setInputCount(value);
  };

  // инкремент и декремент
  const handleTotal = (countNew: number) => {
    console.log('handleTotal', countNew);
    if (count === 1 && countNew === -1) return;
    if (count === 9999 && countNew === 1) return;
    addToCart(id, countNew, databaseId, cart, setCart);
  };

  // обриботка input
  const handleTotalForInput = (countNew: string) => {
    // прасим в число
    const newCountParse = parseInt(countNew);
    // проверяем число ли
    const newCountValidate = isNaN(newCountParse) ? 1 : newCountParse;
    // устанавливаем лимиты на ввод
    const newCountValidateLimit =
      newCountValidate < 1
        ? 1
        : newCountValidate > 9999
        ? 9999
        : newCountValidate;
    // чтобы не оставалось пустое поле в случае если input = ''
    if (isNaN(newCountParse)) {
      setInputCount('1');
    }
    // проверяем изменилось ли значение
    const countNewDifference = newCountValidateLimit - count;
    if (countNewDifference === 0) return;
    addToCart(id, countNewDifference, databaseId, cart, setCart);
  };

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      handleTotalForInput(inputCount);
    }
  }

  return (
    <div>
      <div className="flex">
        <button
          className="rounded-full border"
          type="button"
          onClick={() => handleTotal(-1)}
        >
          <div className="">
            <span>{svgMinus}</span>
          </div>
        </button>
        <input
          className="w-10 text-center focus:outline-none"
          type="number"
          max="9999"
          min="1"
          value={inputCount}
          onChange={(e) => handleInput(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => handleTotalForInput(inputCount)}
        />
        <button
          className="rounded-full border"
          type="button"
          onClick={() => handleTotal(1)}
        >
          <div>
            <span>{svgPlus}</span>
          </div>
        </button>
      </div>
    </div>
  );
};

const svgMinus = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    data-testid="icon"
    className=""
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      d="M7 12H17"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    ></path>
  </svg>
);

const svgPlus = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    data-testid="icon"
    className=""
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.8 6.99995C12.8 6.55812 12.4418 6.19995 12 6.19995C11.5581 6.19995 11.2 6.55812 11.2 6.99995V11.2H6.99995C6.55812 11.2 6.19995 11.5581 6.19995 12C6.19995 12.4418 6.55812 12.8 6.99995 12.8H11.2V17C11.2 17.4418 11.5581 17.8 12 17.8C12.4418 17.8 12.8 17.4418 12.8 17V12.8H17C17.4418 12.8 17.8 12.4418 17.8 12C17.8 11.5581 17.4418 11.2 17 11.2H12.8V6.99995Z"
      fill="currentColor"
    ></path>
  </svg>
);

import { CartContext } from '@/src/contex/CartContex';
import { useContext, useEffect, useState } from 'react';
import { addToCart } from '@/src/utils/cart';
import classNames from 'classnames';
import { useRouter } from 'next/router';

type buttonStatus = 'enable' | 'disable';

export const CartAddButton = ({
  buttonStatus,
  idProduct,
  databaseId,
}: {
  buttonStatus: buttonStatus;
  idProduct: string;
  databaseId: number;
}) => {
  const [cart, setCart] = useContext(CartContext);
  const [isAddedToCart, setIsAddedToCart] = useState(false); // нужно для показа рядом кнопки посмотреть в корзине, чтобы он мог кликнуть по ней и перейди в корзину
  const [loading, setLoading] = useState(false); // для показа того, что товар добавляется в корзину
  const router = useRouter();

  useEffect(() => {
    if (cart !== null) {
      const isIdExist = cart.cartItems.some(
        (item) => item.id === idProduct && item.quantity > 0
      );
      setIsAddedToCart(isIdExist);
    }
  }, [cart, idProduct]);

  return (
    <>
      {buttonStatus === 'enable' ? (
        <button
          className={classNames(
            'flex-shrink-0 whitespace-nowrap rounded border-2 border-pink-800 px-4 py-2 transition',
            {
              'font-medium text-pink-700 hover:border-pink-800 hover:text-pink-800':
                isAddedToCart,
              'bg-[#CE041F] text-white hover:border-pink-800 hover:bg-[#A41F30]':
                !isAddedToCart,
            }
          )}
          onClick={() =>
            !isAddedToCart
              ? addToCart(
                  idProduct,
                  1,
                  databaseId,
                  cart,
                  setCart,
                  setIsAddedToCart,
                  setLoading
                )
              : router.push('/order')
          }
        >
          {isAddedToCart ? 'В корзине' : 'В корзину'}
        </button>
      ) : (
        <button
          disabled
          className="flex-shrink-0 whitespace-nowrap rounded bg-gray-300 px-4 py-2 text-white transition"
        >
          В корзину
        </button>
      )}
    </>
  );
};

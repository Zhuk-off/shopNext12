import { CartContext } from '@/src/contex/CartCounter';
import { useContext, useEffect, useState } from 'react';
import cx from 'classnames';
import { addToCart } from '@/src/utils/cart';
import classNames from 'classnames';

type buttonStatus = 'enable' | 'disable';

export const CartAddButton = ({
  buttonStatus,
  idProduct,
}: {
  buttonStatus: buttonStatus;
  idProduct: string;
}) => {
  const [cart, setCart] = useContext(CartContext);
  const [isAddedToCart, setIsAddedToCart] = useState(false); // нужно для показа рядом кнопки посмотреть в корзине, чтобы он мог кликнуть по ней и перейди в корзину
  const [loading, setLoading] = useState(false); // для показа того, что товар добавляется в корзину

  useEffect(() => {
    if (cart !== null) {
      const isIdExist = cart.cartItems.some((item) => item.id === idProduct);
      setIsAddedToCart(isIdExist);
    }
  }, [cart, idProduct]);

  return (
    <>
      {buttonStatus === 'enable' ? (
        <button
          className={classNames(
            'flex-shrink-0 rounded border-2 border-pink-700 px-4 py-2 transition',
            {
              'font-medium text-pink-700 hover:border-pink-800 hover:text-pink-800':
                isAddedToCart,
              'bg-pink-700 text-white hover:border-pink-800 hover:bg-pink-800':
                !isAddedToCart,
            }
          )}
          onClick={() =>
            !isAddedToCart
              ? addToCart(
                  idProduct,
                  1,
                  cart,
                  setCart,
                  setIsAddedToCart,
                  setLoading
                )
              : {}
          }
        >
          {isAddedToCart ? 'В корзине' : 'В корзину'}
        </button>
      ) : (
        <button
          disabled
          className="flex-shrink-0 rounded bg-gray-300 px-4 py-2 text-white transition"
        >
          В корзину
        </button>
      )}
    </>
  );
};

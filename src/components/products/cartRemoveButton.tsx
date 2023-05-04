import { CartContext } from '@/src/contex/CartContex';
import { useContext, useState } from 'react';
import { addToCart } from '@/src/utils/cart';

export const CartRemoveButton = ({
  idProduct,
  databaseId,
  productQuantity,
}: {
  idProduct: string;
  databaseId: number;
  productQuantity: number;
}) => {
  const [cart, setCart] = useContext(CartContext);
  const [isAddedToCart, setIsAddedToCart] = useState(false); // нужно для показа рядом кнопки посмотреть в корзине, чтобы он мог кликнуть по ней и перейди в корзину
  const [loading, setLoading] = useState(false); // для показа того, что товар добавляется в корзину
  const count = -Math.abs(productQuantity);

  return (
    <>
      <button
        className="border"
        onClick={() =>
          addToCart(
            idProduct,
            count,
            databaseId,
            cart,
            setCart,
            setIsAddedToCart,
            setLoading
          )
        }
      >
        Удалить
      </button>
    </>
  );
};

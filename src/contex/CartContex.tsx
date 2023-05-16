import { useState, useEffect, createContext, ReactNode } from 'react';
import { ICart, ICartLocalStorage } from '../interfaces/cart.interface';
import { updateContextLocalStorage } from '../utils/cart/updateContextLocalStorage';
import { cartVar } from '../utils/apollo/reactiveVar';
import { useReactiveVar } from '@apollo/client';

type CartContextType = [
  ICartLocalStorage | null,
  (cart: ICartLocalStorage) => void
];

const context: [ICartLocalStorage, (cart: ICartLocalStorage) => void] = [
  { cartItems: [], totalPrice: 0, totalQty: 0 },
  (): void => {},
];

export const CartContext = createContext<CartContextType>(context);

export const CartCountProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<ICartLocalStorage | null>(null);
  const cartA= useReactiveVar(cartVar)


  /**
   * This will be called once on initial load ( component mount ).
   *
   * Sets the cart data from localStorage to `cart` in the context.
   */
  // console.log('contex');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cartData = localStorage.getItem('cartItems');
      // console.log('cartData', cartData);

      const parsedCartData = cartData !== null ? JSON.parse(cartData) : null;
      // console.log('parsedCartData', parsedCartData);
      setCart(parsedCartData);
      if (parsedCartData) {
        cartVar(parsedCartData); //запись в переменную аполло
      }
    }
  }, []);

  /**
   * 1.When setCart() is called that changes the value of 'cart',
   * this will set the new data in the localStorage.
   *
   * 2.The 'cart' will anyways have the new data, as setCart()
   * would have set that.
   */
  useEffect(() => {
    if (typeof window !== 'undefined' && cart !== null) {
      localStorage.setItem('cartItems', JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    if (typeof window !== 'undefined' && cartA !== null) {
      localStorage.setItem('cartItemsA', JSON.stringify(cartA));
    }
  }, [cartA]);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

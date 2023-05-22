import {
  ICart,
  ICartItemLocalStorage,
  ICartLocalStorage,
} from '@/src/interfaces/cart.interface';
import { getApiCartConfig } from './api';
import { getSession, storeSession } from './session';
import { Dispatch, SetStateAction } from 'react';
import { addItem } from '../helpers';
import { updateContextLocalStorage } from './updateContextLocalStorage';
import { makeVar } from '@apollo/client';
import { cartVar } from '../apollo/reactiveVar';

export const addToCart = async (
  productId: string,
  qty: number = 1,
  databaseId: number,
  cart: ICartLocalStorage | null,
  setCart: (cart: ICartLocalStorage) => void,
  setIsAddedToCart?: Dispatch<SetStateAction<boolean>>,
  setLoading?: Dispatch<SetStateAction<boolean>>
) => {
  // const storedSession = getSession();
  // const addOrViewCartConfig = getApiCartConfig();

  const productForAdd: ICartItemLocalStorage = {
    id: productId,
    quantity: qty,
    databaseId,
  };
  // console.log('databaseId',databaseId);

  const localStorageData = localStorage.getItem('cartItems');
  const parsedLocalStorageData =
    localStorageData !== null ? JSON.parse(localStorageData) : null;

  if (setLoading !== undefined) setLoading(true);
  // updateContextLocalStorage(cart,setCart)

  if (cart === null) {
    const cartLocalStorageNew: ICartLocalStorage = {
      cartItems: [productForAdd],
      totalPrice: 0,
      sync:false,
      totalQty: productForAdd.quantity,
    };
    if (parsedLocalStorageData === null) {
      cartVar(cartLocalStorageNew); //запись в переменную аполло
      setCart(cartLocalStorageNew);
    } else {
      cartVar(parsedLocalStorageData); //запись в переменную аполло
      setCart(parsedLocalStorageData);
    }
  } else {
    const cartLocalStorage: ICartLocalStorage = {
      ...parsedLocalStorageData,
    };
    console.log('cartLocalStorage', cartLocalStorage);

    const cartItemsUpdated = addItem(cartLocalStorage.cartItems, productForAdd);
    const totalQuantity = cartItemsUpdated.reduce(
      (accumulator, currentItem) => accumulator + currentItem.quantity,
      0
    );

    const cartLocalStorageUpdate: ICartLocalStorage = {
      ...cartLocalStorage,
      cartItems: cartItemsUpdated,
      sync:false,
      totalQty: totalQuantity,
    };
    console.log('cartLocalStorageUpdate', cartLocalStorageUpdate);

    cartVar(cartLocalStorageUpdate); //запись в переменную аполло
    setCart(cartLocalStorageUpdate);
  }

  if (setIsAddedToCart !== undefined) setIsAddedToCart(true);
  if (setLoading !== undefined) setLoading(false);
};

/**
 * View Cart Request Handler
 * тут мы хотим посчитать общую сумму корзины
 */
// export const viewCart = (): void => {
//   const addOrViewCartConfig = getApiCartConfig();

//   axios
//     .get(CART_ENDPOINT, addOrViewCartConfig)
//     .then((res: AxiosResponse<ICartItem[]>) => {
//       // if (formattedCartData) {
//       //   setCart(formattedCartData);
//       // }
//     })
//     .catch((err) => {
//       console.log('err', err);
//     });
// };

/**
 * View Cart Request Handler
 * тут мы хотим посчитать общую сумму корзины
 */
// export const viewCart = (
//   setCart: (cart: ICartLocalStorage) => void,
//   setProcessing: any = (toggle: boolean) => {}
// ): void => {
//   const addOrViewCartConfig = getApiCartConfig();

//   setCart();
// axios
//   .get(CART_ENDPOINT, addOrViewCartConfig)
//   .then((res: AxiosResponse<ICartItem[]>) => {
//     const formattedCartData = getFormattedCartData(res?.data ?? []);
//     if (formattedCartData) {
//       setCart(formattedCartData);
//     }
//     // if (formattedCartData) {
//     //   setCart(formattedCartData);
//     // }
//     setProcessing(false);
//   })
//   .catch((err) => {
//     console.log('err', err);
//     setProcessing(false);
//   });
// };

// /**
//  * Update Cart Request Handler
//  */
// export const updateCart = (
//   cartKey: string,
//   qty: number = 1,
//   setCart: (cart: ICart) => void,
//   setUpdatingProductProcess: React.Dispatch<React.SetStateAction<boolean>>
// ): void => {
//   const addOrViewCartConfig = getApiCartConfig();

//   setUpdatingProductProcess(true);

//   axios
//     .put(
//       `${CART_ENDPOINT}${cartKey}`,
//       {
//         quantity: qty,
//       },
//       addOrViewCartConfig
//     )
//     .then((res: AxiosResponse<ICartItem>) => {
//       viewCart(setCart, setUpdatingProductProcess);
//     })
//     .catch((err) => {
//       console.log('err', err);
//       setUpdatingProductProcess(false);
//     });
// };

// /**
//  * Delete a cart item Request handler.
//  *
//  * Deletes all products in the cart of a
//  * specific product id ( by its cart key )
//  * In a cart session, each product maintains
//  * its data( qty etc ) with a specific cart key
//  *
//  * @param {String} cartKey Cart Key.
//  * @param {Function} setCart SetCart Function.
//  * @param {Function} setRemovingProduct Set Removing Product Function.
//  */
// export const deleteCartItem = (
//   cartKey: string,
//   setCart: (cart: ICart) => void,
//   setRemovingProduct: React.Dispatch<React.SetStateAction<boolean>>
// ): void => {
//   const addOrViewCartConfig = getApiCartConfig();

//   setRemovingProduct(true);

//   axios
//     .delete(`${CART_ENDPOINT}${cartKey}`, addOrViewCartConfig)
//     .then((res: AxiosResponse<ICartItem>) => {
//       viewCart(setCart, setRemovingProduct);
//     })
//     .catch((err) => {
//       console.log('err', err);
//       setRemovingProduct(false);
//     });
// };

// /**
//  * Clear Cart Request Handler
//  *
//  * @param {Function} setCart Set Cart
//  * @param {Function} setClearCartProcessing Set Clear Cart Processing.
//  */
// export const clearCart = async (
//   setCart: (cart: ICart) => void,
//   setClearCartProcessing: Dispatch<React.SetStateAction<boolean>>
// ): Promise<void> => {
//   setClearCartProcessing(true);

//   const addOrViewCartConfig = getApiCartConfig();

//   try {
//     const response = await axios.delete(CART_ENDPOINT, addOrViewCartConfig);
//     viewCart(setCart, setClearCartProcessing);
//   } catch (err) {
//     console.log('err', err);
//     setClearCartProcessing(false);
//   }
// };

// // Returns to us the object of goods in the basket, supplemented by the total number and sum
// /**
//  * Get Formatted Cart Data.
//  *
//  * @param cartData
//  * @return {null|{cartTotal: {totalQty: number, totalPrice: number}, cartItems: ({length}|*|*[])}}
//  */
// const getFormattedCartData = (cartData: ICartItem[]): ICart | null => {
//   if (!cartData || !cartData.length) {
//     return null;
//   }
//   const cartTotal = calculateCartQtyAndPrice(cartData || []);
//   return {
//     cartItems: cartData || [],
//     ...cartTotal,
//   };
// };

// /**
//  * Calculate Cart Qty And Price
//  *
//  * @param cartItems
//  * @return {{totalQty: number, totalPrice: number}}
//  */

// // cartItems - An array of basket elements
// const calculateCartQtyAndPrice = (cartItems: ICartItem[]): IQtyAndPrice => {
//   const qtyAndPrice: IQtyAndPrice = {
//     totalQty: 0, 
//     totalPrice: 0,
//   };

//   if (!Array.isArray(cartItems) || !cartItems.length) {
//     return qtyAndPrice;
//   }

//   // We run through all the elements of the basket and consider the whole amount and the entire amountunt and the entire amount
//   cartItems.forEach((item, index) => {
//     qtyAndPrice.totalQty += item?.quantity ?? 0;
//     qtyAndPrice.totalPrice += item?.line_total ?? 0;
//   });

//   return qtyAndPrice;
// };

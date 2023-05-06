/**
 * Add To Cart Request Handler.
 *
 * @param {int} productId Product Id.
 * @param {int} qty Product Quantity.
 * @param {Function} setCart
 * @param {Function} setIsAddedToCart
 * @param {Function} setLoading
 *
 */

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

  const addProductToCart: ICartItemLocalStorage = {
    id: productId,
    quantity: qty,
    databaseId,
  };
  // console.log('databaseId',databaseId);

  if (setLoading !== undefined) setLoading(true);
  // updateContextLocalStorage(cart,setCart)
  const cartItemsLocalStorage = cart;
  if (cartItemsLocalStorage === null) {
    const cartLocalStorageNew: ICartLocalStorage = {
      cartItems: [addProductToCart],
      totalPrice: 0,
      totalQty: addProductToCart.quantity,
    };
    setCart(cartLocalStorageNew);
  } else {
    const cartLocalStorageUpdate: ICartLocalStorage = { ...cartItemsLocalStorage };
    addItem(cartLocalStorageUpdate.cartItems, addProductToCart);
    const totalQuantity = cartLocalStorageUpdate.cartItems.reduce(
      (accumulator, currentItem) => accumulator + currentItem.quantity,
      0
    );
    cartLocalStorageUpdate.totalQty = totalQuantity;
    setCart(cartLocalStorageUpdate);
  }
  if (setIsAddedToCart !== undefined) setIsAddedToCart(true);
  if (setLoading !== undefined) setLoading(false);
};

export const removeFromCart = async (
  productId: string,
  cart: ICartLocalStorage | null,
  setCart: (cart: ICartLocalStorage) => void,
  setIsRemovedToCart?: Dispatch<SetStateAction<boolean>>,
  setLoading?: Dispatch<SetStateAction<boolean>>
) => {
  if (setLoading !== undefined) setLoading(true);
  const cartItemsLocalStorage = cart;

  if (cartItemsLocalStorage === null) {
    return;
  } else {
    const cartLocalStorage: ICartLocalStorage = { ...cartItemsLocalStorage };
    // console.log('cartLocalStorage sta',cartLocalStorage);

    const index = cartLocalStorage.cartItems.findIndex(
      (item) => item.id === productId
    );
    if (index !== -1) {
      cartLocalStorage.cartItems.splice(index, 1);
      const totalQuantity = cartLocalStorage.cartItems.reduce(
        (accumulator, currentItem) => accumulator + currentItem.quantity,
        0
      );
      // console.log('cartLocalStorage end',cartLocalStorage);
      
      cartLocalStorage.totalQty = totalQuantity;
      // console.log('cartLocalStorage totalQuantity end',totalQuantity);

      setCart(cartLocalStorage);
    }
  }
  if (setIsRemovedToCart !== undefined) setIsRemovedToCart(false);
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

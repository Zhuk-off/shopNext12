// // 'use client';
// import axios, { AxiosResponse } from 'axios';
// import { Dispatch, SetStateAction } from 'react';
// import {
//   ICart,
//   ICartItem,
//   IQtyAndPrice,
// } from '../../interfaces/cart.interface';
// import cookie from 'cookie';

// import { getApiCartConfig } from './api';
// import { getSession, storeSession } from './session';
// import { CART_ENDPOINT } from '../constants/endpoints';
// import { IQProductsMainPage } from '@/app/interfaces/queries.interface';
// import {
//   ADD_TO_CART,
//   GET_PRODUCTS_QUERY,
// } from '@/app/api/apolloClientQuery/query';
// import { getClient } from '../apollo/apolloClient';

// /**
//  * Add To Cart Request Handler.
//  *
//  * @param {int} productId Product Id.
//  * @param {int} qty Product Quantity.
//  * @param {Function} setCart
//  * @param {Function} setIsAddedToCart
//  * @param {Function} setLoading
//  *
//  */

// export const addToCart = async (
//   productId: number,
//   qty: number = 1
//   // setCart: (cart: ICart) => void,
//   // setIsAddedToCart: Dispatch<SetStateAction<boolean>>,
//   // setLoading: Dispatch<SetStateAction<boolean>>
// ) => {
//   const storedSession = getSession();
//   const addOrViewCartConfig = getApiCartConfig();
//   // console.log('storedSession', storedSession);
//   // console.log('CART_ENDPOINT', CART_ENDPOINT);
//   // console.log('product_id', productId);
//   // console.log('quantity', qty);
//   // console.log('addOrViewCartConfig', addOrViewCartConfig);

//   // setLoading(true);

//   // const headers = { 'Content-Type': 'application/json' };
//   // if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
//   //   headers[
//   //     'Authorization'
//   //   ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
//   // }

//   const client = getClient();
//   const { data: cart } = await client.mutate({
//     mutation: ADD_TO_CART,
//   });

//   const { data: newData }: { data: IQProductsMainPage } = await client.query({
//     query: GET_PRODUCTS_QUERY,
//   });

//   // console.log('Apollo', data);

//   axios
//     .post(
//       CART_ENDPOINT,
//       {
//         product_id: productId,
//         quantity: qty,
//       },
//       addOrViewCartConfig
//     )
//     .then((res: AxiosResponse<ICartItem>) => {
//       if (
//         !storedSession ||
//         !storedSession.length ||
//         storedSession.length !== 0
//       ) {
//         storeSession(res?.headers?.['x-wc-session']);
//         console.log(
//           'res?.headers?.["x-wc-session"]',
//           res?.headers?.['x-wc-session']
//         );
//       }
//       // setIsAddedToCart(true);
//       // setLoading(false);
//       // viewCart(setCart);
//       viewCart();
//     })
//     .catch((err) => {
//       // setLoading(false);
//       console.log('err', err);
//     });
// };

// /**
//  * View Cart Request Handler
//  * тут мы хотим посчитать общую сумму корзины
//  */
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

// // /**
// //  * View Cart Request Handler
// //  * тут мы хотим посчитать общую сумму корзины
// //  */
// // export const viewCart = (
// //   setCart: (cart: ICart) => void,
// //   setProcessing: any = (toggle: boolean) => {}
// // ): void => {
// //   const addOrViewCartConfig = getApiCartConfig();

// //   axios
// //     .get(CART_ENDPOINT, addOrViewCartConfig)
// //     .then((res: AxiosResponse<ICartItem[]>) => {
// //       const formattedCartData = getFormattedCartData(res?.data ?? []);
// //       if (formattedCartData) {
// //         setCart(formattedCartData);
// //       }
// //       // if (formattedCartData) {
// //       //   setCart(formattedCartData);
// //       // }
// //       setProcessing(false);
// //     })
// //     .catch((err) => {
// //       console.log('err', err);
// //       setProcessing(false);
// //     });
// // };

// // /**
// //  * Update Cart Request Handler
// //  */
// // export const updateCart = (
// //   cartKey: string,
// //   qty: number = 1,
// //   setCart: (cart: ICart) => void,
// //   setUpdatingProductProcess: React.Dispatch<React.SetStateAction<boolean>>
// // ): void => {
// //   const addOrViewCartConfig = getApiCartConfig();

// //   setUpdatingProductProcess(true);

// //   axios
// //     .put(
// //       `${CART_ENDPOINT}${cartKey}`,
// //       {
// //         quantity: qty,
// //       },
// //       addOrViewCartConfig
// //     )
// //     .then((res: AxiosResponse<ICartItem>) => {
// //       viewCart(setCart, setUpdatingProductProcess);
// //     })
// //     .catch((err) => {
// //       console.log('err', err);
// //       setUpdatingProductProcess(false);
// //     });
// // };

// // /**
// //  * Delete a cart item Request handler.
// //  *
// //  * Deletes all products in the cart of a
// //  * specific product id ( by its cart key )
// //  * In a cart session, each product maintains
// //  * its data( qty etc ) with a specific cart key
// //  *
// //  * @param {String} cartKey Cart Key.
// //  * @param {Function} setCart SetCart Function.
// //  * @param {Function} setRemovingProduct Set Removing Product Function.
// //  */
// // export const deleteCartItem = (
// //   cartKey: string,
// //   setCart: (cart: ICart) => void,
// //   setRemovingProduct: React.Dispatch<React.SetStateAction<boolean>>
// // ): void => {
// //   const addOrViewCartConfig = getApiCartConfig();

// //   setRemovingProduct(true);

// //   axios
// //     .delete(`${CART_ENDPOINT}${cartKey}`, addOrViewCartConfig)
// //     .then((res: AxiosResponse<ICartItem>) => {
// //       viewCart(setCart, setRemovingProduct);
// //     })
// //     .catch((err) => {
// //       console.log('err', err);
// //       setRemovingProduct(false);
// //     });
// // };

// // /**
// //  * Clear Cart Request Handler
// //  *
// //  * @param {Function} setCart Set Cart
// //  * @param {Function} setClearCartProcessing Set Clear Cart Processing.
// //  */
// // export const clearCart = async (
// //   setCart: (cart: ICart) => void,
// //   setClearCartProcessing: Dispatch<React.SetStateAction<boolean>>
// // ): Promise<void> => {
// //   setClearCartProcessing(true);

// //   const addOrViewCartConfig = getApiCartConfig();

// //   try {
// //     const response = await axios.delete(CART_ENDPOINT, addOrViewCartConfig);
// //     viewCart(setCart, setClearCartProcessing);
// //   } catch (err) {
// //     console.log('err', err);
// //     setClearCartProcessing(false);
// //   }
// // };

// // // Returns to us the object of goods in the basket, supplemented by the total number and sum
// // /**
// //  * Get Formatted Cart Data.
// //  *
// //  * @param cartData
// //  * @return {null|{cartTotal: {totalQty: number, totalPrice: number}, cartItems: ({length}|*|*[])}}
// //  */
// // const getFormattedCartData = (cartData: ICartItem[]): ICart | null => {
// //   if (!cartData || !cartData.length) {
// //     return null;
// //   }
// //   const cartTotal = calculateCartQtyAndPrice(cartData || []);
// //   return {
// //     cartItems: cartData || [],
// //     ...cartTotal,
// //   };
// // };

// // /**
// //  * Calculate Cart Qty And Price
// //  *
// //  * @param cartItems
// //  * @return {{totalQty: number, totalPrice: number}}
// //  */

// // // cartItems - An array of basket elements
// // const calculateCartQtyAndPrice = (cartItems: ICartItem[]): IQtyAndPrice => {
// //   const qtyAndPrice: IQtyAndPrice = {
// //     totalQty: 0,
// //     totalPrice: 0,
// //   };

// //   if (!Array.isArray(cartItems) || !cartItems.length) {
// //     return qtyAndPrice;
// //   }

// //   // We run through all the elements of the basket and consider the whole amount and the entire amountunt and the entire amount
// //   cartItems.forEach((item, index) => {
// //     qtyAndPrice.totalQty += item?.quantity ?? 0;
// //     qtyAndPrice.totalPrice += item?.line_total ?? 0;
// //   });

// //   return qtyAndPrice;
// // };

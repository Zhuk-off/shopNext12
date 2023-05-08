import { ICartLocalStorage } from '@/src/interfaces/cart.interface';

export const updateContextLocalStorage = (
  cart: ICartLocalStorage | null,
  setCart: (cart: ICartLocalStorage) => void
) => {
  // console.log('updateContextLocalStorage');
  
  if (typeof window !== 'undefined' && cart) {
  // console.log('typeof window !== undefined && cart');

    const getlocalStorage = localStorage.getItem('cartItems');
    const localStorageParsed =
      getlocalStorage !== null ? JSON.parse(getlocalStorage) : null;
    /** если количество равно в контексте и в localStorage, то обноляем контекст
     * это может произойти если в соседней вкладке добавили товары, а в корзине
     * не обновили. Чтобы не перезаписать корзину старвыми данными нужна эта проверка
     */
  // console.log('localStorageParsed',localStorageParsed);
  // console.log('localStorageParsed.totalQty',localStorageParsed.totalQty);
  // console.log('cart.totalQty',cart.totalQty);

    if (localStorageParsed.totalQty !== cart.totalQty && localStorageParsed) {
  // console.log('localStorageParsed.totalQty !== cart.totalQty');
      
      setCart(localStorageParsed);
    }
  }
};

import { ICartLocalStorage } from '@/src/interfaces/cart.interface';
import { makeVar } from '@apollo/client';

// Тестирование реактивных переменных аполло
export const cartVar = makeVar<ICartLocalStorage>({
  cartItems: [],
  totalPrice: 0,
  totalQty: 0,
});

import { CartContext } from '@/src/contex/CartCounter';
import { useContext } from 'react';

export const CounterOrderPage = () => {
  const [cart] = useContext(CartContext);

  return <>{cart ? cart?.totalQty : null}</>;
};

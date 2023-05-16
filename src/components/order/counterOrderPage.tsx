import { cartVar } from '@/src/utils/apollo/reactiveVar';
import { useReactiveVar } from '@apollo/client';

export const CounterOrderPage = () => {
  const cartA = useReactiveVar(cartVar);
  return <>{cartA.totalQty}</>;
};

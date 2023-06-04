import { IPproductsDataOrder } from '@/src/interfaces/cart.interface';
import { CartOrderItem } from '@/src/components/order/cartOrderItem';

export const CartOrderItems = ({
  productsDataOrder,
}: {
  productsDataOrder: IPproductsDataOrder[];
}) => {
  return (
    <>
      {productsDataOrder.map((product) => {
        return (
          <li
            key={product.id}
            className={`${product.quantity === 0 ? 'hidden' : ''}`}
          >
            <CartOrderItem
              availability={product.stockStatus === 'IN_STOCK'}
              product={product}
            />
          </li>
        );
      })}
    </>
  );
};

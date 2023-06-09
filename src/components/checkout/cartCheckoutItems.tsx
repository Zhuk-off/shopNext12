import { IPproductsDataOrder } from '@/src/interfaces/cart.interface';
import { CartOrderItem } from '@/src/components/order/cartOrderItem';
import { CartCheckoutItem } from './cartCheckoutItem';
import { sumToStringWithComa } from '@/src/utils/helpers';

export const CartCheckoutItems = ({
  productsDataOrder,
  sum,
  totalCount,
  loading,
}: {
  productsDataOrder: IPproductsDataOrder[];
  sum: number;
  totalCount: number | undefined;
  loading: boolean;
}) => {
  const sumFixed=sum.toFixed(2)
  // console.log(sumFixed)
  const sumWithComa = sumToStringWithComa(sumFixed);

  return (
    <>
      {productsDataOrder.map((product) => {
        return (
          <li
            key={product.id}
            className={`${product.quantity === 0 ? 'hidden' : 'mt-3'}`}
          >
            <CartCheckoutItem
              availability={product.stockStatus === 'IN_STOCK'}
              product={product}
            />
          </li>
        );
      })}
      <li>
        <div className="flex w-full ">
          <div className="mr-3 w-24 flex-shrink-0"></div>
          <div className="flex flex-grow flex-col border-b">
            <div className="flex gap-3 md:gap-5 lg:gap-10 my-2 text-xl font-bold">
              <div className="flex-grow text-gray-900">
                Итого
              </div>
              <div className="whitespace-nowrap text-lg">
                {' '}
                {totalCount} шт.
              </div>
              {
                <div className="whitespace-nowrap ">
                  {sumWithComa} р.
                </div>
              }
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

import { CartContext } from '@/src/contex/CartContex';
import { IOrderDataTotal } from '@/src/interfaces/apollo/getOrderData.interfase';
import { GET_PRODUCTS_BY_IDS_TOTAL_COST } from '@/src/utils/apollo/queriesConst';
import { getSumProducts, sumToStringWithComa } from '@/src/utils/helpers';
import { useQuery } from '@apollo/client';
import { useContext, useEffect } from 'react';
import { Spinner } from '../spinner';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const TotalCard = ({
  sum,
  totalCount,
  loading,
}: {
  sum: number;
  totalCount: number | undefined;
  loading: boolean;
}) => {
  const router = useRouter();
  // console.log(sum);

  const sumWithComa = sumToStringWithComa(sum);

  return (
    <div className="w-full p-8 md:w-72">
      <div className="mb-4 flex justify-between border-b pb-2 text-lg font-bold">
        <span>Итого</span>
        <div className="">
          <span>{!loading ? sumWithComa : <Spinner />}</span>
        </div>
      </div>
      <div className="flex justify-between text-sm">
        <span>Товары − {totalCount} шт.</span>
        <div className="font-bold">
          <span>{!loading ? sumWithComa : <Spinner />}</span>
        </div>
      </div>
      <button
        disabled={totalCount === 0}
        onClick={() => router.push('/checkout')}
        className={`${
          totalCount === 0 ? 'bg-gray-400' : 'bg-[#CE041F] hover:bg-[#A41F30]'
        } mt-5 block w-full rounded-md p-3 font-semibold text-white transition`}
      >
        <div className="text-center">Оформить заказ</div>
      </button>
      <div className="mt-4 flex text-sm font-medium leading-tight text-gray-400">
        <span className="inline-block">*</span>
        <p className="inline-block ">
          Способ и время доставки можно выбрать при оформлении заказа. Дата
          доставки заказа рассчитывается по максимальной дате доставки товаров в
          корзине.
        </p>
      </div>
    </div>
  );
};

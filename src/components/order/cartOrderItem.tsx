import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { ProductQuantity } from './ProductQuantity';
import { useQuery } from '@apollo/client';
import {
  IOrderDataProductCard,
  IOrderDataTotal,
  IOrderProductNode,
} from '@/src/interfaces/apollo/getOrderData.interfase';
import {
  GET_PRODUCTS_BY_IDS_ORDER_CARD,
  GET_PRODUCTS_BY_IDS_TOTAL_COST,
} from '@/src/utils/apollo/queriesConst';
import { useContext } from 'react';
import { CartContext } from '@/src/contex/CartCounter';
import { DEFAULT_IMG_URL_96x96 } from '@/src/utils/constants/images';

export const CartOrderItem = ({
  availability,
  product,
}: {
  availability: boolean;
  product: IOrderProductNode;
}) => {
  return (
    <div className="flex w-full ">
      <div className="mr-3 w-24 flex-shrink-0">
        <Link
          href={product.uri}
          className={classNames('hover:opacity-70', {
            bar: availability,
            'cursor-default opacity-70': !availability,
          })}
        >
          <Image
            src={
              product.image ? product.image?.sourceUrl : DEFAULT_IMG_URL_96x96
            }
            alt="product"
            width={96}
            height={96}
            className="w-24 object-contain "
          />
        </Link>
      </div>
      <div className="flex flex-grow flex-col border-b">
        <div className="flex gap-3 md:gap-5 lg:gap-10">
          <div className="flex-grow hover:text-gray-400">
            <Link
              href={'#'}
              className={classNames('mr-6 font-medium ', {
                'line-clamp-3 cursor-default text-gray-400 line-through':
                  !availability,
              })}
            >
              <p className="line-clamp-3">{product.name}</p>
            </Link>
            <div className="text-sm text-gray-400">код товара 6.318.129</div>
          </div>
          {availability ? (
            <>
              <ProductQuantity
                id={product.id}
                databaseId={product.databaseId}
              />
            </>
          ) : null}
          {!availability ? (
            <span className="inline-block self-center whitespace-nowrap text-pink-600">
              Нет в наличии
            </span>
          ) : (
            <div className="whitespace-nowrap">
              {product.price.replace('Br', '')} р.
            </div>
          )}
        </div>
        <div className="">
          <div className="flex justify-end gap-4 pb-4 pt-3">
            <button className="border">Удалить</button>
            <button className="border">В избранное</button>
          </div>
        </div>
      </div>
    </div>
  );
};

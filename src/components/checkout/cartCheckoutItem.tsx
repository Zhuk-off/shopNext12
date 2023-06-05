import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { DEFAULT_IMG_URL_96x96 } from '@/src/utils/constants/images';
import { IPproductsDataOrder } from '@/src/interfaces/cart.interface';
import { CartRemoveButton } from '../products/cartRemoveButton';

export const CartCheckoutItem = ({
  availability,
  product,
}: {
  availability: boolean;
  product: IPproductsDataOrder;
}) => {
  // console.log('product.uri order',product.uri);

  return (
    <div className="flex w-full ">
      <div className="mr-3 w-24 flex-shrink-0">
        <Link
          href={product.uri !== undefined ? `${product.uri}` : '#'}
          className={classNames('hover:opacity-70', {
            bar: availability,
            'cursor-default opacity-70': !availability,
          })}
        >
          <Image
            src={product.imageUrl ? product.imageUrl : DEFAULT_IMG_URL_96x96}
            alt="product"
            width={96}
            height={96}
            className="w-24 object-contain "
          />
        </Link>
      </div>
      <div className="flex flex-grow flex-col border-b">
        <div className="flex gap-3 md:gap-5 lg:gap-10">
          <div className="flex-grow text-gray-500">
            <Link
              href={product.uri !== undefined ? `${product.uri}` : '#'}
              className={classNames('mr-6 font-medium ', {
                'line-clamp-3 cursor-default text-gray-400 line-through':
                  !availability,
              })}
            >
              <p className="line-clamp-3">{product.name}</p>
            </Link>
            <div className="text-sm text-gray-500">код товара 6.318.129</div>
          </div>
          <div className="text-lg font-semibold text-gray-500 whitespace-nowrap">
            {' '}
            {product.quantity} шт.
          </div>
          {!availability ? (
            <span className="inline-block self-center whitespace-nowrap text-pink-600">
              Нет в наличии
            </span>
          ) : product.price ? (
            <div className="whitespace-nowrap text-lg font-semibold text-gray-500">
              {product.price.replace('Br', '')} р.
            </div>
          ) : null}
        </div>
        <div className="">
          <div className="flex justify-end gap-4 pb-4 pt-3"></div>
        </div>
      </div>
    </div>
  );
};

import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { ProductQuantity } from './ProductQuantity';
import { DEFAULT_IMG_URL_96x96 } from '@/src/utils/constants/images';
import { IPproductsDataOrder } from '@/src/interfaces/cart.interface';
import { CartRemoveButton } from '../products/cartRemoveButton';

export const CartOrderItem = ({
  availability,
  product,
}: {
  availability: boolean;
  product: IPproductsDataOrder;
}) => {
  // console.log('product.uri order',product.uri);

  return (
    <div className="mt-4 flex w-full text-gray-900 transition-all ">
      <div className="mr-3 w-24 flex-shrink-0">
        <Link
          href={product.uri !== undefined ? product.uri : '#'}
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
        <div className="flex flex-col gap-3 md:flex-row md:gap-5 lg:gap-10">
          <div className="flex-grow ">
            <Link
              href={product.uri !== undefined ? product.uri : '#'}
              className={classNames('mr-6 font-medium hover:text-gray-400', {
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
          ) : product.price ? (
            <div className="whitespace-nowrap text-xl font-semibold md:text-base md:font-normal">
              {product.price.replace('Br', '')} р.
            </div>
          ) : null}
        </div>
        <div className="">
          <div className="flex justify-end gap-4 pb-4 pt-3">
            <CartRemoveButton
              idProduct={product.id}
              databaseId={product.databaseId}
              productQuantity={product.quantity}
            />
            {/* <button className="border">В избранное</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

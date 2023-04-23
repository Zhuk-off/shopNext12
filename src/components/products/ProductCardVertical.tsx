import { IProductCat } from '@/src/interfaces/apollo/getProducts.interface';
import { DEFAULT_IMG_URL } from '@/src/utils/constants/images';
import { formatBelarusianCurrency } from '@/src/utils/helpers';
import { sanitize } from '@/src/utils/miscellaneous';
import { log } from 'console';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Shipment from '../layouts/shipment';

const ProductCardVertical = ({
  product,
  loading,
}: {
  product: IProductCat | null;
  loading: boolean;
}) => {
  // console.log(product);

  if (loading) {
    return (
      <div className="skeleton flex h-[416px] flex-col overflow-hidden rounded-md bg-white p-4 shadow-md hover:shadow-lg" />
    );
  }

  if (product === null) return null;

  const image = product.image?.sourceUrl
    ? product.image?.sourceUrl
    : DEFAULT_IMG_URL;
  const alt = product.image?.altText ? product.image?.altText : '';
  const title = product.name ? product.name : '';
  const description = product.shortDescription ? product.shortDescription : '';
  const price = product.price
    ? formatBelarusianCurrency(product.price)
    : '--,--';
  const inStock = product.stockStatus === 'IN_STOCK' ? true : false;
  const uri = product.slug ? product.slug : '#';

  return (
    <div className="flex h-[416px] flex-col overflow-hidden rounded-md bg-white p-4 shadow-md hover:shadow-lg">
      <Link href={uri} className="self-center justify-self-center">
        <Image
          src={image}
          alt={alt}
          width={150}
          height={150}
          className="h-40 object-contain"
        />
      </Link>
      {/* <div
        className="h-48 w-full rounded-md bg-cover bg-center"
        style={{ backgroundImage: `url(${imgSrc})` }}
      /> */}

      <div className="flex px-4">
        <div className="flex-1 overflow-hidden">
          <Link href={uri}>
            <h2 className="line-clamp-3 min-h-[72px] text-center text-base font-medium text-blue-500 underline hover:text-red-500">
              {title}
            </h2>
          </Link>
          {/* <div
            className="line-clamp-3 max-h-36 overflow-hidden text-sm text-gray-500 mt-2 text-center"
            dangerouslySetInnerHTML={{
              __html: sanitize(description ?? ''),
            }}
          /> */}
        </div>
      </div>

      <div className="mt-2 flex flex-col items-center justify-between gap-2 whitespace-nowrap border-t border-gray-200 px-4">
        <div className="mt-2 flex items-center text-3xl font-normal text-gray-900">
          {price}

          <span className="ml-1 mt-2 inline-block text-lg font-medium">р.</span>
        </div>

        {price !== '--,--' ? (
          <div className=" ">
            <button className="flex-shrink-0 rounded bg-pink-700 px-4 py-2 text-white transition hover:bg-pink-800 ">
              В корзину
            </button>
          </div>
        ) : (
          <div className=" ">
            <button
              disabled
              className="flex-shrink-0 rounded bg-gray-300 px-4 py-2 text-white transition"
            >
              В корзину
            </button>
          </div>
        )}
        {inStock ? (
          <span className="inline-block max-w-max rounded-full bg-green-100 px-2 py-1 text-xs font-medium uppercase text-green-800">
            В наличии
          </span>
        ) : (
          <span className="inline-block max-w-max rounded-full bg-red-100 px-2 py-1 text-center text-xs font-medium uppercase text-red-800">
            Нет в наличии
          </span>
        )}
        {/* TODO: информация о доставке в превью карточки товара, надо получить данные о доставке */}
        <div className="h-5">
          {/* {price !== '--,--' ?<Shipment courierDelivery={true} selfDelivery={true} /> :null} */}
        </div>
      </div>
    </div>
  );
};

export default ProductCardVertical;

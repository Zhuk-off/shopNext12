import { IProductCat } from '@/src/interfaces/apollo/getProducts.interface';
import { productDataConversion } from '@/src/utils/helpers';
import { sanitize } from '@/src/utils/miscellaneous';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { CartAddButton } from './cartAddButton';
import { DEFAULT_IMG_URL_224x168 } from '@/src/utils/constants/images';

const ProductCardHorisontal = ({
  product,
  loading,
}: {
  product: IProductCat | null;
  loading: boolean;
}) => {
  // вывод скелетона, если загрузка
  if (loading) {
    return (
      <div className="skeleton grid h-48 grid-cols-5 overflow-hidden rounded-md bg-white p-4 shadow-md hover:shadow-lg" />
    );
  }
  if (product === null) return null;

  // преобразование входных данных для отображения в карточке товара
  const {
    image,
    alt,
    title,
    description,
    price,
    inStock,
    uri,
    id,
    databaseId,
  } = productDataConversion(product);

  return (
    <div className="grid h-auto grid-cols-1 overflow-hidden rounded-md bg-white p-4 shadow-md hover:shadow-lg lg:h-48 lg:grid-cols-5">
      <Link
        href={`/product/${uri}`}
        className="col-span-1 self-center justify-self-center"
      >
        <Image
          src={image ? image : DEFAULT_IMG_URL_224x168}
          alt={alt}
          width={160}
          height={160}
          className="h-auto w-auto object-contain"
        />
      </Link>
      <div className="col-span-1 flex border-gray-200 px-4 lg:col-span-3">
        <div className="flex-1 overflow-hidden">
          <Link href={`/product/${uri}`}>
            <h2 className="line-clamp-3 text-center text-lg font-medium text-blue-500 underline hover:text-red-500 lg:line-clamp-4 lg:text-start">
              {title}
            </h2>
          </Link>
          <div
            className="line-clamp-3 max-h-36 overflow-hidden text-sm text-gray-500 lg:line-clamp-4"
            dangerouslySetInnerHTML={{ __html: sanitize(description ?? '') }}
          />
        </div>
      </div>

      <div className="col-span-1 mt-4 flex flex-wrap items-center justify-center justify-items-center gap-x-10 gap-y-4 whitespace-nowrap border-t border-gray-200 px-4 md:border-t-0 lg:col-span-1 lg:mt-0 lg:flex-col lg:justify-between">
        <div className="flex items-center text-3xl font-normal text-gray-900">
          {price}
          <span className="ml-1 mt-2 inline-block text-lg font-medium">р.</span>
        </div>

        <div className="mt-2 md:mt-0">
          {price !== '--,--' ? (
            <CartAddButton
              buttonStatus="enable"
              idProduct={id}
              databaseId={databaseId}
            />
          ) : (
            <CartAddButton
              buttonStatus="disable"
              idProduct={id}
              databaseId={databaseId}
            />
          )}
        </div>
        <div className="mt-2 md:mt-0">
          {inStock ? (
            <span className="flex max-w-max items-center rounded-full bg-green-100 px-4 py-1 text-xs font-medium uppercase text-green-800 lg:px-2">
              В наличии
            </span>
          ) : (
            <span className="flex max-w-max items-center  rounded-full bg-red-100 px-4 py-1 text-xs font-medium uppercase text-red-800 lg:px-2">
              Нет в наличии
            </span>
          )}
        </div>
        {/* TODO: информация о доставке в превью карточки товара, надо получить данные о доставке */}
        <div className="hidden h-5 lg:block">
          {/* {price !== '--,--' ?<Shipment courierDelivery={true} selfDelivery={true} /> :null} */}
        </div>
      </div>
    </div>
  );
};

export default ProductCardHorisontal;

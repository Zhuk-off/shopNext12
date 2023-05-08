import { IProductCat } from '@/src/interfaces/apollo/getProducts.interface';
import { productDataConversion } from '@/src/utils/helpers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { CartAddButton } from './cartAddButton';

const ProductCardVertical = ({
  product,
  loading,
}: {
  product: IProductCat | null;
  loading: boolean;
}) => {
  // вывод скелетона, если загрузка
  if (loading) {
    return (
      <div className="skeleton flex h-[416px] flex-col overflow-hidden rounded-md bg-white p-4 shadow-md hover:shadow-lg" />
    );
  }
  if (product === null) return null;

  // преобразование входных данных для отображения в карточке товара
  const { image, alt, title, price, inStock, uri, id, databaseId } =
    productDataConversion(product);

  return (
    <div className="flex h-[416px] flex-col overflow-hidden rounded-md bg-white p-4 shadow-md hover:shadow-lg">
      <Link href={uri} className="self-center justify-self-center">
        <Image
          src={image}
          alt={alt}
          width={160}
          height={160}
          className="h-40 w-auto object-contain"
        />
      </Link>

      <div className="mt-2 flex px-4">
        <div className="flex-1 overflow-hidden">
          <Link href={uri}>
            <h2 className="line-clamp-3 min-h-[72px] text-center text-base font-medium text-blue-500 underline hover:text-red-500">
              {title}
            </h2>
          </Link>
        </div>
      </div>

      <div className="mt-2 flex flex-col items-center justify-between gap-2 whitespace-nowrap border-t border-gray-200 px-4">
        <div className="mt-2 flex items-center text-3xl font-normal text-gray-900">
          {price}
          <span className="ml-1 mt-2 inline-block text-lg font-medium">р.</span>
        </div>

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

import {
  IOrderDataProductCard,
  IOrderDataTotal,
} from '../interfaces/apollo/getOrderData.interfase';
import { IProductCat } from '../interfaces/apollo/getProducts.interface';
import {
  ICartItemLocalStorage,
  ICartLocalStorage,
  IPproductsDataOrder,
} from '../interfaces/cart.interface';
import { PerPage } from '../interfaces/productsView.interface';
import { DEFAULT_IMG_URL } from './constants/images';

// Получить slug из URL
export const getSlugFromUrl = (url: string): string => {
  const parts = url.split('/').filter(Boolean);
  const slug = parts[parts?.length - 1];
  return slug;
};

export const formatBelarusianCurrency = (currencyString: string) => {
  const amount = currencyString.replace('Br', '');
  const formattedAmount = amount;
  return formattedAmount;
};

// преобразование входных данных для отображения в карточке товара
export const productDataConversion = (product: IProductCat) => {
  const image = product.image?.sourceUrl;
  const alt = product.image?.altText ? product.image?.altText : '';
  const title = product.name ? product.name : '';
  const description = product.shortDescription ? product.shortDescription : '';
  const price = product.price
    ? formatBelarusianCurrency(product.price)
    : '--,--';
  const inStock = product.stockStatus === 'IN_STOCK' ? true : false;
  const uri = product.slug ? product.slug : '#';
  const id = product.id;
  const databaseId = product.databaseId;

  return {
    image,
    alt,
    title,
    description,
    price,
    inStock,
    uri,
    id,
    databaseId,
  };
};

// Проверка на типы (сужение типов)
export function isPerPage(value: number): value is PerPage {
  return [12, 24, 48, 96].includes(value);
}

// Добавить в массив новый объект, если он есть то просто увеличить или уменьшить количество
export const addItem = (
  arr: ICartItemLocalStorage[],
  newItem: ICartItemLocalStorage
) => {
  const index = arr.findIndex((item) => item.id === newItem.id);

  if (index !== -1) {
    arr[index].quantity += newItem.quantity;
    // Проблема меняется количество databaseIds - происходит новый запрос
    // if (arr[index].quantity === 0) {
    //   arr.splice(index, 1);
    // }
  } else {
    arr.push(newItem);
  }
  return arr;
};

// получим общую сумму товаров
export const getSumProducts = (data: IOrderDataTotal) => {
  const sum =
    data?.products.edges.reduce(
      (acc, obj) =>
        acc + parseInt(obj.node.price.replace('Br', '').replace(',', '')),
      0
    ) / 100;

  return;
};

export const sumToStringWithComa = (sum: number) =>
  sum.toString().replace('.', ',');

export const getDatabaseIds = (cart: ICartLocalStorage | null) =>
  cart ? cart?.cartItems.map((item) => item.databaseId) : [];

// Order page helpers---------------------------
export const getTotalCountInStockProducts = (
  productsDataOrder: IPproductsDataOrder[]
) =>
  productsDataOrder.reduce(
    (acc, obj) => acc + (obj.stockStatus === 'IN_STOCK' ? obj.quantity : 0),
    0
  );

export const getTotalSumInStockProducts = (
  productsDataOrder: IPproductsDataOrder[]
) =>
  productsDataOrder.reduce(
    (acc, obj) =>
      acc +
      (obj.stockStatus === 'IN_STOCK'
        ? obj.quantity *
          parseInt(
            obj.price ? obj.price.replace('Br', '').replace(',', '') : ''
          )
        : 0),
    0
  ) / 100;

export const getProductsOrderView = (
  cart: ICartLocalStorage,
  productsByIds: IOrderDataProductCard
): IPproductsDataOrder[] =>
  cart.cartItems.map<IPproductsDataOrder>((item) => {
    const product = productsByIds.products.edges.find(
      (edge) => edge.node.id === item.id
    )?.node;
    // console.log('product', product);

    return {
      id: item.id,
      quantity: item.quantity,
      databaseId: item.databaseId,
      stockStatus:
        product && product?.stockStatus ? product?.stockStatus : 'OUT_OF_STOCK',
      price: product?.price,
      uri: product?.uri,
      imageUrl: product?.image?.sourceUrl,
      altImage: product?.image?.altText,
      name: product?.name ? product?.name : '',
    };
  });
// End Order page helpers---------------------------

// Cart utils helpers---------------------------

// End Cart utils helpers---------------------------

import { IOrderDataTotal } from '../interfaces/apollo/getOrderData.interfase';
import { IProductCat } from '../interfaces/apollo/getProducts.interface';
import { ICartItemLocalStorage } from '../interfaces/cart.interface';
import { PerPage } from '../interfaces/productsView.interface';
import { DEFAULT_IMG_URL } from './constants/images';

// Получить slug из URL
export const getSlugFromUrl = (url: string): string => {
  const parts = url.split('/').filter(Boolean);
  const slug = parts[parts.length - 1];
  return slug;
};

export const formatBelarusianCurrency = (currencyString: string) => {
  const amount = currencyString.replace('Br', '');
  const formattedAmount = amount;
  return formattedAmount;
};

// преобразование входных данных для отображения в карточке товара
export const productDataConversion = (product: IProductCat) => {
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
  } else {
    arr.push(newItem);
  }
};

// получим общую сумму товаров
export const getSumProducts = (data: IOrderDataTotal) =>{
    const sum =  data?.products.edges.reduce(
    (acc, obj) =>
      acc + parseInt(obj.node.price.replace('Br', '').replace(',', '')),
    0
  ) / 100;

return 
}

export const sumToStringWithComa = (sum:number) => sum.toString().replace('.', ',')


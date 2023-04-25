import { IProductCat } from "../interfaces/apollo/getProducts.interface";
import { DEFAULT_IMG_URL } from "./constants/images";

// Получить slug из URL
export const getSlugFromUrl = (url: string): string => {
  const parts = url.split('/').filter(Boolean);
  const slug = parts[parts.length - 1];
  return slug;
};

export const formatBelarusianCurrency = (currencyString: string) => {
  const amount = currencyString.replace('Br', '')
  const formattedAmount = amount
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

  return {image,alt,title,description,price,inStock,uri};
};



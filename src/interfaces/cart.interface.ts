import { IStockStatus } from './apollo/getOrderData.interfase';
import { IProduct } from './products.interface';

export interface ICart {
  cartItems: ICartItem[];
  totalPrice: number;
  totalQty: number;
}
export interface ICartLocalStorage {
  cartItems: ICartItemLocalStorage[];
  totalPrice: number;
  totalQty: number;
}

export interface ICartItemLocalStorage {
  id: string;
  quantity: number;
  databaseId: number;
}
export interface ICartItem {
  currency: string;
  data: IProduct;
  data_hash: string;
  key: string;
  line_subtotal: number;
  line_subtotal_tax: number;
  line_tax: number;
  line_tax_data: ILineTaxData;
  line_total: number;
  product_id: number;
  quantity: number;
  variation: Array<any>;
  variation_id: number;
}

interface ILineTaxData {
  subtotal: Array<any>;
  total: Array<any>;
}

export interface IConfig {
  headers: {
    'X-Headless-CMS': boolean;
    'x-wc-session'?: string;
  };
}

export interface IQtyAndPrice {
  totalQty: number;
  totalPrice: number;
}

export interface IPproductsDataOrder {
  id: string;
  quantity: number;
  databaseId: number;
  stockStatus: IStockStatus;
  price?: string;
  uri: string | undefined;
  imageUrl: string | undefined;
  altImage: string | undefined;
  name: string;
}

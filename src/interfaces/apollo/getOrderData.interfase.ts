export interface IOrderDataTotal {
  products: IOrderDataProducts;
}

export interface IOrderDataProducts {
  edges: IOrderProduct[];
}

export interface IOrderProduct {
  node: IOrderProductNode;
}

export interface IOrderProductNode {
  name: string;
  price: string;
  stockStatus?: IStockStatus
  uri: string;
}

export type IStockStatus ='IN_STOCK' | 'OUT_OF_STOCK';
//------------------------------------------

export interface IOrderDataProductCard {
  products: IOrderDataProducts;
}

export interface IOrderDataProducts {
  edges: IOrderProduct[];
}

export interface IOrderProduct {
  node: IOrderProductNode;
}

export interface IOrderProductNode {
  id: string;
  name: string;
  price: string;
  stockStatus?: IStockStatus
  uri: string;
  image?: Image | null;
  databaseId:number
}

export interface Image {
  altText: string;
  sourceUrl: string;
}

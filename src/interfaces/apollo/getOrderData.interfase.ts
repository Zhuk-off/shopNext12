export interface IOrderDataTotal {
  __typename?: string;
  products: IOrderDataProducts;
}

export interface IOrderDataProducts {
  __typename?: string;
  edges: IOrderProduct[];
}

export interface IOrderProduct {
  __typename?: string;
  node: IOrderProductNode;
}

export interface IOrderProductNode {
  __typename?: string;
  name: string;
  price: string;
  stockStatus?: IStockStatus
  uri: string;
}

export type IStockStatus ='IN_STOCK' | 'OUT_OF_STOCK';
//------------------------------------------

export interface IOrderDataProductCard {
  __typename?: string;
  products: IOrderDataProducts;
}

export interface IOrderDataProducts {
  __typename?: string;
  edges: IOrderProduct[];
  cursor?: string
  pageInfo: PageInfo;
}

export interface PageInfo{
  __typename?: string;
  hasNextPage: boolean;
  endCursor: string;

}

export interface IOrderProduct {
  __typename?: string;
  node: IOrderProductNode;
}

export interface IOrderProductNode {
  __typename?: string;
  id: string;
  name: string;
  price: string;
  stockStatus?: IStockStatus
  uri: string;
  image?: Image | null;
  databaseId:number
}

export interface Image {
  __typename?: string;
  altText: string;
  sourceUrl: string;
}

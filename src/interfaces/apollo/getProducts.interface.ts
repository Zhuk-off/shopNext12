export interface IGetProductsSimple {
  products: Products;
}

export interface Products {
  __typename: string;
  edges: Edge[];
  pageInfo: PageInfo;
}

export interface Edge {
  __typename: string;
  node: IProductCat;
}

export interface IProductCat {
  __typename: string;
  id: string;
  name?: string;
  databaseId?: number;
  description?: null | string;
  featuredImageId?: null | string;
  height?: null | string;
  length?: null | string;
  price?: null | string;
  regularPrice?: null | string;
  salePrice?: null | string;
  shippingClassId?: number | null;
  shippingRequired?: boolean;
  shippingTaxable?: boolean;
  shortDescription?: string;
  sku?: null | string;
  slug?: string;
  stockQuantity?: number | null;
  title?: string;
  type?: string;
  uri?: string;
  weight?: null | string;
  width?: null | string;
  stockStatus?: 'IN_STOCK' | 'OUT_OF_STOCK';
  image?: Image | null;
}

export interface Image {
  __typename: string;
  altText: string;
  id: string;
  slug: string;
  sourceUrl: string;
  title: string;
}

export interface PageInfo {
  __typename: string;
  hasNextPage: boolean;
  endCursor: string;
  offsetPagination: OffsetPagination;
}

export interface OffsetPagination {
  __typename: string;
  total: number;
}

export interface IGetProductsSimple {
  products: Products;
}

export interface Products {
  __typename: string;
  edges:      Edge[];
}

export interface Edge {
  __typename: string;
  node:       Node;
}

export interface Node {
  __typename:        string;
  id?:               string;
  name?:             string;
  databaseId?:       number;
  description?:      null | string;
  featuredImageId?:  null | string;
  height?:           null | string;
  length?:           null | string;
  price?:            null | string;
  regularPrice?:     null | string;
  salePrice?:        null | string;
  shippingClassId?:  number | null;
  shippingRequired?: boolean;
  shippingTaxable?:  boolean;
  shortDescription?: string;
  sku?:              null | string;
  slug?:             string;
  stockQuantity?:    number | null;
  title?:            string;
  type?:             string;
  uri?:              string;
  weight?:           null | string;
  width?:            null | string;
  stockStatus?:      string;
  image?:            Image | null;
}

export interface Image {
  __typename: string;
  altText:    string;
  id:         string;
  slug:       string;
  sourceUrl:  string;
  title:      string;
}

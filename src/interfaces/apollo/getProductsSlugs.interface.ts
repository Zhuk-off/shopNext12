// для getStaticPath
export interface IProductsSlugs {
  products: Products;
}

export interface Products {
  __typename: string;
  pageInfo: PageInfo;
  edges: Edge[];
}

export interface Edge {
  __typename: string;
  cursor: string;
  node: Node;
}

export interface Node {
  __typename: string;
  slug: string;
}

export interface PageInfo {
  __typename: string;
  hasNextPage: boolean;
  endCursor: string;
}



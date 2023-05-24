// ответ запроса cart
export interface IGetCart {
  cart: Cart;
}

export interface Cart {
  __typename: string;
  contents: Contents;
  total:string
}

export interface Contents {
  __typename: string;
  edges: Edge[];
}

export interface Edge {
  __typename: string;
  node: EdgeNode;
}

export interface EdgeNode {
  __typename: string;
  quantity: number;
  product: Product;
}

export interface Product {
  __typename: string;
  node: ProductNode;
}

export interface ProductNode {
  __typename: string;
  name: string;
  id: string;
  databaseId: number;
}

// ответ мутации fillCart
export interface IFillCart {
  fillCart: FillCart;
}

export interface FillCart {
  cart:       Cart;
  added:      Added[];
  __typename: string;
}

export interface Added {
  total:      string;
  quantity:   number;
  product:    ProductAdded;
  __typename: string;
}

export interface ProductAdded {
  node:       Node;
  __typename: string;
}

export interface Node {
  databaseId: number;
  id:         string;
  __typename: string;
}

export interface Cart {
  total:      string;
  __typename: string;
}
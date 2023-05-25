export interface IOrders {
  orders: Orders;
}

export interface Orders {
  __typename: string;
  edges: OrdersEdge[];
}

export interface OrdersEdge {
  __typename: string;
  node: PurpleNode;
}

export interface PurpleNode {
  __typename: string;
  total: string;
  id: string;
  status: Status;
  orderNumber: string;
  lineItems: LineItems;
  date: string;
}

export interface LineItems {
  __typename: string;
  edges: LineItemsEdge[];
}

export interface LineItemsEdge {
  __typename: string;
  node: FluffyNode;
}

export interface FluffyNode {
  __typename: string;
  product: Product;
  quantity: number;
}

export interface Product {
  __typename: string;
  node: ProductNode;
}

export interface ProductNode {
  __typename: string;
  id: string;
  name: string;
  price: string;
  image: Image;
}

export interface Image {
  __typename: string;
  altText: string;
  sourceUrl: string;
}

export enum Status {
  Pending = 'PENDING', // ожидается оплата
  Processing = 'PROCESSING', // обработка
  Completed = 'COMPLETED', // выполнен
  OnHold = 'ON_HOLD', // на удержании
  Cancelled = 'CANCELLED', // отменен
  Refunded = 'REFUNDED', // возвращен
  Failed = 'FAILED', // не удался
  CheckoutDraft = 'CHECKOUT_DRAFT', // черновик
}

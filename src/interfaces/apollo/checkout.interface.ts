export interface ICheckout {
  checkout: Checkout;
}

export interface Checkout {
  result: string;
  order: Order;
  __typename: string;
}

export interface Order {
  orderNumber: string;
  __typename: string;
}

export interface IPersonalData {
  username: string;
  email: string;
  phone: string;
  address1Billing: string;
  comments: string;
  change: boolean;
  orderNumber: string;
  orderStatus: string;
}

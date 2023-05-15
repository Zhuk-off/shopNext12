export interface IDataLogin {
  login: Login;
}

export interface Login {
  authToken: string;
  clientMutationId: null;
  refreshToken: string;
  sessionToken: string;
  customer: Customer;
  __typename: string;
}

export interface Customer {
  id: string;
  firstName: string;
  email: string;
  billing: Billing;
  __typename: string;
}

export interface Billing {
  address1: string;
  phone: string;
  __typename: string;
}

// Данные для страницы /my-acount
export interface ICustomerData {
  customer: Customer;
}

export interface Customer {
  email: string;
  firstName: string;
  billing: Billing;
}

export interface Billing {
  address1: string;
  phone: string;
}

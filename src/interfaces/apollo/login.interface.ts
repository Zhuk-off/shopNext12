export interface IDataLogin {
  login: Login;
}

export interface Login {
  authToken:        string;
  clientMutationId: null;
  refreshToken:     string;
  sessionToken:     string;
  customer:         Customer;
  user:             User;
  __typename:       string;
}

export interface Customer {
  id:         string;
  username:   string;
  role:       string;
  __typename: string;
}

export interface User {
  name:       string;
  lastName:   null;
  nickname:   string;
  __typename: string;
}
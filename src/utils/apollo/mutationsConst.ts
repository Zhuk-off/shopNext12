import { gql } from '@apollo/client';

export const LOGIN_AUTH = gql`
mutation MyMutation($password: String!, $username: String!) {
  login(input: {password: $password, username: $username}) {
    authToken
    clientMutationId
    refreshToken
    sessionToken
    customer {
      id
      firstName
      email
    }
  }
}
`;

export const REGISTER_CUSTOMER = gql`
mutation RegisterCustomer($email: String!, $firstName: String, $password: String) {
  registerCustomer(
    input: {email: $email, password: $password, firstName: $firstName}
  ) {
    authToken
    refreshToken
    customer {
      firstName
      email
    }
  }
}
`;

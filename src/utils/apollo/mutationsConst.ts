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
      billing {
        address1
        phone
      }
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

export const SEND_PASSWORD_RESET_EMAIL = gql`
mutation sendPasswordResetEmail ($username: String! ) {
  sendPasswordResetEmail(input: {username: $username}) {
    success
  }
}
`;


export const IS_EXISTS_CUSTOMER_EMAIL = gql`
query isExistsCustomerEmail($email: String!) {
  customers(where: {email: $email}) {
    edges {
      node {
        id
      }
    }
  }
}
`;

export const EMPTY_CART = gql`
mutation EmptyCart($clearPersistentCart: Boolean = true) {
  emptyCart(input: {clearPersistentCart: $clearPersistentCart}) {
    cart {
      total
    }
  }
}
`;
export const REFRESH_JWT_AUTH_TOKEN = gql`
mutation RefreshJwtAuthToken($jwtRefreshToken: String!) {
  refreshJwtAuthToken(input: {jwtRefreshToken: $jwtRefreshToken}) {
    authToken
  }
}
`;

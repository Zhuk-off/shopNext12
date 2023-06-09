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
export const FILL_CART = gql`
mutation RefreshJwtAuthToken($items: [CartItemInput] ) {
  fillCart(input: {items: $items}) {
    cart {
      total
    }
    added {
      total
      quantity
      product {
        node {
          databaseId
          id
        }
      }
    }
  }
}
`;
export const REMOVE_CART_ITEMS = gql`
mutation RemoveCartItems {
  removeItemsFromCart(input: {all: true}) {
    cart {
      total
    }
  }
}
`;
export const CREATE_ORDER = gql`
mutation Checkout($phone: String , $firstName: String, $email: String , $address1: String , $customerNote: String, $paymentMethod: String) {
  checkout(
    input: {customerNote: $customerNote, paymentMethod: $paymentMethod, billing: {address1: $address1, email: $email, phone: $phone, firstName: $firstName}}
  ) {
    result
    order {
      orderNumber
    }
  }
}
`;
// export const CREATE_ORDER = gql`
// mutation MyMutation {
//   createOrder(input: {billing: {address1: "1231231231", phone: "123123123123"}}) {
//     orderId
//   }
// }
// `;

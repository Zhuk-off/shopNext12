import { gql } from "@apollo/client";

export const LOGIN_AUTH = gql`
mutation MyMutation($password: String!, $username: String!) {
  login(input: {password: $password, username: $username}) {
    authToken
    clientMutationId
    refreshToken
    sessionToken
    customer {
      id
      username
      role
    }
  }
}
`


import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;
export const GET_PRODUCTS_SIMPLE = gql`
  query getProductsSingle {
    products {
      edges {
        node {
          ... on SimpleProduct {
            id
            name
            databaseId
            description
            featuredImageId
            height
            length
            price
            regularPrice
            salePrice
            shippingClassId
            shippingRequired
            shippingTaxable
            shortDescription
            sku
            slug
            stockQuantity
            title
            type
            uri
            weight
            width
            stockStatus
            image {
              altText
              id
              slug
              sourceUrl
              title
            }
          }
        }
      }
    }
  }
`;
export const GET_PRODUCTS_SIMPLE_NAME_PRICE_IMG = gql`
  query getProductsSingle {
    products {
      edges {
        node {
          ... on SimpleProduct {
            id
            name
            databaseId
            price
            regularPrice
            salePrice
            title
            uri
            image {
              altText
              id
              sourceUrl
              title
            }
          }
        }
      }
    }
  }
`;
export const GET_CATEGORIES = gql`
query Category {
  productCategories(where: {exclude: "15"}) {
    edges {
      node {
        id
        name
        parentId
        slug
        uri
        databaseId
      }
    }
  }
}
`;

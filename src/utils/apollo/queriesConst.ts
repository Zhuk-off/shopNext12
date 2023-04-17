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
    productCategories(where: { exclude: "15" }) {
      edges {
        node {
          id
          name
          parentId
          slug
          uri
          databaseId
          image {
            sourceUrl
          }
        }
      }
    }
  }
`;

export const GET_CATEGORY_WITH_PRODUCTS = gql`
  query MyQuery4($id: ID = "akkumulyatornye-dreli-shurupoverty") {
    productCategory(id: $id, idType: SLUG) {
      databaseId
      description
      id
      parentId
      seo {
        breadcrumbs {
          text
          url
        }
      }
      slug
      products {
        edges {
          node {
            ... on SimpleProduct {
              id
              name
              price
              salePrice
              regularPrice
            }
          }
        }
      }
      count
    }
  }
`;
export const GET_CATEGORY_WITH_PRODUCTS_OF_CILD = gql`
  query AllProductsInCategories($categorySlugs: [String!]!) {
    products(where: { categoryIn: $categorySlugs }) {
      edges {
        node {
          id
          name
          ... on SimpleProduct {
            id
            name
            price
            salePrice
            regularPrice
          }
        }
      }
    }
  }
`;

const i = {
  id: 'dGVybTo3Mjg=',
  children: [
    {
      id: 'dGVybTo3Mjk=',
      children: [
        {
          id: 'dGVybTo3MzA=',
          children: [],
        },
      ],
    },
    {
      id: 'dGVybTo3MzI=',
      children: [
        {
          id: 'dGVybTo3MzM=',
          children: [],
        },
      ],
    },
  ],
};

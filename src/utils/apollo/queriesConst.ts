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
    productCategory(first: 100, id: $id, idType: SLUG) {
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
// export const GET_CATEGORY_WITH_PRODUCTS_OF_CILD = gql`
//   query AllProductsInCategories($categorySlugs: [String!]!) {
//     products(first: 100, where: { categoryIn: $categorySlugs }) {
//       edges {
//         node {
//           ... on SimpleProduct {
//             sku
//             id
//             name
//             price
//             salePrice
//             regularPrice
//             shortDescription
//             image {
//               altText
//               sourceUrl
//             }
//             stockStatus
//           }
//         }
//       }
//       pageInfo {
//         hasNextPage
//         endCursor
//         offsetPagination {
//           total
//         }
//       }
//     }
//   }
// `;

export const GET_CATEGORY_DATA = gql`
  query AllProductsInCategory($id: ID!) {
    productCategory(id: $id, idType: SLUG) {
      id
      databaseId
      description
      slug
      image {
        sourceUrl
      }
      name
      seo {
        breadcrumbs {
          text
          url
        }
      }
    }
  }
`;

// Тестовый запрос - Запрос всех товаров - используется для тестирования функции пагинации
export const PRODUCTS_TEST = gql`
  query AllProductsInCategories($offset: Int, $size: Int, $categorySlugs: [String!]!) {
    products(where: { offsetPagination: { size: $size, offset: $offset }, categoryIn: $categorySlugs }) {
      edges {
        node {
          ... on SimpleProduct {
            sku
            id
            name
            price
            salePrice
            regularPrice
            shortDescription
            image {
              altText
              sourceUrl
            }
            stockStatus
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
        offsetPagination {
          total
        }
      }
    }
  }
`;

export const SEARCH_PRODUCTS_QUERY = gql`
  query SearchProducts($search: String, $offset: Int, $size: Int) {
    products(where: { search: $search, offsetPagination: { size: $size, offset: $offset } }) {
      edges {
        node {
          ... on SimpleProduct {
            sku
            id
            name
            price
            salePrice
            regularPrice
            shortDescription
            image {
              altText
              sourceUrl
            }
            stockStatus
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
        offsetPagination {
          total
        }
      }
    }
  }
`;

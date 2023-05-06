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
const productQuery = `
edges {
  node {
    ... on SimpleProduct {
      sku
      id
      databaseId
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
`;
export const PRODUCTS_TEST = gql`
  query AllProductsInCategories($offset: Int, $size: Int, $categorySlugs: [String!]!) {
    products(where: {offsetPagination: { size: $size, offset: $offset }, categoryIn: $categorySlugs }) {
      ${productQuery}
    }
  }
`;
export const PRODUCTS_TEST_FILTER_BY_MIN_PRICE = gql`
  query AllProductsInCategories($minPrice: Float, $offset: Int, $size: Int, $categorySlugs: [String!]!) {
    products(where: {minPrice: $minPrice, offsetPagination: { size: $size, offset: $offset }, categoryIn: $categorySlugs }) {
      ${productQuery}
    }
  }
`;
export const PRODUCTS_TEST_FILTER_BY_MAX_PRICE = gql`
  query AllProductsInCategories($maxPrice: Float, $offset: Int, $size: Int, $categorySlugs: [String!]!) {
    products(where: {maxPrice: $maxPrice, offsetPagination: { size: $size, offset: $offset }, categoryIn: $categorySlugs }) {
      ${productQuery}
    }
  }
`;
export const PRODUCTS_TEST_FILTER_BY_MIN_MAX_PRICE = gql`
  query AllProductsInCategories($minPrice: Float, $maxPrice: Float, $offset: Int, $size: Int, $categorySlugs: [String!]!) {
    products(where: {minPrice: $minPrice, maxPrice: $maxPrice, offsetPagination: { size: $size, offset: $offset }, categoryIn: $categorySlugs }) {
      ${productQuery}
    }
  }
`;
export const PRODUCTS_TEST_SORT = gql`
  query AllProductsInCategories($offset: Int, $size: Int, $categorySlugs: [String!]!, $field: ProductsOrderByEnum!, $order: OrderEnum) {
    products(where: {orderby: {field: $field, order: $order}, offsetPagination: { size: $size, offset: $offset }, categoryIn: $categorySlugs }) {
      ${productQuery}
    }
  }
`;
export const PRODUCTS_TEST_SORT_FILTER_BY_MIN_PRICE = gql`
  query AllProductsInCategories($minPrice: Float, $offset: Int, $size: Int, $categorySlugs: [String!]!, $field: ProductsOrderByEnum!, $order: OrderEnum) {
    products(where: {minPrice: $minPrice, orderby: {field: $field, order: $order}, offsetPagination: { size: $size, offset: $offset }, categoryIn: $categorySlugs }) {
      ${productQuery}
    }
  }
`;
export const PRODUCTS_TEST_SORT_FILTER_BY_MAX_PRICE = gql`
  query AllProductsInCategories($maxPrice: Float, $offset: Int, $size: Int, $categorySlugs: [String!]!, $field: ProductsOrderByEnum!, $order: OrderEnum) {
    products(where: {maxPrice: $maxPrice, orderby: {field: $field, order: $order}, offsetPagination: { size: $size, offset: $offset }, categoryIn: $categorySlugs }) {
      ${productQuery}
    }
  }
`;
export const PRODUCTS_TEST_SORT_FILTER_BY_MIN_MAX_PRICE = gql`
  query AllProductsInCategories($minPrice: Float, $maxPrice: Float, $offset: Int, $size: Int, $categorySlugs: [String!]!, $field: ProductsOrderByEnum!, $order: OrderEnum) {
    products(where: {minPrice: $minPrice, maxPrice: $maxPrice, orderby: {field: $field, order: $order}, offsetPagination: { size: $size, offset: $offset }, categoryIn: $categorySlugs }) {
      ${productQuery}
    }
  }
`;

//Запросы для поиска товаров с разными параметрами
export const SEARCH_PRODUCTS_TEMP_ = gql`
  query SearchProducts($search: String, $offset: Int, $size: Int) {
    products(
      where: {
        search: $search
        offsetPagination: { size: $size, offset: $offset }
      }
    ) {
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
export const SEARCH_PRODUCTS = gql`
  query AllProductsInCategories($offset: Int, $size: Int, $search: String) {
    products(where: {offsetPagination: { size: $size, offset: $offset }, search: $search }) {
      ${productQuery}
    }
  }
`;
export const SEARCH_PRODUCTS_FILTER_BY_MIN_PRICE = gql`
  query AllProductsInCategories($minPrice: Float, $offset: Int, $size: Int, $search: String) {
    products(where: {minPrice: $minPrice, offsetPagination: { size: $size, offset: $offset }, search: $search }) {
      ${productQuery}
    }
  }
`;
export const SEARCH_PRODUCTS_FILTER_BY_MAX_PRICE = gql`
  query AllProductsInCategories($maxPrice: Float, $offset: Int, $size: Int, $search: String) {
    products(where: {maxPrice: $maxPrice, offsetPagination: { size: $size, offset: $offset }, search: $search }) {
      ${productQuery}
    }
  }
`;
export const SEARCH_PRODUCTS_FILTER_BY_MIN_MAX_PRICE = gql`
  query AllProductsInCategories($minPrice: Float, $maxPrice: Float, $offset: Int, $size: Int, $search: String) {
    products(where: {minPrice: $minPrice, maxPrice: $maxPrice, offsetPagination: { size: $size, offset: $offset }, search: $search }) {
      ${productQuery}
    }
  }
`;
export const SEARCH_PRODUCTS_SORT = gql`
  query AllProductsInCategories($offset: Int, $size: Int, $search: String, $field: ProductsOrderByEnum!, $order: OrderEnum) {
    products(where: {orderby: {field: $field, order: $order}, offsetPagination: { size: $size, offset: $offset }, search: $search }) {
      ${productQuery}
    }
  }
`;
export const SEARCH_PRODUCTS_SORT_FILTER_BY_MIN_PRICE = gql`
  query AllProductsInCategories($minPrice: Float, $offset: Int, $size: Int, $search: String, $field: ProductsOrderByEnum!, $order: OrderEnum) {
    products(where: {minPrice: $minPrice, orderby: {field: $field, order: $order}, offsetPagination: { size: $size, offset: $offset }, search: $search }) {
      ${productQuery}
    }
  }
`;
export const SEARCH_PRODUCTS_SORT_FILTER_BY_MAX_PRICE = gql`
  query AllProductsInCategories($maxPrice: Float, $offset: Int, $size: Int, $search: String, $field: ProductsOrderByEnum!, $order: OrderEnum) {
    products(where: {maxPrice: $maxPrice, orderby: {field: $field, order: $order}, offsetPagination: { size: $size, offset: $offset }, search: $search }) {
      ${productQuery}
    }
  }
`;
export const SEARCH_PRODUCTS_SORT_FILTER_BY_MIN_MAX_PRICE = gql`
  query AllProductsInCategories($minPrice: Float, $maxPrice: Float, $offset: Int, $size: Int, $search: String, $field: ProductsOrderByEnum!, $order: OrderEnum) {
    products(where: {minPrice: $minPrice, maxPrice: $maxPrice, orderby: {field: $field, order: $order}, offsetPagination: { size: $size, offset: $offset }, search: $search }) {
      ${productQuery}
    }
  }
`;

// Запросы для корзины товаров /order
export const GET_PRODUCTS_BY_IDS_TOTAL_COST = gql`
  query getProductsByIds($include: [Int], $endCursor: String) {
    products(where: { include: $include }, first: 1, after: $endCursor) {
      edges {
        node {
          ... on SimpleProduct {
            price
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
export const GET_PRODUCTS_BY_IDS_ORDER_CARD = gql`
  query getProductsByIds($include: [Int], $endCursor: String) {
    products(where: { include: $include }, first: 1000, after: $endCursor) {
      edges {
        node {
          ... on SimpleProduct {
            id
            databaseId
            name
            price
            stockStatus
            uri
            image {
              altText
              sourceUrl
            }
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

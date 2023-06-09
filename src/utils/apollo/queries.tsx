import {
  ICategory,
  IGetCategories,
} from '@/src/interfaces/apollo/getCatigories.interface';
import {
  ApolloClient,
  ApolloQueryResult,
  DocumentNode,
  InMemoryCache,
  gql,
} from '@apollo/client';
import { GET_PRODUCTS_BY_IDS_TOTAL_COST } from './queriesConst';

const client = new ApolloClient({
  uri: 'https://sp.zhu.by/graphql',
  cache: new InMemoryCache(),
});

export async function getAllCategories() {
  let categories: ICategory[] = [];
  let hasNextPage: boolean = true;
  let endCursor: string = '';

  // чтобы уменьшить количество страниц поставил !hasNextPage
  while (hasNextPage) {
    const data: ApolloQueryResult<IGetCategories> = await client.query({
      query: gql`
        query Category($endCursor: String) {
          productCategories(
            where: { exclude: "15" }
            first: 100
            after: $endCursor
          ) {
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
              cursor
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      `,
      variables: { endCursor },
    });

    const {
      productCategories: { edges },
    } = data.data;
    hasNextPage = data.data.productCategories.pageInfo.hasNextPage;
    endCursor = data.data.productCategories.pageInfo.endCursor;
    categories = [...categories, ...edges];
  }

  return categories;
}

export async function getAllOrderProducts(
  query: DocumentNode = GET_PRODUCTS_BY_IDS_TOTAL_COST
) {
  let productsOrder: ICategory[] = [];
  let hasNextPage: boolean = true;
  let endCursor: string = '';

  while (hasNextPage) {
    const data: ApolloQueryResult<IGetCategories> = await client.query({
      query,
      variables: { endCursor },
    });

    const {
      productCategories: { edges },
    } = data.data;
    hasNextPage = data.data.productCategories.pageInfo.hasNextPage;
    endCursor = data.data.productCategories.pageInfo.endCursor;
    productsOrder = [...productsOrder, ...edges];
  }

  return productsOrder;
}

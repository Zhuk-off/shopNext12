import { ApolloClient, ApolloQueryResult, InMemoryCache } from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';
import { gql } from '@apollo/client';
import {
  ICategory,
  IGetCategories,
} from '@/src/interfaces/apollo/getCatigories.interface';

const client = new ApolloClient({
  uri: 'https://sp.zhu.by/graphql',
  cache: new InMemoryCache(),
});

async function getAllCategories() {
  let categories: ICategory[] = [];
  let hasNextPage:boolean = true;
  let endCursor: string  = '';

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

export default function Test({ categories }: { categories: ICategory[] }) {
  return (
    <div>
      {categories.map((category,index) => (
        <div key={category.node.id}>{index} {category.node.name}</div>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const categories = await getAllCategories();

  return {
    props: {
      categories,
    },
  };
}

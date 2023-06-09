import { client } from '../apollo/apolloClient';
import { GET_PRODUCTS_URI, GET_PRODUCT_DATA } from '../apollo/queriesConst';

export async function getAllProductsURI() {
  const paths: string[] = [];
  const first = 100;
  let cursor = null;
  let allProducts: any[] = [];

  while (true) {
    let products: any = [];
    await client
      .query({
        query: GET_PRODUCTS_URI,
        variables: { first, cursor },
      })
      .then(({ data }) => {
        products = data?.products;
        // console.log('getProductsURI', data);
      })
      .catch((e) => console.log('error getStaticPath query', e));
    // console.log(products);
    allProducts = allProducts?.concat(products?.edges);
    // меняем (!products?.pageInfo?.hasNextPage || paths.length >= 100) если надо рендерить не все я только 100 товаров, например
    // if (!products?.pageInfo?.hasNextPage) {
    if (!products?.pageInfo?.hasNextPage || paths.length >= 100) {
      break;
    }
    const pagePaths = products?.edges?.map(
      ({ node }: { node: any }) => `/product/${node.slug}`
    );
    paths.push(...pagePaths);
    cursor = products?.pageInfo?.endCursor;
    console.log('paths', paths?.length);
  }

  return paths;
  // const paths:string[] = ['/product/karman-v-bagazhnik-na-lipuchke-universalnyj-40h30-sm-rexant'];

  // return paths
}

export async function getProductDataByURI(slug: string | string[]) {
  let product: {} | null = {};
  await client
    .query({
      query: GET_PRODUCT_DATA,
      variables: { id: slug },
    })
    .then(({ data }) => {
      product = data;

      // console.log('getProductDataByURI', data);
    })
    .catch(() => {
      product = null;
    });

  return product;
}

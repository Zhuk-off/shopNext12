import { useQuery, gql } from '@apollo/client';
import {
  GET_CATEGORIES,
  GET_PRODUCTS_SIMPLE,
  GET_PRODUCTS_SIMPLE_NAME_PRICE_IMG,
  GET_USERS,
} from './queriesConst';
import { IGetProductsSimple } from '@/src/interfaces/apollo/getProducts.interface';
import { IGetCategories } from '@/src/interfaces/apollo/getCatigories.interface';
import buildMenu from '../buildMenu';

export function Users() {
  const { loading, error, data } = useQuery<IGetCategories>(GET_CATEGORIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  // data &&
  //   data.products.edges.map((product) => {
  //     console.log(product.node.databaseId);
  //   });
  // console.log(data?.productCategories.edges);
  if (data) {
    const cat = buildMenu(data?.productCategories.edges);
    // console.log('cat', cat);
  }

  return (
    <>
      {data && (
        <ul>
          {/* {data.products?.edges?.map((product, index) => (
            <li key={product?.node?.databaseId + index.toString()}>
              {product?.node?.name}
            </li>
          ))} */}
        </ul>
      )}
    </>
  );
}

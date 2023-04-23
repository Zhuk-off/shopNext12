import { useEffect, useState } from 'react';
import Pagination from '.';
import { gql, useQuery } from '@apollo/client';
import ProductsBoard from '../products';
import { IGetProductsSimple } from '@/src/interfaces/apollo/getProducts.interface';

const PRODUCTS_TEST = gql`
  query AllProductsInCategories($offset: Int, $size: Int) {
    products(where: { offsetPagination: { size: $size, offset: $offset } }) {
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

function ProductsList({ currentPageProps }: { currentPageProps: number }) {
  const productsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(currentPageProps);
  const [totalPages, setTotalPages] = useState(1);
  const [prevTotalPages, setPrevTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [prevTotalProducts, setPrevTotalProducts] = useState(0);
  console.log('current ', currentPage);

  const { loading, error, data } = useQuery(PRODUCTS_TEST, {
    variables: {
      offset: (currentPage - 1) * productsPerPage,
      size: productsPerPage,
    },
  });
  useEffect(() => {
    setPrevTotalPages(totalPages);
    setPrevTotalProducts(totalProducts);
    const totalPagesNew = data
      ? Math.ceil(
          data.products.pageInfo.offsetPagination.total / productsPerPage
        )
      : prevTotalPages;
    const totalProductsNew = data? data.products.pageInfo.offsetPagination.total : prevTotalProducts;
    setTotalPages(totalPagesNew);
    setTotalProducts(totalProductsNew);
  }, [data, prevTotalPages, prevTotalProducts, totalPages, totalProducts]);

  if (loading)
    return (
      <div>
        <ProductsBoard products={null} loading={loading} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(newPage: any) => setCurrentPage(newPage)}
          totalProducts={totalProducts}
        />
      </div>
    );
  if (error) return <p>Error :(</p>;
  const products: IGetProductsSimple = data;
  // const totalProducts = data.products.pageInfo.offsetPagination.total;

  // const products = data.products.edges.map(({ node }: { node: any }) => node);

  return (
    <div>
      <ProductsBoard products={products} loading={loading} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(newPage: any) => {
          setCurrentPage(newPage);
          setTotalPages(totalPages);
          setPrevTotalProducts(totalProducts)
        }}
        totalProducts={totalProducts}

      />
    </div>
  );
}

export default ProductsList;

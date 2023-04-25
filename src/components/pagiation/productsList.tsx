import { useEffect, useState } from 'react';
import Pagination from '.';
import { gql, useQuery } from '@apollo/client';
import ProductsBoard from '../products';
import { IGetProductsSimple } from '@/src/interfaces/apollo/getProducts.interface';

// Тестовый запрос - Запрос всех товаров - используется для тестирования функции пагинации
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
  // количество товаров на страницу
  const productsPerPage = 12;
  // текущая страница - входной параметр - по умолчанию ставится 1 при вызовен на уровне выше, записывается в стейт
  const [currentPage, setCurrentPage] = useState(currentPageProps);
  // общее количество страниц - 1 - минимальное количество
  const [totalPages, setTotalPages] = useState(1);
  // предыдущее количество страниц - нужно, чтобы при переключении страницы пока loading, общее количество страниц не сбрасывалось на ноль
  const [prevTotalPages, setPrevTotalPages] = useState(1);
  // общее количество товаров
  const [totalProducts, setTotalProducts] = useState(0);
  // предыдущее общее количество товаров, чтобы при переключении страницы пока loading, общее количество товаров не сбрасывалось на ноль
  const [prevTotalProducts, setPrevTotalProducts] = useState(0);

  // получение данных о товарах
  const { loading, error, data } = useQuery(PRODUCTS_TEST, {
    variables: {
      offset: (currentPage - 1) * productsPerPage,
      size: productsPerPage,
    },
  });
  // действия, для выполнения, когда переключается страница
  useEffect(() => {
    // записываем предыдущие значения
    setPrevTotalPages(totalPages);
    setPrevTotalProducts(totalProducts);
    // получаем и вычисляем новые значения для товаров и страниц
    const totalPagesNew = data
      ? Math.ceil(
          data.products.pageInfo.offsetPagination.total / productsPerPage
        )
      : prevTotalPages;
    const totalProductsNew = data
      ? data.products.pageInfo.offsetPagination.total
      : prevTotalProducts;
    // устанавливаем новые значения
    setTotalPages(totalPagesNew);
    setTotalProducts(totalProductsNew);
  }, [data, prevTotalPages, prevTotalProducts, totalPages, totalProducts]);

  // пока идет загрузка - выводим skeleton для того, чтобы не плыла верстка
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

  /**@TODO Добавить описание ошибки и красивую страницу */
  if (error) return <p>Error :(</p>;

  const products: IGetProductsSimple = data;

  return (
    <div>
      <ProductsBoard products={products} loading={loading} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(newPage: any) => {
          setCurrentPage(newPage);
          setTotalPages(totalPages);
          setPrevTotalProducts(totalProducts);
        }}
        totalProducts={totalProducts}
      />
    </div>
  );
}

export default ProductsList;

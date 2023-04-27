import { useEffect, useState } from 'react';
import Pagination from '.';
import { useQuery } from '@apollo/client';
import ProductsBoard from '../products';
import { IGetProductsSimple } from '@/src/interfaces/apollo/getProducts.interface';
import { PRODUCTS_TEST } from '@/src/utils/apollo/queriesConst';
import { useRouter } from 'next/router';

function ProductsList({
  mainAndChildrenSlugs,
}: {
  mainAndChildrenSlugs: string[];
}) {
  const router = useRouter();
  // количество товаров на страницу
  const productsPerPage = 12;
  // текущая страница - входной параметр - по умолчанию ставится 1 при вызовен на уровне выше, записывается в стейт
  const [currentPage, setCurrentPage] = useState(1);
  // общее количество страниц - 1 - минимальное количество
  const [totalPages, setTotalPages] = useState(1);
  // предыдущее количество страниц - нужно, чтобы при переключении страницы пока loading, общее количество страниц не сбрасывалось на ноль
  const [prevTotalPages, setPrevTotalPages] = useState(1);
  // общее количество товаров
  const [totalProducts, setTotalProducts] = useState(0);
  // предыдущее общее количество товаров, чтобы при переключении страницы пока loading, общее количество товаров не сбрасывалось на ноль
  const [prevTotalProducts, setPrevTotalProducts] = useState(0);

  /* Необходимо, для того, чтобы при переходе на новую страницу стейт не сохранялся старый
  из за этого товар не найден, потому что он учавствует в запросе*/
  useEffect(() => {
    setCurrentPage(1);
  }, [router.query.category]);

  console.log('router.route', router.route);
  console.log('router', router);
  console.log('currentPage', currentPage);

  // получение данных о товарах
  const { loading, error, data } = useQuery(PRODUCTS_TEST, {
    variables: {
      offset: (currentPage - 1) * productsPerPage,
      size: productsPerPage,
      categorySlugs: mainAndChildrenSlugs,
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
    setTotalPages(totalPagesNew !== 0 ? totalPagesNew : 1);
    setTotalProducts(totalProductsNew);
  }, [
    data,
    prevTotalPages,
    prevTotalProducts,
    totalPages,
    totalProducts,
    router,
  ]);

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
  console.log('data', data);

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

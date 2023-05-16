import { useContext, useEffect, useState } from 'react';
import Pagination from '.';
import { useQuery } from '@apollo/client';
import ProductsBoard from '../products';
import { IGetProductsSimple } from '@/src/interfaces/apollo/getProducts.interface';
import {
  PRODUCTS_TEST,
  PRODUCTS_TEST_FILTER_BY_MAX_PRICE,
  PRODUCTS_TEST_FILTER_BY_MIN_MAX_PRICE,
  PRODUCTS_TEST_FILTER_BY_MIN_PRICE,
  PRODUCTS_TEST_SORT,
  PRODUCTS_TEST_SORT_FILTER_BY_MAX_PRICE,
  PRODUCTS_TEST_SORT_FILTER_BY_MIN_MAX_PRICE,
  PRODUCTS_TEST_SORT_FILTER_BY_MIN_PRICE,
} from '@/src/utils/apollo/queriesConst';
import { useRouter } from 'next/router';
import { PerPage } from '@/src/interfaces/productsView.interface';
import { ControlBarContext } from '@/src/contex/ControlBarContext';

export interface IVariables {
  offset: number;
  size: PerPage;
  categorySlugs: string[];
  field?: 'NAME' | 'PRICE' | '';
  order?: 'ASC' | 'DESC' | '';
  minPrice?: number | null;
  maxPrice?: number | null;
}

function ProductsList({
  mainAndChildrenSlugs,
}: {
  mainAndChildrenSlugs: string[];
}) {
  const router = useRouter();
  // количество товаров на страницу

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
  // сотояние controlBar
  const { controlBar, setControlBars } = useContext(ControlBarContext);

  /* Необходимо, для того, чтобы при переходе на новую страницу стейт не сохранялся старый
  из за этого товар не найден, потому что он учавствует в запросе, а также при изменении вывода
  количества товаров на страницу*/
  useEffect(() => {
    setCurrentPage(1);
  }, [router.query.category, controlBar.productsPerPage]);

  const variablesFunc = () => {
    let variables: IVariables = {
      offset: (currentPage - 1) * controlBar.productsPerPage,
      size: controlBar.productsPerPage,
      categorySlugs: mainAndChildrenSlugs,
    };
    const field = controlBar.sortName !== '' ? 'NAME' : 'PRICE';
    const order =
      controlBar.sortName !== '' ? controlBar.sortName : controlBar.sortPrice;
    const minPrice = controlBar.minPrice;
    const maxPrice = controlBar.maxPrice;

    /**проверка на сортировку и фильтр */
    if (
      (controlBar.sortName !== '' || controlBar.sortPrice !== '') &&
      controlBar.maxPrice &&
      controlBar.minPrice
    ) {
      variables = { ...variables, field, order, minPrice, maxPrice };
    } else if (
      (controlBar.sortName !== '' || controlBar.sortPrice !== '') &&
      controlBar.minPrice
    ) {
      variables = { ...variables, field, order, minPrice };
    } else if (
      (controlBar.sortName !== '' || controlBar.sortPrice !== '') &&
      controlBar.maxPrice
    ) {
      variables = { ...variables, field, order, maxPrice };
    } else if (controlBar.sortName !== '' || controlBar.sortPrice !== '') {
      variables = { ...variables, field, order };
    } else if (controlBar.maxPrice && controlBar.minPrice) {
      /**проверка на фильтр */
      variables = { ...variables, minPrice, maxPrice };
    } else if (controlBar.minPrice) {
      variables = { ...variables, minPrice };
    } else if (controlBar.maxPrice) {
      variables = { ...variables, maxPrice };
    }
    // console.log(variables);

    return variables;
  };

  const queryFunc = () => {
    let query = PRODUCTS_TEST;
    // console.log('contex', controlBar);

    /**проверка на сортировку и фильтр */
    if (
      (controlBar.sortName !== '' || controlBar.sortPrice !== '') &&
      controlBar.maxPrice &&
      controlBar.minPrice
    ) {
      query = PRODUCTS_TEST_SORT_FILTER_BY_MIN_MAX_PRICE;
      // console.log('PRODUCTS_TEST_SORT_FILTER_BY_MIN_MAX_PRICE');
    } else if (
      (controlBar.sortName !== '' || controlBar.sortPrice !== '') &&
      controlBar.minPrice
    ) {
      query = PRODUCTS_TEST_SORT_FILTER_BY_MIN_PRICE;
      // console.log('PRODUCTS_TEST_SORT_FILTER_BY_MIN_PRICE');
    } else if (
      (controlBar.sortName !== '' || controlBar.sortPrice !== '') &&
      controlBar.maxPrice
    ) {
      query = PRODUCTS_TEST_SORT_FILTER_BY_MAX_PRICE;
      // console.log('PRODUCTS_TEST_SORT_FILTER_BY_MAX_PRICE');
    } else if (controlBar.sortName !== '' || controlBar.sortPrice !== '') {
      query = PRODUCTS_TEST_SORT;
      // console.log('PRODUCTS_TEST_SORT');
    } else if (controlBar.maxPrice && controlBar.minPrice) {
      /**проверка на фильтр */
      query = PRODUCTS_TEST_FILTER_BY_MIN_MAX_PRICE;
      // console.log('PRODUCTS_TEST_FILTER_BY_MIN_MAX_PRICE');
    } else if (controlBar.minPrice) {
      query = PRODUCTS_TEST_FILTER_BY_MIN_PRICE;
      // console.log('PRODUCTS_TEST_FILTER_BY_MIN_PRICE');
    } else if (controlBar.maxPrice) {
      query = PRODUCTS_TEST_FILTER_BY_MAX_PRICE;
      // console.log('PRODUCTS_TEST_FILTER_BY_MAX_PRICE');
    }
    return query;
  };

  // получение данных о товарах
  const { loading, error, data } = useQuery(queryFunc(), {
    variables: variablesFunc(),
    pollInterval: 2000,
  });

  // действия, для выполнения, когда переключается страница
  useEffect(() => {
    // записываем предыдущие значения
    setPrevTotalPages(totalPages);
    setPrevTotalProducts(totalProducts);
    // получаем и вычисляем новые значения для товаров и страниц
    const totalPagesNew = data
      ? Math.ceil(
          data.products.pageInfo.offsetPagination.total /
            controlBar.productsPerPage
        )
      : prevTotalPages;

    const totalProductsNew = data
      ? data.products.pageInfo.offsetPagination.total
      : prevTotalProducts;
    // устанавливаем новые значения
    setTotalPages(totalPagesNew !== 0 ? totalPagesNew : 1);
    setTotalProducts(totalProductsNew);
  }, [
    controlBar.productsPerPage,
    controlBar.minPrice,
    controlBar.maxPrice,
    data,
    prevTotalPages,
    prevTotalProducts,
    totalPages,
    totalProducts,
  ]);

  // пока идет загрузка - выводим skeleton для того, чтобы не плыла верстка
  if (loading)
    return (
      <div>
        <ProductsBoard
          products={null}
          loading={loading}
          controlBarFaster={controlBar}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(newPage: any) => setCurrentPage(newPage)}
          totalProducts={totalProducts}
        />
      </div>
    );

  /**@TODO Добавить описание ошибки и красивую страницу */
  if (error) {
    console.error(error.message);
  }

  const products: IGetProductsSimple = data;

  // console.log(controlBar);

  return (
    <div>
      <ProductsBoard
        products={products}
        loading={loading}
        controlBarFaster={controlBar}
      />
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

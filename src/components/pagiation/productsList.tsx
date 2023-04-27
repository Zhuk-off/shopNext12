import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';
import Pagination from '.';
import { useQuery } from '@apollo/client';
import ProductsBoard from '../products';
import { IGetProductsSimple } from '@/src/interfaces/apollo/getProducts.interface';
import { PRODUCTS_TEST } from '@/src/utils/apollo/queriesConst';
import { useRouter } from 'next/router';
import { PerPage, ViewType } from '@/src/interfaces/productsView.interface';

export interface IControlBar {
  productsPerPage: PerPage;
  viewProducts: ViewType;
}

interface IControlBarContex {
  controlBar: IControlBar;
  setControlBars: Dispatch<SetStateAction<IControlBar>>;
}

export const ControlBarContext = createContext<IControlBarContex>({
  controlBar: {
    productsPerPage: 12,
    viewProducts: 'card',
  },
  setControlBars: () => {},
});

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
  const [controlBar, setControlBars] = useState<IControlBar>({
    productsPerPage: 12,
    viewProducts: 'card',
  });

  /* Необходимо, для того, чтобы при переходе на новую страницу стейт не сохранялся старый
  из за этого товар не найден, потому что он учавствует в запросе, а также при изменении вывода
  количества товаров на страницу*/
  useEffect(() => {
    setCurrentPage(1);
  }, [router.query.category, controlBar.productsPerPage]);

  // получение данных о товарах
  const { loading, error, data } = useQuery(PRODUCTS_TEST, {
    variables: {
      offset: (currentPage - 1) * controlBar.productsPerPage,
      size: controlBar.productsPerPage,
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
  if (error) return <p>Error :(</p>;

  const products: IGetProductsSimple = data;

  return (
    <div>
      <ControlBarContext.Provider value={{ controlBar, setControlBars }}>
        <ProductsBoard
          products={products}
          loading={loading}
          controlBarFaster={controlBar}
        />
      </ControlBarContext.Provider>
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

import Layout from "@/src/components/layouts";
import { MenuItem } from "@/src/interfaces/apollo/buildMenu.interface";
import { IData } from "@/src/interfaces/footerHeaderRestAPIDataResponse";
import buildMenu from "@/src/utils/buildMenu";
import { HEADER_FOOTER_ENDPOINT } from "@/src/utils/constants/endpoints";
import axios from "axios";
import { GetStaticProps } from "next";
import { getAllCategories } from "@/src/utils/apollo/queries";
import { CounterOrderPage } from "@/src/components/order/counterOrderPage";
import Container from "@/src/components/container";
import { TotalCard } from "@/src/components/order/totalCard";
import { useContext, useEffect } from "react";
import { CartContext } from "@/src/contex/CartContex";
import { useQuery } from "@apollo/client";
import {
  IOrderDataProductCard,
  IOrderProduct,
} from "@/src/interfaces/apollo/getOrderData.interfase";
import { GET_PRODUCTS_BY_IDS_ORDER_CARD } from "@/src/utils/apollo/queriesConst";
import { IPproductsDataOrder } from "@/src/interfaces/cart.interface";
import { CartOrderItems } from "@/src/components/order/cartOrderItems";
import { useRouter } from "next/router";
import {
  getDatabaseIds,
  getProductsOrderView,
  getTotalCountInStockProducts,
  getTotalSumInStockProducts,
} from "@/src/utils/helpers";
import { cartVar } from "@/src/utils/apollo/reactiveVar";

// const inter = Inter({ subsets: ['latin'] });

export default function Order({
  headerFooter,
  menu,
}: {
  headerFooter: IData | undefined;
  menu: MenuItem[];
}) {
  // const cartA = useReactiveVar(cartVar);
  const [cart, setCart] = useContext(CartContext);
  const router = useRouter();
  const databaseIds = getDatabaseIds(cart);

  let hasNextPage = false;
  let endCursor = "";
  let productsOrder: IOrderProduct[] = [];

  const {
    loading,
    data: productsByIds,
    fetchMore,
  } = useQuery<
    IOrderDataProductCard,
    { include: number[] | undefined; endCursor: string }
  >(GET_PRODUCTS_BY_IDS_ORDER_CARD, {
    variables: {
      include: databaseIds?.length !== 0 ? databaseIds : [0],
      // include:  databaseIds,
      endCursor,
    },
    pollInterval: 2000, // каждые .5 секунд обновляет данные
  });

  // Если все позиции удалены(количество 0), то удалить их из массива
  // Очистка массива и localstorage от данных с нулевым количеством
  useEffect(() => {
    if (
      cart &&
      cart.totalQty === 0 &&
      cart.cartItems?.length !== 0 &&
      cartVar().cartItems?.length !== 0
    ) {
      const filteredItems = cart.cartItems.filter(
        (item) => item.quantity !== 0
      );
      const updateCart = { ...cart, cartItems: filteredItems };
      cartVar(updateCart);
      setCart(updateCart);
    }
  }, [cart, setCart]);

  // console.log(data);
  // console.log(databaseIds);
  // console.log(cart);
  // console.log(cartVar());

  // я не знаю как это работает, но работает как нужно
  const loadMore = () => {
    if (productsByIds) {
      fetchMore({
        variables: {
          endCursor: productsByIds.products.pageInfo.endCursor,
        },

        updateQuery: (prevResult, { fetchMoreResult }) => {
          const newEdges = fetchMoreResult.products.edges;
          const pageInfo = fetchMoreResult.products.pageInfo;

          return newEdges && newEdges?.length
            ? {
                products: {
                  __typename: prevResult.products.__typename,
                  edges: [...prevResult.products.edges, ...newEdges],
                  pageInfo,
                },
              }
            : prevResult;
        },
      });
    }
  };
  // обновляет отрисовку объекта, загружая новые данные, загрузив обновляет снова, и так, пока
  // data.products.pageInfo.hasNextPage не будет равно false
  // может не корректная реализация, но работает как ожидалось
  if (productsByIds && productsByIds.products.pageInfo.hasNextPage) {
    loadMore();
  }

  // console.log(cart);

  // При переходе на другую страницу надо очистить скрытые элементы, которые удалили
  // useEffect(() => {

  //   function handleRouteChange() {
  //     if (!cart) return;
  //     if (typeof window !== 'undefined') {
  //       const filteredObj = cart.cartItems.filter(
  //         (item) => item.quantity !== 0
  //       );

  //       const getlocalStorage = localStorage.getItem('cartItems');
  //       const getLocalStorageParsed =
  //         getlocalStorage !== null ? JSON.parse(getlocalStorage) : null;
  //       /** если количество равно в контексте и в localStorage, то обноляем контекст
  //        * это может произойти если в соседней вкладке добавили товары, а в корзине
  //        * не обновили. Чтобы не перезаписать корзину старвыми данными нужна эта проверка
  //        */
  //       if (getLocalStorageParsed.totalQty !== cart.totalQty) {
  //         setCart(getLocalStorageParsed);
  //       }
  //       const cartClean = { ...cart };
  //       cartClean.cartItems = filteredObj;
  //       // console.log('cartClean', cartClean);
  //       // console.log('getLocalStorageParsed', getLocalStorageParsed);
  //       // console.log('cartClean', cartClean);
  //       setCart(cartClean);
  //     }
  //   }

  //   router.events.on('routeChangeStart', handleRouteChange);

  //   return () => {
  //     router.events.off('routeChangeStart', handleRouteChange);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  let sum = 0;
  let totalCount = 0;
  let productsDataOrder: IPproductsDataOrder[] = [];

  // собираем новый массив с объектами для order страницы
  if (!loading && productsByIds !== undefined && cart) {
    productsDataOrder = getProductsOrderView(cart, productsByIds);
    sum = getTotalSumInStockProducts(productsDataOrder);
    totalCount = getTotalCountInStockProducts(productsDataOrder);
  }

  return (
    <main>
      <Layout headerFooter={headerFooter || {}} menu={menu}>
        <Container>
          <div className="relative border-b font-semibold">
            <span className="inline-block border-b-2 border-black pb-5">
              Корзина
            </span>
            <span className="absolute left-16 top-0 inline-block text-xs font-bold">
              <CounterOrderPage />
            </span>
          </div>
          {!loading ? (
            <div className="mt-8 flex flex-grow flex-col gap-y-4 md:flex-row md:gap-y-0">
              <ul className="w-full flex-grow">
                {productsByIds && databaseIds && databaseIds?.length !== 0 ? (
                  <CartOrderItems productsDataOrder={productsDataOrder} />
                ) : (
                  <div className="border-b-2 border-b-pink-700 text-center text-lg font-semibold text-pink-700">
                    Нет товаров в корзине
                  </div>
                )}
              </ul>
              <div className=" rounded-lg shadow-lg md:ml-12">
                <TotalCard
                  sum={sum}
                  totalCount={totalCount}
                  loading={loading}
                />
              </div>
            </div>
          ) : (
            <div className="mt-8 h-[326px] font-medium text-gray-600">
              Обновление корзины...
            </div>
          )}
        </Container>
      </Layout>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data: headerFooterData } = await axios.get(HEADER_FOOTER_ENDPOINT);
  const categories = await getAllCategories();
  const menuObjectArr = buildMenu(categories);
  return {
    props: {
      headerFooter: headerFooterData?.data ?? {},
      menu: menuObjectArr,
    },
    revalidate: 1000,
  };
};

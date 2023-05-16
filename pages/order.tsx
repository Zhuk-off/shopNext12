import Layout from '@/src/components/layouts';
import { MenuItem } from '@/src/interfaces/apollo/buildMenu.interface';
import { IData } from '@/src/interfaces/footerHeaderRestAPIDataResponse';
import buildMenu from '@/src/utils/buildMenu';
import { HEADER_FOOTER_ENDPOINT } from '@/src/utils/constants/endpoints';
import axios from 'axios';
import { Inter } from 'next/font/google';
import { GetStaticProps } from 'next';
import { getAllCategories } from '@/src/utils/apollo/queries';
import { CounterOrderPage } from '@/src/components/order/counterOrderPage';
import Container from '@/src/components/container';
import { TotalCard } from '@/src/components/order/totalCard';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '@/src/contex/CartContex';
import { useQuery } from '@apollo/client';
import {
  IOrderDataProductCard,
  IOrderProduct,
} from '@/src/interfaces/apollo/getOrderData.interfase';
import { GET_PRODUCTS_BY_IDS_ORDER_CARD } from '@/src/utils/apollo/queriesConst';
import { IPproductsDataOrder } from '@/src/interfaces/cart.interface';
import { CartOrderItems } from '@/src/components/order/cartOrderItems';
import { useRouter } from 'next/router';

// const inter = Inter({ subsets: ['latin'] });

export default function Order({
  headerFooter,
  menu,
}: {
  headerFooter: IData | undefined;
  menu: MenuItem[];
}) {
  const [cart, setCart] = useContext(CartContext);
  const router = useRouter();
  const databaseIds = cart
    ? cart?.cartItems.map((item) => item.databaseId)
    : [0];

  let hasNextPage = false;
  let endCursor = '';
  let productsOrder: IOrderProduct[] = [];

  const { loading, data, fetchMore } = useQuery<
    IOrderDataProductCard,
    { include: number[] | undefined; endCursor: string }
  >(GET_PRODUCTS_BY_IDS_ORDER_CARD, {
    variables: {
      include: databaseIds,
      endCursor,
    },
    pollInterval: 2000, // каждые .5 секунд обновляет данные
  });

  // const { loading, data, fetchMore } = useQuery(GET_PRODUCTS_BY_IDS_ORDER_CARD, {
  //   variables: {
  //     include: databaseIds,
  //     endCursor,
  //   },
  //   pollInterval: 500,
  // });

  // я не знаю как это работает, но работает как нужно
  const loadMore = () => {
    if (data) {
      fetchMore({
        variables: {
          endCursor: data.products.pageInfo.endCursor,
        },

        updateQuery: (prevResult, { fetchMoreResult }) => {
          const newEdges = fetchMoreResult.products.edges;
          const pageInfo = fetchMoreResult.products.pageInfo;

          return newEdges && newEdges.length
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
  if (data && data.products.pageInfo.hasNextPage) {
    loadMore();
  }

  // При переходе на другую страницу надо очистить скрытые элементы, которые удалили
  useEffect(() => {
    function handleRouteChange() {
      if (!cart) return;
      if (typeof window !== 'undefined') {
        const filteredObj = cart.cartItems.filter(
          (item) => item.quantity !== 0
        );

        const getlocalStorage = localStorage.getItem('cartItems');
        const getLocalStorageParsed =
          getlocalStorage !== null ? JSON.parse(getlocalStorage) : null;
        /** если количество равно в контексте и в localStorage, то обноляем контекст
         * это может произойти если в соседней вкладке добавили товары, а в корзине
         * не обновили. Чтобы не перезаписать корзину старвыми данными нужна эта проверка
         */
        if (getLocalStorageParsed.totalQty !== cart.totalQty) {
          setCart(getLocalStorageParsed);
        }
        const cartClean = { ...cart };
        cartClean.cartItems = filteredObj;
        // console.log('cartClean', cartClean);
        // console.log('getLocalStorageParsed', getLocalStorageParsed);
        // console.log('cartClean', cartClean);
        setCart(cartClean);
      }
    }

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let sum = 0;
  let totalCount = 0;
  let productsDataOrder: IPproductsDataOrder[] = [];
  // собираем новый массив с объектами для order страницы
  if (!loading && data !== undefined && cart) {
    productsDataOrder = cart.cartItems.map<IPproductsDataOrder>((item) => {
      const product = data.products.edges.find(
        (edge) => edge.node.id === item.id
      )?.node;
      // console.log('product', product);

      return {
        id: item.id,
        quantity: item.quantity,
        databaseId: item.databaseId,
        stockStatus:
          product && product?.stockStatus
            ? product?.stockStatus
            : 'OUT_OF_STOCK',
        price: product?.price,
        uri: product?.uri,
        imageUrl: product?.image?.sourceUrl,
        altImage: product?.image?.altText,
        name: product?.name ? product?.name : '',
      };
    });

    sum =
      productsDataOrder.reduce(
        (acc, obj) =>
          acc +
          (obj.stockStatus === 'IN_STOCK'
            ? obj.quantity *
              parseInt(
                obj.price ? obj.price.replace('Br', '').replace(',', '') : ''
              )
            : 0),
        0
      ) / 100;

    totalCount = productsDataOrder.reduce(
      (acc, obj) => acc + (obj.stockStatus === 'IN_STOCK' ? obj.quantity : 0),
      0
    );
  }

  return (
    <main>
      <Layout headerFooter={headerFooter || {}} menu={menu}>
        <Container>
          <div className="relative cursor-pointer border-b font-semibold">
            <span className="inline-block border-b-2 border-black pb-5">
              Корзина
            </span>
            <span className="absolute left-16 top-0 inline-block text-xs font-bold">
              <CounterOrderPage />
            </span>
            <span className="absolute left-16 top-0 inline-block text-xs font-bold">
              <CounterOrderPage />
            </span>
          </div>
          <div className="mt-8 flex flex-grow">
            <ul className="w-full flex-grow">
              {data && databaseIds && databaseIds.length !== 0 && (
                <CartOrderItems productsDataOrder={productsDataOrder} />
              )}
            </ul>
            <div className="ml-12 rounded-lg shadow-lg">
              <TotalCard sum={sum} totalCount={totalCount} loading={loading} />
            </div>
          </div>
        </Container>
      </Layout>
    </main>
  );
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   const menu: ICategory[] = await getAllCategories();
//   return {
//     paths: menu.map((item) => `/${item.node.slug}`),
//     fallback: true,
//   };
// };

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

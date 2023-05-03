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
import { CartOrderItem } from '@/src/components/order/cartOrderItem';
import { TotalCard } from '@/src/components/order/totalCard';
import { useContext } from 'react';
import { CartContext } from '@/src/contex/CartCounter';
import { useQuery } from '@apollo/client';
import { IOrderDataProductCard } from '@/src/interfaces/apollo/getOrderData.interfase';
import { GET_PRODUCTS_BY_IDS_ORDER_CARD } from '@/src/utils/apollo/queriesConst';
import { IPproductsDataOrder } from '@/src/interfaces/cart.interface';

const inter = Inter({ subsets: ['latin'] });

export default function Category({
  headerFooter,
  menu,
}: {
  headerFooter: IData | undefined;
  menu: MenuItem[];
}) {
  const [cart] = useContext(CartContext);
  const databaseIds = cart?.cartItems.map((item) => item.databaseId);

  const { loading, data } = useQuery<
    IOrderDataProductCard,
    { include: number[] | undefined }
  >(GET_PRODUCTS_BY_IDS_ORDER_CARD, {
    variables: { include: databaseIds },
  });

  let sum = 0;
  let productsDataOrder: IPproductsDataOrder[] = [];
  // собираем новый массив с объектами для order страницы
  if (!loading && data !== undefined && cart) {
    productsDataOrder = cart.cartItems.map<IPproductsDataOrder>((item) => ({
      id: item.id,
      quantity: item.quantity,
      databaseId: item.databaseId,
      price: data.products.edges.find((edge) => edge.node.id === item.id)?.node
        .price,
    }));
    sum =
      productsDataOrder.reduce(
        (acc, obj) =>
          acc +
          obj.quantity *
            parseInt(
              obj.price ? obj.price.replace('Br', '').replace(',', '') : ''
            ),
        0
      ) / 100;
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
          </div>
          <div className="mt-8 flex flex-grow">
            <ul className="w-full flex-grow">
              {data &&
                databaseIds &&
                databaseIds.length !== 0 &&
                data.products.edges.map((product) => (
                  <li key={product.node.id}>
                    <CartOrderItem
                      availability={product.node.stockStatus === 'IN_STOCK'}
                      product={product.node}
                    />
                  </li>
                ))}
            </ul>
            {/* <CartOrderItem availability={true} /> */}
            <div className="ml-12 rounded-lg shadow-lg">
              <TotalCard
                sum={sum}
                totalCount={cart?.totalQty}
                loading={loading}
              />
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
    revalidate: 1,
  };
};

import { Inter } from 'next/font/google';
import Header from '@/src/components/layouts/header';
import { Slider } from '@/src/components/slider';
import { Banners } from '@/src/components/banners';
import Footer from '@/src/components/layouts/footer';
import Offers from '@/src/components/offers';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  ApolloQueryResult,
  useQuery,
} from '@apollo/client';
import { Users } from '@/src/utils/apollo/queries';
import { HEADER_FOOTER_ENDPOINT } from '@/src/utils/constants/endpoints';
import axios from 'axios';
import Layout from '@/src/components/layouts';
import {
  IData,
  IHeaderFooterContext,
} from '@/src/interfaces/footerHeaderRestAPIDataResponse';
import { MenuItem } from '@/src/interfaces/apollo/buildMenu.interface';
import { client } from '@/src/utils/apollo/apolloClient';
import {
  GET_CATEGORIES,
  GET_CATEGORY_WITH_PRODUCTS_OF_CILD,
} from '@/src/utils/apollo/queriesConst';
import buildMenu from '@/src/utils/buildMenu';
import { IGetCategories } from '@/src/interfaces/apollo/getCatigories.interface';
import { GetStaticProps } from 'next';
import { findObjectById, getAllChildSlugs } from '@/src/utils/getAllChildIds';
import { IProductCat } from '@/src/interfaces/apollo/getProducts.interface';

const inter = Inter({ subsets: ['latin'] });

export default function Home({
  headerFooter,
  menu,
}: {
  headerFooter: IData | undefined;
  menu: MenuItem[];
}) {
  const cats = ['akkumulyatornye-dreli-shurupoverty'];
  // console.log(menu);
  
  const foundObject = findObjectById(menu[0], 'akkumulyatornye-dreli-shurupoverty');
  const allSlugs = foundObject ? getAllChildSlugs(foundObject) : [];
  
  const { loading, error, data } = useQuery(
    GET_CATEGORY_WITH_PRODUCTS_OF_CILD,
    {
      variables: { categorySlugs:allSlugs },
    }
  );

  console.log('data', data);
  console.log('menu', menu);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <main className="">
      <Layout headerFooter={headerFooter || {}} menu={menu}>
        <div className="mb-20 mt-12 rounded-xl px-20 ">
          <Slider />
        </div>
        <Banners />
        <Offers />
      </Layout>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: headerFooterData } = await axios.get(HEADER_FOOTER_ENDPOINT);
  const { data: menu }: ApolloQueryResult<IGetCategories> = await client.query({
    query: GET_CATEGORIES,
  });
  const menuObject = buildMenu(menu.productCategories.edges);
  return {
    props: {
      headerFooter: headerFooterData?.data ?? {},
      menu: menuObject,
    },

    /**
     * Revalidate means that if a new request comes to server, then every 1 sec it will check
     * if the data is changed, if it is changed then it will update the
     * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
     */
    revalidate: 1,
  };
};

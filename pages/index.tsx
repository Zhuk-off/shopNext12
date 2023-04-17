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
import { GET_CATEGORIES } from '@/src/utils/apollo/queriesConst';
import buildMenu from '@/src/utils/buildMenu';
import { IGetCategories } from '@/src/interfaces/apollo/getCatigories.interface';

const inter = Inter({ subsets: ['latin'] });

export default function Home({
  headerFooter,
  menu
}: {
  headerFooter: IData | undefined;
  menu: MenuItem[];
}) {
  
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

export async function getStaticProps() {
  const { data: headerFooterData } = await axios.get(HEADER_FOOTER_ENDPOINT);
  const { data:menu }:ApolloQueryResult<IGetCategories> = await client.query({
    query: GET_CATEGORIES
  });
  const menuObject=buildMenu(menu.productCategories.edges)
  return {
    props: {
      headerFooter: headerFooterData?.data ?? {},
      menu: menuObject
    },

    /**
     * Revalidate means that if a new request comes to server, then every 1 sec it will check
     * if the data is changed, if it is changed then it will update the
     * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
     */
    revalidate: 1,
  };
}

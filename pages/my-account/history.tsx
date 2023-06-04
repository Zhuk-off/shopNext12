import Container from '@/src/components/container';
import Layout from '@/src/components/layouts';
import MyAccountNavMenu from '@/src/components/myAccount/myAccountNavMenu';
import OrderHistory from '@/src/components/myAccount/orderHistory';
import { MenuItem } from '@/src/interfaces/apollo/buildMenu.interface';
import { IData } from '@/src/interfaces/footerHeaderRestAPIDataResponse';
import { getAllCategories } from '@/src/utils/apollo/queries';
import buildMenu from '@/src/utils/buildMenu';
import { HEADER_FOOTER_ENDPOINT } from '@/src/utils/constants/endpoints';
import axios from 'axios';
import { GetStaticProps } from 'next';
import { useSession } from 'next-auth/react';

export default function MyAccount({
  headerFooter,
  menu,
}: {
  headerFooter: IData | undefined;
  menu: MenuItem[];
}) {
  const { data: session } = useSession();

  return (
    <Layout headerFooter={headerFooter || {}} menu={menu}>
      <Container>
        <div className="flex flex-col sm:grid sm:grid-cols-4">
          <div className=" sm:h-min-1/2  sm:col-span-1">
            <MyAccountNavMenu />
          </div>
          <div className=" sm:col-span-3">
            <OrderHistory />{' '}
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: headerFooterData } = await axios.get(HEADER_FOOTER_ENDPOINT);
  const categories = await getAllCategories();
  const menuObject = buildMenu(categories);
  return {
    props: {
      headerFooter: headerFooterData?.data ?? {},
      menu: menuObject,
    },
    revalidate: 1000,
  };
};

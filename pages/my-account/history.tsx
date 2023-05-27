import Container from '@/src/components/container';
import Layout from '@/src/components/layouts';
import MyAccountNavMenu from '@/src/components/myAccount/myAccountNavMenu';
import OrderHistory from '@/src/components/myAccount/orderHistory';
import { CartContext } from '@/src/contex/CartContex';
import { MenuItem } from '@/src/interfaces/apollo/buildMenu.interface';
import { IOrders } from '@/src/interfaces/apollo/historyPage.interface';
import { IRefreshJwtAuthToken } from '@/src/interfaces/apollo/login.interface';
import { IData } from '@/src/interfaces/footerHeaderRestAPIDataResponse';
import { REFRESH_JWT_AUTH_TOKEN } from '@/src/utils/apollo/mutationsConst';
import { getAllCategories } from '@/src/utils/apollo/queries';
import { GET_ORDERS } from '@/src/utils/apollo/queriesConst';
import buildMenu from '@/src/utils/buildMenu';
import { HEADER_FOOTER_ENDPOINT } from '@/src/utils/constants/endpoints';
import {
  IAuthorizationHeader,
  getAuthorizationHeaderWithAuthToken,
  getToken,
  setTokensInLocalStorage,
} from '@/src/utils/helpers/localStorageHelpers';
import { useMutation, useQuery } from '@apollo/client';
import axios from 'axios';
import { GetStaticProps } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

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
        <div className="grid grid-cols-4">
          <div className="col-span-1 h-min-1/2">
            <MyAccountNavMenu />
          </div>
          <div className="col-span-3">
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
    revalidate: 1,
  };
};

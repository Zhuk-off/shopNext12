import Container from '@/src/components/container';
import Layout from '@/src/components/layouts';
import MyAccountNavMenu from '@/src/components/myAccount/myAccountNavMenu';
import PersonalData from '@/src/components/myAccount/personalData';
import { MenuItem } from '@/src/interfaces/apollo/buildMenu.interface';
import { IData } from '@/src/interfaces/footerHeaderRestAPIDataResponse';
import { getAllCategories } from '@/src/utils/apollo/queries';
import buildMenu from '@/src/utils/buildMenu';
import { HEADER_FOOTER_ENDPOINT } from '@/src/utils/constants/endpoints';
import axios from 'axios';
import { GetStaticProps } from 'next';

export default function MyAccount({
  headerFooter,
  menu,
}: {
  headerFooter: IData | undefined;
  menu: MenuItem[];
}) {
  return (
    <Layout headerFooter={headerFooter || {}} menu={menu}>
      <Container>
        <div className="grid grid-cols-4">
          <div className="col-span-1">
            <MyAccountNavMenu />
          </div>
          <div className="col-span-3 p-4">
            <h1 className="mb-5 px-10 text-xl font-medium text-gray-900">
              Личные данные
            </h1>
            <PersonalData />
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

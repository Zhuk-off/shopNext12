import { Inter } from 'next/font/google';
import { Slider } from '@/src/components/slider';
import { Banners } from '@/src/components/banners';
import Offers from '@/src/components/offers';
import { HEADER_FOOTER_ENDPOINT } from '@/src/utils/constants/endpoints';
import axios from 'axios';
import Layout from '@/src/components/layouts';
import { IData } from '@/src/interfaces/footerHeaderRestAPIDataResponse';
import { MenuItem } from '@/src/interfaces/apollo/buildMenu.interface';
import buildMenu from '@/src/utils/buildMenu';
import { GetStaticProps } from 'next';
import { findObjectById, getAllChildSlugs } from '@/src/utils/getAllChildIds';
import { getAllCategories } from '@/src/utils/apollo/queries';
import Search from '@/src/components/search';
import Container from '@/src/components/container';
import { signOut, useSession } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export default function Home({
  headerFooter,
  menu,
}: {
  headerFooter: IData | undefined;
  menu: MenuItem[];
}) {
  const { data: session } = useSession({
    required: true,
  });
  const foundObject = findObjectById(
    menu[0],
    'akkumulyatornye-dreli-shurupoverty'
  );
  const allSlugs = foundObject ? getAllChildSlugs(foundObject) : [];
  // console.log(menu);

  // const { loading, error, data } = useQuery(
  //   GET_CATEGORY_WITH_PRODUCTS_OF_CILD,
  //   {
  //     variables: { categorySlugs:allSlugs },
  //   }
  // );

  // if (loading) return 'Loading...';
  // if (error) return `Error! ${error.message}`;

  // Проверка авторизации, если пользователь не авторизован, то чтобы не мелькал
  // экран мы показываем пустоту до того, как произойдет перенаправление на страницу авторизации
  if (!session) return <></>;

  return (
    <main className="">
      <Layout headerFooter={headerFooter || {}} menu={menu}>
        {/* Кнопка, которая завершит авторизованную сессию */}
        <button className="border p-2" onClick={(_) => signOut()}>
          SignOut
        </button>
        {/* ---------------------------------------------- */}
        <Container>
          <Search />
        </Container>
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

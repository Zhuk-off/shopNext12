import Layout from '@/src/components/layouts';
import { MenuItem } from '@/src/interfaces/apollo/buildMenu.interface';
import {
  ChildSlugNameByCategory,
  ICategory,
  IProductCategoryData,
} from '@/src/interfaces/apollo/getCatigories.interface';
import { IData } from '@/src/interfaces/footerHeaderRestAPIDataResponse';
import { client } from '@/src/utils/apollo/apolloClient';
import { GET_CATEGORY_DATA } from '@/src/utils/apollo/queriesConst';
import buildMenu from '@/src/utils/buildMenu';
import { HEADER_FOOTER_ENDPOINT } from '@/src/utils/constants/endpoints';
import { ApolloQueryResult } from '@apollo/client';
import axios from 'axios';
import { Inter } from 'next/font/google';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import {
  findObjectById,
  getAllChildSlugs,
  getAllChildSlugsAndName,
} from '@/src/utils/getAllChildIds';
import Breadcrumbs from '@/src/components/breadcrumbs';
import SubCategories from '@/src/components/subCategories';
import { DividerH } from '@/src/components/divider';
import Container from '@/src/components/container';
import ProductsList from '@/src/components/pagiation/productsList';
import Search from '@/src/components/search';
import { getAllCategories } from '@/src/utils/apollo/queries';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export default function Category({
  headerFooter,
  menu,
  category,
  childrenSlugName,
  allSlugs,
}: {
  headerFooter: IData | undefined;
  menu: MenuItem[];
  category: IProductCategoryData;
  childrenSlugName: ChildSlugNameByCategory[];
  allSlugs: string[];
}) {
  const router = useRouter();
  // надо для сборки build, чтобы на возникало ошибки
  if (router.isFallback) {
    return <h1>Загрузка...</h1>;
  }
  return (
    <main className="">
      <NextSeo
        title={category?.productCategory?.name}
        description={category?.productCategory?.name}
        nofollow
        noindex
      />
      <Layout headerFooter={headerFooter || {}} menu={menu}>
        <Container>
          {category?.productCategory?.seo?.breadcrumbs ? (
            <Breadcrumbs
              breadcrumbs={category.productCategory.seo?.breadcrumbs}
            />
          ) : null}
          <h1 className="mt-5 text-2xl font-semibold">
            {category?.productCategory?.name}
          </h1>
          <div className="mt-3">
            <SubCategories childrenSlugName={childrenSlugName} />
          </div>
          <DividerH />
          <Search />
          <DividerH />
          <div className="mt-5">
            <ProductsList mainAndChildrenSlugs={allSlugs} />
          </div>
        </Container>
      </Layout>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const menu: ICategory[] = await getAllCategories();
  return {
    paths: menu.map((item) => `/${item.node.slug}`),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data: headerFooterData } = await axios.get(HEADER_FOOTER_ENDPOINT);
  const categories = await getAllCategories();
  const menuObjectArr = buildMenu(categories);
  // Проверка не является ли params - undefined, null, array
  let slug = params ? params.category : '';
  if (!slug) {
    slug = '';
  }
  if (Array.isArray(slug)) {
    slug = slug[0];
  }
  // Получаем объект категории текущей
  const foundObject = menuObjectArr
    .map((cat) => findObjectById(cat, slug))
    .find((cat) => cat !== null);
  // Получаем все slug дочерних элементов
  let allSlugs = foundObject ? getAllChildSlugs(foundObject) : [];
  // Еще кладем туда текущую категорию
  allSlugs.push(slug);

  const { data: category }: ApolloQueryResult<IProductCategoryData> =
    await client.query({
      query: GET_CATEGORY_DATA,
      variables: { id: slug },
    });

  const childrenSlugName = foundObject
    ? getAllChildSlugsAndName(foundObject)
    : [];

  return {
    props: {
      headerFooter: headerFooterData?.data ?? {},
      menu: menuObjectArr,
      params,
      category,
      childrenSlugName,
      allSlugs,
    },
    revalidate: 1,
  };
};

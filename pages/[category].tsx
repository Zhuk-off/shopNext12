import Layout from '@/src/components/layouts';
import { MenuItem } from '@/src/interfaces/apollo/buildMenu.interface';
import {
  ICategory,
  IGetCategories,
  IProductCategoryData,
} from '@/src/interfaces/apollo/getCatigories.interface';
import { IData } from '@/src/interfaces/footerHeaderRestAPIDataResponse';
import { client } from '@/src/utils/apollo/apolloClient';
import {
  GET_CATEGORIES,
  GET_CATEGORY_DATA,
  GET_CATEGORY_WITH_PRODUCTS_OF_CILD,
} from '@/src/utils/apollo/queriesConst';
import buildMenu from '@/src/utils/buildMenu';
import { HEADER_FOOTER_ENDPOINT } from '@/src/utils/constants/endpoints';
import { ApolloQueryResult, useQuery } from '@apollo/client';
import axios from 'axios';
import { Inter } from 'next/font/google';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { findObjectById, getAllChildSlugs } from '@/src/utils/getAllChildIds';
import { IProductCat } from '@/src/interfaces/apollo/getProducts.interface';
import Breadcrumbs from '@/src/components/breadcrumbs';

const inter = Inter({ subsets: ['latin'] });

export default function Category({
  headerFooter,
  menu,
  productsFromCat,
  category,
}: {
  headerFooter: IData | undefined;
  menu: MenuItem[];
  productsFromCat: IProductCat[];
  category: IProductCategoryData;
}) {
  console.log(category.productCategory.name);
  console.log(productsFromCat);

  return (
    <main className="">
      <Layout headerFooter={headerFooter || {}} menu={menu}>
        <div className="container mx-auto max-w-7xl px-4">
          {category.productCategory.seo?.breadcrumbs ? (
            <Breadcrumbs
              breadcrumbs={category.productCategory.seo?.breadcrumbs}
            />
          ) : null}
        </div>
      </Layout>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: menu }: ApolloQueryResult<IGetCategories> = await client.query({
    query: GET_CATEGORIES,
  });
  return {
    paths: menu.productCategories.edges.map((item) => `/${item.node.slug}`),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data: headerFooterData } = await axios.get(HEADER_FOOTER_ENDPOINT);
  const { data: menu }: ApolloQueryResult<IGetCategories> = await client.query({
    query: GET_CATEGORIES,
  });

  const menuObjectArr = buildMenu(menu.productCategories.edges);

  // Проверка не является ли params - undefined, null, array
  let slug = params ? params.category : '';
  if (!slug) {
    slug = '';
  }
  if (Array.isArray(slug)) {
    slug = slug[0];
  }

  // Получаем объект категории текущей
  const foundObject = findObjectById(menuObjectArr[0], slug);
  // Получаем все slug дочерних элементов
  let allSlugs = foundObject ? getAllChildSlugs(foundObject) : [];
  // Еще кладем туда текущую категорию
  allSlugs.push(slug);
  // Получаем продукты из массива текущей категории и дочерних категорий, если они есть
  const { data: productsFromCat }: ApolloQueryResult<IProductCat[]> =
    await client.query({
      query: GET_CATEGORY_WITH_PRODUCTS_OF_CILD,
      variables: { categorySlugs: allSlugs },
    });

  const { data: category }: ApolloQueryResult<IProductCategoryData> =
    await client.query({
      query: GET_CATEGORY_DATA,
      variables: { id: slug },
    });

  return {
    props: {
      headerFooter: headerFooterData?.data ?? {},
      menu: menuObjectArr,
      params,
      productsFromCat,
      category,
    },
    revalidate: 1,
  };
};

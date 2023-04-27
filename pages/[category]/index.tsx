import Layout from '@/src/components/layouts';
import { MenuItem } from '@/src/interfaces/apollo/buildMenu.interface';
import {
  ChildSlugNameByCategory,
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
import { ApolloQueryResult, gql, useQuery } from '@apollo/client';
import axios from 'axios';
import { Inter } from 'next/font/google';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import {
  findObjectById,
  getAllChildSlugs,
  getAllChildSlugsAndName,
} from '@/src/utils/getAllChildIds';
import {
  IGetProductsSimple,
  IProductCat,
} from '@/src/interfaces/apollo/getProducts.interface';
import Breadcrumbs from '@/src/components/breadcrumbs';
import SubCategories from '@/src/components/subCategories';
import { DividerH } from '@/src/components/divider';
import Container from '@/src/components/container';
import ProductsList from '@/src/components/pagiation/productsList';
import Search from '@/src/components/search';
import { getAllCategories } from '@/src/utils/apollo/queries';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export default function Category({
  headerFooter,
  menu,
  productsFromCat,
  category,
  childrenSlugName,

}: {
  headerFooter: IData | undefined;
  menu: MenuItem[];
  productsFromCat: IGetProductsSimple;
  category: IProductCategoryData;
  childrenSlugName: ChildSlugNameByCategory[];
}) {

  // const first8Elem = childrenSlugName?.slice(0, 8);
  const first8Elem = childrenSlugName

  // console.log(productsFromCat);
  // console.log('foundObject', foundObject );
  console.log('category', category );



  return (
    <main className="">
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
            <SubCategories childrenSlugName={first8Elem} />
          </div>
          <DividerH />
          <Search />
          <DividerH />
          <div className="mt-5">
            <ProductsList currentPageProps={1} />
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
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data: headerFooterData } = await axios.get(HEADER_FOOTER_ENDPOINT);
  // const { data: menu }: ApolloQueryResult<IGetCategories> = await client.query({
  //   query: GET_CATEGORIES,
  // });
  // const menuObjectArr = buildMenu(menu.productCategories.edges);
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
  const foundObject = menuObjectArr.find((cat) => findObjectById(cat, slug));
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

  const childrenSlugName = foundObject
    ? getAllChildSlugsAndName(foundObject)
    : [];

  return {
    props: {
      headerFooter: headerFooterData?.data ?? {},
      menu: menuObjectArr,
      params,
      productsFromCat,
      category,
      childrenSlugName,
      allSlugs,
      foundObject,
    },
    revalidate: 1,
  };
};

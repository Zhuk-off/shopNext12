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
import { ApolloQueryResult, useQuery } from '@apollo/client';
import axios from 'axios';
import { Inter } from 'next/font/google';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import {
  findObjectById,
  getAllChildSlugs,
  getAllChildSlugsAndName,
} from '@/src/utils/getAllChildIds';
import { IGetProductsSimple, IProductCat } from '@/src/interfaces/apollo/getProducts.interface';
import Breadcrumbs from '@/src/components/breadcrumbs';
import SubCategories from '@/src/components/subCategories';
import ProductsBoard from '@/src/components/products';
import {DividerH} from '@/src/components/divider';
import Container from '@/src/components/container';

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
  // console.log(category.productCategory.name);
  console.log(productsFromCat);
  // console.log(childrenSlugName);
  // console.log(getAllChildSlugsAndName(foundObject));
  const first8Elem = childrenSlugName.slice(0, 8);
  return (
    <main className="">
      <Layout headerFooter={headerFooter || {}} menu={menu}>
        <Container>
          {category.productCategory.seo?.breadcrumbs ? (
            <Breadcrumbs
              breadcrumbs={category.productCategory.seo?.breadcrumbs}
            />
          ) : null}
        <h1 className="mt-5 text-2xl font-semibold">
          {category.productCategory.name}
        </h1>
        <div className="mt-3">
          <SubCategories childrenSlugName={first8Elem} />
        </div>
        <DividerH />
        <div className="mt-5">
          <ProductsBoard products={productsFromCat} />
        </div>
        </Container>
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
    },
    revalidate: 1,
  };
};

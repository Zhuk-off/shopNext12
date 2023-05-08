import Layout from '@/src/components/layouts';
import { MenuItem } from '@/src/interfaces/apollo/buildMenu.interface';
import { IData } from '@/src/interfaces/footerHeaderRestAPIDataResponse';
import buildMenu from '@/src/utils/buildMenu';
import { HEADER_FOOTER_ENDPOINT } from '@/src/utils/constants/endpoints';
import axios from 'axios';
import { Inter } from 'next/font/google';
import { GetStaticProps } from 'next';
import { IGetProductsSimple } from '@/src/interfaces/apollo/getProducts.interface';
import { DividerH } from '@/src/components/divider';
import Container from '@/src/components/container';
import Search from '@/src/components/search';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getAllCategories } from '@/src/utils/apollo/queries';
import ProductsListSearch from '@/src/components/pagiation/productsListSearch';

const inter = Inter({ subsets: ['latin'] });

export default function SearchPage({
  headerFooter,
  menu,
}: // productsFromCat,

// childrenSlugName,
{
  headerFooter: IData | undefined;
  menu: MenuItem[];
  productsFromCat: IGetProductsSimple;
  // category: IProductCategoryData;
  // childrenSlugName: ChildSlugNameByCategory[];
}) {
  const router = useRouter();
  const [foundProducts, setFoundProducts] = useState<IGetProductsSimple>();

  // const first8Elem = childrenSlugName?.slice(0, 8);
  return (
    <main className="">
      <Layout headerFooter={headerFooter || {}} menu={menu}>
        <Container>
          <h1 className="mt-5 text-2xl font-semibold">Результаты поиска</h1>
          <div className="mt-3">
            {/* <SubCategories childrenSlugName={first8Elem} /> */}
          </div>
          <DividerH />
          <Search setFoundProducts={setFoundProducts} />
          <DividerH />
          <div className="mt-5">
            <ProductsListSearch />
          </div>
        </Container>
      </Layout>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: headerFooterData } = await axios.get(HEADER_FOOTER_ENDPOINT);
  // const { data: menu }: ApolloQueryResult<IGetCategories> = await client.query({
  //   query: GET_CATEGORIES,
  // });

  const categories = await getAllCategories();
  const menuObjectArr = buildMenu(categories);
  // const menuObjectArr = buildMenu(menu.productCategories.edges);

  // Проверка не является ли params - undefined, null, array
  // let slug = params ? params.category : '';
  // if (!slug) {
  //   slug = '';
  // }
  // if (Array.isArray(slug)) {
  //   slug = slug[0];
  // }

  // Получаем объект категории текущей
  // const foundObject = findObjectById(menuObjectArr[0], slug);
  // Получаем все slug дочерних элементов
  // let allSlugs = foundObject ? getAllChildSlugs(foundObject) : [];
  // Еще кладем туда текущую категорию
  // allSlugs.push(slug);
  // Получаем продукты из массива текущей категории и дочерних категорий, если они есть
  // const { data: productsFromCat }: ApolloQueryResult<IProductCat[]> =
  //   await client.query({
  //     query: GET_CATEGORY_WITH_PRODUCTS_OF_CILD,
  //     variables: { categorySlugs: allSlugs },
  //   });

  // const { data: category }: ApolloQueryResult<IProductCategoryData> =
  //   await client.query({
  //     query: GET_CATEGORY_DATA,
  //     variables: { id: slug },
  //   });

  // const childrenSlugName = foundObject
  //   ? getAllChildSlugsAndName(foundObject)
  //   : [];

  return {
    props: {
      headerFooter: headerFooterData?.data ?? {},
      menu: menuObjectArr,
      // params,
      // productsFromCat,
      // category,
      // childrenSlugName,
    },
    revalidate: 1,
  };
};

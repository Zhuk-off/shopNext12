import Layout from '@/src/components/layouts';
import { MenuItem } from '@/src/interfaces/apollo/buildMenu.interface';
import { IData } from '@/src/interfaces/footerHeaderRestAPIDataResponse';
import buildMenu from '@/src/utils/buildMenu';
import { HEADER_FOOTER_ENDPOINT } from '@/src/utils/constants/endpoints';
import axios from 'axios';
import { Inter } from 'next/font/google';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Container from '@/src/components/container';
import { getAllCategories } from '@/src/utils/apollo/queries';
import {
  getAllProductsURI,
  getProductDataByURI,
} from '@/src/utils/helpers/getStaticPathHelpers';
import { IProductPage } from '@/src/interfaces/apollo/productPage.interface';
import { formatBelarusianCurrency } from '@/src/utils/helpers';
import { CartAddButton } from '@/src/components/products/cartAddButton';
import { sanitize } from '@/src/utils/miscellaneous';
import { SliderProductPage } from '@/src/components/sliderProductPage';

const inter = Inter({ subsets: ['latin'] });

export default function Category({
  headerFooter,
  menu,

  productData,
}: {
  headerFooter: IData | undefined;
  menu: MenuItem[];
  productData: IProductPage;
}) {
  const { product } = productData;
  console.log(productData);
  return (
    <main className="">
      <Layout headerFooter={headerFooter || {}} menu={menu}>
        <Container>
          <div className="grid grid-cols-5 ">
            <div className="col-span-3 my-4 border-r border-gray-200 pr-8">
              <SliderProductPage
                images={product?.galleryImages?.edges}
                coverImage={product?.image}
              />
            </div>
            <div className="col-span-2 px-5 py-4">
              <h1 className=" text-2xl font-bold text-gray-700">
                {product?.name}
              </h1>
              <div className="mt-8 flex items-center space-x-8">
                <div className="">
                  {product?.price ? (
                    <div className="text-3xl font-bold text-pink-700">
                      {formatBelarusianCurrency(product.price)}
                      <span className="text-lg font-medium"> р.</span>
                    </div>
                  ) : null}
                </div>
                <div className="">
                  <CartAddButton
                    buttonStatus={
                      product.stockStatus === 'IN_STOCK' ? 'enable' : 'disable'
                    }
                    databaseId={product.databaseId}
                    idProduct={product.id}
                  />
                </div>
              </div>
              <div className="mt-4">
                {product.stockStatus === 'IN_STOCK' ? (
                  <span className="font-semibold text-green-600">
                    В наличии
                  </span>
                ) : (
                  <span className="font-semibold text-pink-600">
                    {' '}
                    Нет на складе
                  </span>
                )}
              </div>
              <div className="mt-4 inline-block border-b-2 border-b-pink-200 uppercase tracking-tight text-gray-700">
                Описание
              </div>
              <div
                className="mt-4 text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: sanitize(product?.description ?? ''),
                }}
              />
            </div>
          </div>
        </Container>
      </Layout>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: string[] = await getAllProductsURI();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data: headerFooterData } = await axios.get(HEADER_FOOTER_ENDPOINT);
  const categories = await getAllCategories();
  const menuObjectArr = buildMenu(categories);
  const slug = params?.product;
  const productData = slug ? await getProductDataByURI(slug) : {};

  return {
    props: {
      headerFooter: headerFooterData?.data ?? {},
      menu: menuObjectArr,
      params,
      slug,
      productData,
    },
    revalidate: 1000,
  };
};

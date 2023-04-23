import {
  IGetProductsSimple,
  IProductCat,
} from '@/src/interfaces/apollo/getProducts.interface';
import { IBreadcrumbs } from '@/src/interfaces/seo.interfaces';
import { getSlugFromUrl } from '@/src/utils/helpers';
import {
  ChevronDoubleRightIcon,
  Square2StackIcon,
  Square3Stack3DIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { FC, useState } from 'react';
import ProductCardHorisontal from './ProductCardHorisontal';
import Container from '../container';
import ProductCardVertical from './ProductCardVertical';

type ViewType = 'list' | 'card';

const ProductsBoard = ({
  products,
  loading,
}: {
  products: IGetProductsSimple | null;
  loading: boolean;
}) => {
  const [viewType, setViewType] = useState<ViewType>('card');
  const toggleViewType = () => {
    setViewType(viewType === 'list' ? 'card' : 'list');
  };

  const PRODUCT_PER_PAGE = 12;
  if (loading) {
    const arraySceleton = new Array(PRODUCT_PER_PAGE).fill(0);

    return (
      <section>
        <Container>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-4 flex items-center justify-end">
              <button
                className="mr-2 text-gray-500 hover:text-gray-700"
                onClick={toggleViewType}
              >
                {viewType === 'list' ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                    />
                  </svg>
                )}
              </button>
            </div>

            <ul className="flex flex-col gap-2">
              {viewType === 'list' ? (
                arraySceleton.map((item, index) => {
                  return (
                    <li key={index}>
                      <ProductCardHorisontal
                        key={index}
                        product={null}
                        loading={loading}
                      />
                    </li>
                  );
                })
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                  {arraySceleton.map((item, index) => {
                    return (
                      <li key={index} className=" ">
                        <ProductCardVertical
                          key={index}
                          product={null}
                          loading={loading}
                        />
                      </li>
                    );
                  })}
                </div>
              )}
            </ul>
          </div>

          {/* {products.products.edges.map((product, index) => {
        // Если товар вариативный, а мы выводим простой товар, то вариативный отображается в виде пустых объектов, чтобы убрать пустой товар делаем проверку на пустой id
        if (!product.node.id) return null;

        return (
          <li key={product.node.id} className=" ">
            <ProductCardHorisontal
              key={product.node.id}
              product={product.node}
            />
          </li>
        );
      })} */}
        </Container>
      </section>
    );
  }
  if (products === null) return null;

  return (
    <section>
      <Container>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center justify-end">
            <button
              className="mr-2 text-gray-500 hover:text-gray-700"
              onClick={toggleViewType}
            >
              {viewType === 'list' ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                  />
                </svg>
              )}
            </button>
          </div>

          <ul className="flex flex-col gap-2">
            {viewType === 'list' ? (
              products.products.edges.map((product, index) => {
                // Если товар вариативный, а мы выводим простой товар, то вариативный отображается в виде пустых объектов, чтобы убрать пустой товар делаем проверку на пустой id
                if (!product.node.id) return null;

                return (
                  <li key={product.node.id} className=" ">
                    <ProductCardHorisontal
                      key={product.node.id}
                      product={product.node}
                      loading={loading}
                    />
                  </li>
                );
              })
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                {products.products.edges.map((product, index) => {
                  // Если товар вариативный, а мы выводим простой товар, то вариативный отображается в виде пустых объектов, чтобы убрать пустой товар делаем проверку на пустой id
                  if (!product.node.id) return null;

                  return (
                    <li key={product.node.id} className=" ">
                      <ProductCardVertical
                        key={product.node.id}
                        product={product.node}
                        loading={loading}
                      />
                    </li>
                  );
                })}
              </div>
            )}
          </ul>
        </div>

        {/* {products.products.edges.map((product, index) => {
          // Если товар вариативный, а мы выводим простой товар, то вариативный отображается в виде пустых объектов, чтобы убрать пустой товар делаем проверку на пустой id
          if (!product.node.id) return null;

          return (
            <li key={product.node.id} className=" ">
              <ProductCardHorisontal
                key={product.node.id}
                product={product.node}
              />
            </li>
          );
        })} */}
      </Container>
    </section>
  );
};

export default ProductsBoard;

import { IGetProductsSimple } from '@/src/interfaces/apollo/getProducts.interface';
import { useContext, useState } from 'react';
import ProductCardHorisontal from './ProductCardHorisontal';
import Container from '../container';
import ProductCardVertical from './ProductCardVertical';
import { ViewButton } from './viewButton';
import ProductsPerPageDropdown from './productsPerPagePageDropdown';
import { ControlBarContext, IControlBar } from '../pagiation/productsList';
import { SortPriceButton } from './SortPriceButton';
import { SortNameButton } from './SortNameButton';
import { FilterPrice } from './filterPrice';
import { DividerH } from '../divider';

const ProductsBoard = ({
  products,
  loading,
  controlBarFaster,
}: {
  products: IGetProductsSimple | null;
  loading: boolean;
  controlBarFaster: IControlBar;
}) => {
  const { controlBar, setControlBars } = useContext(ControlBarContext);

  /* создаем пустой массив с количеством равное колечеству товаров выводимых на страницу
      отрисовываем вариант со скелетонами */
  // @TODO можно оптимизировать используя в основном коде loading, как переключатель
  // controlBarFaster - используется потому что из-за асинхронности контекст не успевает обновиться(вероятно)
  if (loading) {
    const arraySceleton = new Array(controlBar.productsPerPage).fill(0);
    return (
      <section>
        <Container>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-4 flex items-center justify-end gap-2"></div>
            <ul className="flex flex-col gap-2">
              {controlBarFaster.viewProducts === 'list' ? (
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
                      <li key={index}>
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
        </Container>
      </section>
    );
  }

  // если товаров нет во входящих параметрах, то не отображаем
  if (products === null) return null;

  return (
    <section>
      <Container>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
          <div className="mb-8 flex items-center justify-end flex-col xl:flex-row border border-gray-200">
            <div className="my-4 lg:my-2">
              <FilterPrice />
            </div>
            <div className="py-4 lg:py-2 pl-4 border-l border-gray-200">
              <span className="pr-2 lg:py-2 inline-block">Сортировать по:</span>
              <SortNameButton />
              <SortPriceButton />
            </div>
            <div className='flex pl-4 border-l border-gray-200 gap-4'>
              <ProductsPerPageDropdown />
              <ViewButton />
            </div>
          </div>

          <ul className="flex flex-col gap-2">
            {controlBar.viewProducts === 'list' ? (
              products.products.edges.length !== 0 ? (
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
                <h2 className="text-xl font-semibold">Товаров не найдено</h2>
              )
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                {products.products.edges.length !== 0 ? (
                  products.products.edges.map((product, index) => {
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
                  })
                ) : (
                  <h2 className="text-xl font-semibold">Товаров не найдено</h2>
                )}
              </div>
            )}
          </ul>
        </div>
      </Container>
    </section>
  );
};

export default ProductsBoard;

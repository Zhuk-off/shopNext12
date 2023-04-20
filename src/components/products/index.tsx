import {
  IGetProductsSimple,
  IProductCat,
} from '@/src/interfaces/apollo/getProducts.interface';
import { IBreadcrumbs } from '@/src/interfaces/seo.interfaces';
import { getSlugFromUrl } from '@/src/utils/helpers';
import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { FC } from 'react';
import ProductCard from './cardPreview';
import Container from '../container';

const ProductsBoard = ({ products }: { products: IGetProductsSimple }) => {
  return (
    <section>
      <Container>
        <ul className='flex flex-col gap-2'>

        {products.products.edges.map((product, index) => {
          // Если товар вариативный, а мы выводим простой товар, то вариативный отображается в виде пустых объектов, чтобы убрать пустой товар делаем проверку на пустой id
          if (!product.node.id) return null;
          
          return (
            <li key={product.node.id} className=' '>
              <ProductCard key={product.node.id} product={product.node} />
            </li>
          );
        })}
        </ul>
      </Container>
    </section>
  );
};

export default ProductsBoard;

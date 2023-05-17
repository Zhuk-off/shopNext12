import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { gql } from 'graphql-tag';
import Link from 'next/link';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { IGetProductsSimple } from '@/src/interfaces/apollo/getProducts.interface';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { Spinner } from '../spinner';

const SEARCH_PRODUCTS_QUERY = gql`
  query SearchProducts($search: String) {
    products(where: { search: $search }) {
      edges {
        node {
          ... on SimpleProduct {
            sku
            id
            name
            price
            salePrice
            regularPrice
            shortDescription
            image {
              altText
              sourceUrl
            }
            stockStatus
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
        offsetPagination {
          total
        }
      }
    }
  }
`;

function Search({
  setFoundProducts,
}: {
  setFoundProducts?: Dispatch<SetStateAction<IGetProductsSimple | undefined>>;
}) {
  const [searchTerm, setSearchTerm] = useState('');
  // для скрытия результатов поиска при клике вне
  const [showResults, setShowResults] = useState(false);
  const searchResultsRef = useRef(null);
  const router = useRouter();
  const isSearchPage = router.route === '/search' ? true : false;

  useEffect(() => {
    if (router.query.q) {
      // получаем query и приводим типы к строке
      setSearchTerm(
        router.query.q
          ? Array.isArray(router.query.q)
            ? router.query.q.join(' ')
            : router.query.q
          : ''
      );
    }
  }, [router.query.q]);

  // для скрытия результатов поиска при клике вне
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchResultsRef.current) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchResultsRef]);

  const [searchProducts, { loading, error, data }] =
    useLazyQuery<IGetProductsSimple>(SEARCH_PRODUCTS_QUERY);

  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value);
    setShowResults(true);

    if (event.target.value?.length >= 3 && !isSearchPage) {
      searchProducts({ variables: { search: event.target.value } });
    }
  };

  if (searchTerm && data && setFoundProducts && !loading) {
    setFoundProducts(data);
  }

  const clearSearch = () => {
    setSearchTerm('');
  };

  const handleKeyDown = (event: any) => {
    setShowResults(false);
    if (event.key === 'Enter') {
      router.push({
        pathname: '/search',
        query: { q: searchTerm },
      });
    }
  };

  return (
    <div className="relative">
      <div className="relative flex w-full items-center">
        <Link
          href={{
            pathname: '/search',
            query: { q: searchTerm },
          }}
          className="absolute left-0 h-full pl-2 text-gray-400"
        >
          <MagnifyingGlassIcon className="h-full w-5 text-gray-400" />
        </Link>
        <input
          type="text"
          placeholder="Поиск товаров"
          value={searchTerm}
          onChange={handleSearch}
          className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-12 pr-8 leading-5 placeholder-gray-500 focus:border-blue-500 focus:placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
          autoFocus
          onKeyDown={handleKeyDown}
        />
        <button
          className={classNames(
            'absolute right-3 h-5 w-5 text-gray-400 transition-all',
            (loading && !isSearchPage) || searchTerm === ''
              ? 'pointer-events-none opacity-0'
              : 'pointer-events-auto opacity-100'
          )}
          onClick={clearSearch}
        >
          <XMarkIcon />
        </button>
        <div
          className={classNames(
            'absolute right-3 h-5 w-5 text-gray-400 transition-all',
            loading && !isSearchPage
              ? 'pointer-events-auto opacity-100'
              : 'pointer-events-none opacity-0'
          )}
        >
          <Spinner />
        </div>
      </div>

      {searchTerm && data && showResults && !isSearchPage && (
        <div
          ref={searchResultsRef}
          className="absolute left-0 top-12 z-10 w-full rounded-b-md border border-gray-300 bg-white shadow-lg"
        >
          {data && data.products.edges?.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {data.products.edges.map((product) => (
                <Link
                  key={product.node?.id}
                  href={`/product/${product.node?.id}`}
                >
                  <li
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                    onClick={clearSearch}
                  >
                    {product.node.name}
                  </li>
                </Link>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500">Не найдено</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;

import { IBreadcrumbs } from '@/src/interfaces/seo.interfaces';
import { getSlugFromUrl } from '@/src/utils/helpers';
import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { FC } from 'react';

type BreadcrumbsProps = {
  breadcrumbs: IBreadcrumbs[];
};

const Breadcrumbs: FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
  const homePageSlug = process.env.NEXT_PUBLIC_SITE_URL
    ? getSlugFromUrl(process.env.NEXT_PUBLIC_SITE_URL)
    : '/';
  return (
    <nav className="text-xs font-medium">
      <ol className="inline-flex list-none flex-wrap p-0">
        {breadcrumbs.map((breadcrumb, index) => {
          const slug = getSlugFromUrl(breadcrumb.url);

          return (
            <li className="flex items-center" key={index}>
              {index !== 0 && (
                <ChevronDoubleRightIcon width={10} className="mx-1" />
              )}
              {index === breadcrumbs.length - 1 ? (
                breadcrumb.text
              ) : (
                <Link
                  href={slug !== homePageSlug ? slug : '/'}
                  className={`${
                    index === breadcrumbs.length - 1
                      ? 'text-gray-700 underline'
                      : 'text-gray-500 underline hover:text-gray-700'
                  }`}
                >
                  {breadcrumb.text}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;

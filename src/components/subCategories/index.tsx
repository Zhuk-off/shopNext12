import { ChildSlugNameByCategory } from '@/src/interfaces/apollo/getCatigories.interface';
import { IBreadcrumbs } from '@/src/interfaces/seo.interfaces';
import { getSlugFromUrl } from '@/src/utils/helpers';
import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { FC } from 'react';

const SubCategories = ({
  childrenSlugName,
}: {
  childrenSlugName: ChildSlugNameByCategory[];
}) => {
  return (
    <nav className="text-sm font-medium">
      <ol className="inline-flex list-none flex-wrap gap-x-4 gap-y-2 font-medium">
        {childrenSlugName.map((child, index) => {
          const slug = getSlugFromUrl(child.slug);

          return (
            <li className="flex" key={index}>
              {/* {index !== 0 && (
                <ChevronDoubleRightIcon width={10} className="mx-1" />
              )} */}
              {/* {index === childrenSlugName.length - 1 ? (
                child.text
              ) : ( */}
              <Link
                href={slug}
                className='text-blue-500 underline hover:text-red-500'
              >
                {child.name}
              </Link>
              {/* )} */}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default SubCategories;

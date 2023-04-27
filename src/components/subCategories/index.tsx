import { ChildSlugNameByCategory } from '@/src/interfaces/apollo/getCatigories.interface';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';
import { DividerV } from '../divider';

const SubCategories = ({
  childrenSlugName,
}: {
  childrenSlugName: ChildSlugNameByCategory[];
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const MAX_SUBCATEGORY_OPEN = 8;
  const dropdownItems = childrenSlugName.slice(0, MAX_SUBCATEGORY_OPEN);
  console.log('dropdownItems', dropdownItems);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="text-sm font-medium">
      <ol className="inline-flex list-none flex-wrap gap-x-4 gap-y-2 font-medium">
        {childrenSlugName.slice(0, MAX_SUBCATEGORY_OPEN).map((item) => (
          <li key={item.name}>
            <Link
              href={item.slug}
              className="text-blue-500 underline hover:text-red-500"
            >
              {item.name}
            </Link>
          </li>
        ))}
        {childrenSlugName.length > MAX_SUBCATEGORY_OPEN &&
          showDropdown &&
          childrenSlugName.map((item, index) => (
            <li key={item.slug + index.toString()}>
              <Link
                href={item.slug}
                className="text-blue-500 underline hover:text-red-500"
              >
                {item.name}
              </Link>
            </li>
          ))}
        <button onClick={handleDropdownToggle}>
          {showDropdown ? (
            <div className="flex gap-1 text-blue-500 hover:text-red-600">
              <div>Свернуть</div>
              <ChevronUpIcon className="w-4" />
            </div>
          ) : (
            <div className="flex gap-1 text-blue-500 hover:text-red-600">
              <div>Еще</div>
              <ChevronDownIcon className="w-4" />
            </div>
          )}
        </button>
        <DividerV />
      </ol>
    </nav>
  );
};

export default SubCategories;

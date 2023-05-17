import Link from 'next/link';
import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { MenuItem } from '@/src/interfaces/apollo/buildMenu.interface';

const SubMenuRecursive = ({
  items,
  toggleDropdown,
}: {
  items: MenuItem[];
  toggleDropdown: any;
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const MAX_SUBCATEGORY_OPEN = 4;
  const dropdownItems = items && items.slice(MAX_SUBCATEGORY_OPEN);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <ul className="ml-3 mt-1 leading-tight">
      {items &&
        items.slice(0, MAX_SUBCATEGORY_OPEN).map((item) => (
          <li key={item.name} className="mt-2">
            <Link
              href={item.slug}
              className="font-normal text-gray-800 hover:text-red-600"
              onClick={toggleDropdown}
            >
              {item.name}
            </Link>
          </li>
        ))}
      {items && items?.length > MAX_SUBCATEGORY_OPEN && (
        <li>
          {showDropdown && (
            <ul className="flex w-full flex-col items-start">
              {dropdownItems.map((item) => (
                <li key={item.id} className="mt-2">
                  <Link
                    href={item.slug}
                    className="font-normal hover:text-red-600"
                    onClick={toggleDropdown}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <button onClick={handleDropdownToggle}>
            {showDropdown ? (
              <div className="mt-2 flex gap-1 text-blue-500 hover:text-red-600">
                <div>Свернуть</div>
                <ChevronUpIcon className="w-4" />
              </div>
            ) : (
              <div className="mt-2 flex gap-1 text-blue-500 hover:text-red-600">
                <div>Посмотреть все</div>
                <ChevronDownIcon className="w-4" />
              </div>
            )}
          </button>
        </li>
      )}

      {/* {items.map((item) => (
        <li key={item.catName + item.link}>
          <Link href={item.link} className="font-normal hover:text-red-600">
            {item.catName}
          </Link>
          {item?.submenu && <SubMenuRecursive items={item?.submenu} />}
        </li>
      ))} */}
    </ul>
  );
};

export default SubMenuRecursive;

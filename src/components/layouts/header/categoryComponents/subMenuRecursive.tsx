import Link from 'next/link';
import { ISubmenu } from './mainMenu';
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
  const dropdownItems = items.slice(7);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <ul className="ml-10">
      {items.slice(0, 7).map((item) => (
        <li key={item.name}>
          <Link
            href={item.slug}
            className="font-normal hover:text-red-600"
            onClick={toggleDropdown}
          >
            {item.name}
          </Link>
        </li>
      ))}
      {items.length > 7 && (
        <li>
          {showDropdown && (
            <ul className="flex w-full flex-col items-start">
              {dropdownItems.map((item) => (
                <li key={item.id}>
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
          <Link href="#" onClick={handleDropdownToggle}>
            {showDropdown ? (
              <div className="flex gap-1 text-blue-500 hover:text-red-600">
                <div>Свернуть</div>
                <ChevronUpIcon className="w-4" />
              </div>
            ) : (
              <div className="flex gap-1 text-blue-500 hover:text-red-600">
                <div>Посмотреть все</div>

                <ChevronDownIcon className="w-4" />
              </div>
            )}
          </Link>
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

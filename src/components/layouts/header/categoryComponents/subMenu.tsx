import Link from 'next/link';
import { useContext } from 'react';
import SubMenuRecursive from './subMenuRecursive';
import { DataContext } from '..';

const SubMenu = ({ toggleDropdown }: { toggleDropdown: any }) => {
  const { subMenuItems } = useContext(DataContext);
  if (!subMenuItems || subMenuItems?.length === 0) return null;

  return (
    <menu className="grid grid-cols-3 gap-4">
      {subMenuItems.map((menuItem, index) => (
        <li key={index} className="pb-2 leading-tight">
          <Link
            href={`/${menuItem.slug}`}
            className=" font-semibold hover:bg-red-50 hover:text-red-600 "
            onClick={toggleDropdown}
          >
            <span>{menuItem.name}</span>
          </Link>
          {menuItem?.children && menuItem?.children?.length !== 0 ? (
            <SubMenuRecursive
              key={menuItem.slug}
              items={menuItem?.children}
              toggleDropdown={toggleDropdown}
            />
          ) : null}
        </li>
      ))}
    </menu>
  );
};

export default SubMenu;

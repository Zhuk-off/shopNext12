import Link from 'next/link';
import { useContext } from 'react';
import { DataContext } from '../NavDropdown';
import SubMenuRecursive from './subMenuRecursive';

const SubMenu = () => {
  const { subMenuItems } = useContext(DataContext);
  if (!subMenuItems || subMenuItems.length === 0) return null;

  return (
    <menu className="flex flex-wrap gap-4">
      {subMenuItems.map((menuItem, index) => (
        <li key={index} className="pb-2">
          <Link
            href={menuItem.link}
            className=" hover:bg-red-50 hover:text-red-600"
          >
            <span>{menuItem.icon}</span> <span>{menuItem.catName}</span>
          </Link>
          {menuItem?.submenu && menuItem?.submenu.length !== 0 ? (
            <SubMenuRecursive key={menuItem.link} items={menuItem?.submenu} />
          ) : null}
        </li>
      ))}
    </menu>
  );
};

export default SubMenu;

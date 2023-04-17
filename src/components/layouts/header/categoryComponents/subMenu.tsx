import Link from 'next/link';
import { useContext } from 'react';
import { DataContext } from '../NavDropdown';
import SubMenuRecursive from './subMenuRecursive';
import Image from 'next/image';

const SubMenu = ({toggleDropdown}:{toggleDropdown:any}) => {
  const { subMenuItems } = useContext(DataContext);
  if (!subMenuItems || subMenuItems.length === 0) return null;

  return (
    <menu className="flex flex-wrap gap-4">
      {subMenuItems.map((menuItem, index) => (
        <li key={index} className="pb-2">
          <Link
            href={menuItem.slug}
            className=" hover:bg-red-50 hover:text-red-600"
            onClick={toggleDropdown}
          >
                            <div className="mr-1 inline-block">
                  <Image
                    src={menuItem.imageUrl ? menuItem.imageUrl : '/vercel.svg'}
                    alt={menuItem.name}
                    width={15}
                    height={15}
                  />
                </div> <span>{menuItem.name}</span>
          </Link>
          {menuItem?.children && menuItem?.children.length !== 0 ? (
            <SubMenuRecursive key={menuItem.slug} items={menuItem?.children} toggleDropdown={toggleDropdown}/>
          ) : null}
        </li>
      ))}
    </menu>
  );
};

export default SubMenu;

import Link from 'next/link';
import { useContext } from 'react';
import { MenuItem } from '@/src/interfaces/apollo/buildMenu.interface';
import { DataContext } from '..';

export interface IMainMenu {
  catName: string;
  icon: string;
  link: string;
  submenu?: ISubmenu[] | null;
}

export interface ISubmenu extends IMainMenu {
  submenu?: ISubmenu[] | null;
}

const MainMenu = ({
  menu,
  toggleDropdown,
}: {
  menu: MenuItem[];
  toggleDropdown: any;
}) => {
  const { setSubMenuItems } = useContext(DataContext);

  const handleMouseEnter = (data: MenuItem[]) => {
    setSubMenuItems(data);
  };

  return (
    <>
      {menu && (
        <menu>
          {menu.map((menuItem) => (
            <li
              key={menuItem.id + Math.random.toString()}
              className="mt-2 text-gray-600 hover:bg-red-50 hover:text-red-600"
            >
              <Link
                href={menuItem.slug}
                className="block py-1"
                onMouseEnter={() =>
                  handleMouseEnter(menuItem?.children ? menuItem?.children : [])
                }
                onClick={toggleDropdown}
              >
                {/* <div className="mr-1 inline-block">
                  <Image
                    src={menuItem.imageUrl ? menuItem.imageUrl : '/vercel.svg'}
                    alt={menuItem.name}
                    width={15}
                    height={15}
                  />
                </div> */}
                <span className="font-semibold">{menuItem.name}</span>
              </Link>
            </li>
          ))}
        </menu>
      )}
    </>
  );
};

export default MainMenu;

import Link from 'next/link';
import { useState, createContext } from 'react';
import MainMenu, { ISubmenu } from './categoryComponents/mainMenu';
import SubMenu from './categoryComponents/subMenu';

interface Data {
  subMenuItems: ISubmenu[];
  setSubMenuItems: (data: ISubmenu[]) => void;
}

export const DataContext = createContext<Data>({
  subMenuItems: [],
  setSubMenuItems: () => [],
});

const NavDropdown = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [subMenuItems, setSubMenuItems] = useState<ISubmenu[]>([]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative font-medium text-gray-500 ">
      <button
        className="rounded-full border bg-gray-300 px-6 py-1 font-medium 
        transition
        hover:bg-gray-400 hover:text-white focus:bg-gray-500 focus:text-white focus:outline-none"
        onClick={toggleDropdown}
      >
        Каталог
      </button>
      {isOpen && (
        <div className="h-screen-minus-112px fixed left-0 top-28 z-50 w-full bg-white shadow-lg overflow-hidden overflow-y-scroll">
          <DataContext.Provider value={{ subMenuItems, setSubMenuItems }}>
            <div className="container mx-auto flex max-w-7xl px-2 py-2 sm:px-6 lg:px-8">
              <div className="max-w-xs border-r border-gray-400 p-3">
                <MainMenu />
              </div>
              <div className="p-3">
                <SubMenu />
              </div>
            </div>
          </DataContext.Provider>
        </div>
      )}
    </div>
  );
};

export default NavDropdown;

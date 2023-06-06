import { useState, createContext, useRef, useEffect } from 'react';
import LocationContacts from './locationContacts';
import Promotions from './promotions';
import NavMenu from './menuSearchLogin';
import { IHeader } from '@/src/interfaces/footerHeaderRestAPIDataResponse';
import { MenuItem } from '@/src/interfaces/apollo/buildMenu.interface';
import MainMenu from './categoryComponents/mainMenu';
import SubMenu from './categoryComponents/subMenu';
import TestHeaderExample from './TestHeaderExample';

interface Data {
  subMenuItems: MenuItem[];
  setSubMenuItems: (data: MenuItem[]) => void;
}

export const DataContext = createContext<Data>({
  subMenuItems: [],
  setSubMenuItems: () => [],
});

const Header = ({
  header,
  menu,
}: {
  header: IHeader | undefined;
  menu: MenuItem[];
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [subMenuItems, setSubMenuItems] = useState<MenuItem[]>([]);

  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node) &&
        event.target !== document.querySelector('.dropdown-toggle')
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [headerRef]);

  const toggleDropdown = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="relative bg-gray-100 shadow">
        <TestHeaderExample/>
      <div className="mx-auto max-w-7xl bg-gray-100 px-2 sm:px-6 lg:px-8">
        <LocationContacts />
        <NavMenu
          setIsMenuOpen={setIsMenuOpen}
          menu={menu}
          isMenuOpen={isMenuOpen}
        />
        <Promotions />
        {isMenuOpen && (
          <div className=" " ref={headerRef}>
            <DataContext.Provider value={{ subMenuItems, setSubMenuItems }}>
              <div className="container mx-auto grid h-full w-full max-w-7xl grid-cols-3 bg-white px-2 py-2 sm:px-6 lg:px-8">
                <div className="col-span-1 border-r border-gray-400 p-3 leading-tight">
                  <MainMenu menu={menu} toggleDropdown={toggleDropdown} />
                </div>
                <div className="col-span-2 p-3">
                  <SubMenu toggleDropdown={toggleDropdown} />
                </div>
              </div>
            </DataContext.Provider>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

import Link from 'next/link';
import { useState, createContext } from 'react';
import MainMenu, { ISubmenu } from './categoryComponents/mainMenu';
import SubMenu from './categoryComponents/subMenu';
import { client } from '@/src/utils/apollo/apolloClient';
import { GET_CATEGORIES } from '@/src/utils/apollo/queriesConst';
import { GetStaticProps } from 'next';
import { IGetCategories } from '@/src/interfaces/apollo/getCatigories.interface';
import { ApolloQueryResult, useQuery } from '@apollo/client';
import buildMenu from '@/src/utils/buildMenu';
import { MenuItem } from '@/src/interfaces/apollo/buildMenu.interface';

interface Data {
  subMenuItems: MenuItem[];
  setSubMenuItems: (data: MenuItem[]) => void;
}

export const DataContext = createContext<Data>({
  subMenuItems: [],
  setSubMenuItems: () => [],
});

const NavDropdown = ({ menu }: { menu: MenuItem[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [subMenuItems, setSubMenuItems] = useState<MenuItem[]>([]);

  const toggleDropdown = () => setIsOpen(!isOpen);
  // console.log('menu', menu);

  return (
    <div className="relative font-medium text-gray-500 ">
      <button
        className="rounded-full border bg-pink-700 px-6 py-1 font-medium text-white 
        transition
        hover:bg-pink-800 hover:text-white  focus:outline-none"
        onClick={toggleDropdown}
      >
        Каталог
      </button>
      {isOpen && (
        <div className="h-screen-minus-112px fixed left-0 top-28 z-50 w-full overflow-hidden overflow-y-scroll bg-white shadow-lg">
          <DataContext.Provider value={{ subMenuItems, setSubMenuItems }}>
            <div className="container mx-auto flex h-full max-w-7xl px-2 py-2 sm:px-6 lg:px-8">
              <div className="max-w-xs border-r border-gray-400 p-3">
                <MainMenu menu={menu} toggleDropdown={toggleDropdown} />
              </div>
              <div className="p-3">
                <SubMenu toggleDropdown={toggleDropdown} />
              </div>
            </div>
          </DataContext.Provider>
        </div>
      )}
    </div>
  );
};

// interface Props {
//   data: IGetCategories;
// }

// export async function getStaticProps() {
//   const { data }:ApolloQueryResult<Props> = await client.query({
//     query: GET_CATEGORY
//   });

//   return {
//     props: {
//       data,
//     },
//   };
// }

export default NavDropdown;

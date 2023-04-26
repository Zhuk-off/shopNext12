import Link from 'next/link';
import { useState, createContext, Dispatch, SetStateAction } from 'react';
import MainMenu, { ISubmenu } from './categoryComponents/mainMenu';
import SubMenu from './categoryComponents/subMenu';
import { client } from '@/src/utils/apollo/apolloClient';
import { GET_CATEGORIES } from '@/src/utils/apollo/queriesConst';
import { GetStaticProps } from 'next';
import { IGetCategories } from '@/src/interfaces/apollo/getCatigories.interface';
import { ApolloQueryResult, useQuery } from '@apollo/client';
import buildMenu from '@/src/utils/buildMenu';
import { MenuItem } from '@/src/interfaces/apollo/buildMenu.interface';

// interface Data {
//   subMenuItems: MenuItem[];
//   setSubMenuItems: (data: MenuItem[]) => void;
// }

// export const DataContext = createContext<Data>({
//   subMenuItems: [],
//   setSubMenuItems: () => [],
// });

const NavDropdown = ({
  menu,
  setIsMenuOpen,
  isMenuOpen,
}: {
  menu: MenuItem[];
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  isMenuOpen: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [subMenuItems, setSubMenuItems] = useState<MenuItem[]>([]);

  // if (!isMenuOpen && isOpen) {
  //   setIsOpen(false)
  // }

  const toggleDropdown = () => setIsMenuOpen(!isMenuOpen);

  // const toggleDropdown = () => {
  //   if (!isMenuOpen && !isOpen) {
  //     setIsMenuOpen(!isMenuOpen);
  //     setIsOpen(!isOpen);
  //   }
  //   if (!isMenuOpen && isOpen) {
  //     setIsOpen(!isOpen);
  //   }
  // };
  // console.log('menu', menu);

  /* В элементе button есть класс dropdown-toggle - он нужен для корректной работы открытия и закрытия меню
  с ним работает обработчик событий, чтобы исключить его при клике вне открытого меню */
  return (
    <div className="font-medium text-gray-500 ">
      <button
        className="dropdown-toggle rounded-full border bg-pink-700 px-6 py-1 font-medium text-white 
        transition
        hover:bg-pink-800 hover:text-white  focus:outline-none"
        onClick={toggleDropdown}
      >
        Каталог
      </button>
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

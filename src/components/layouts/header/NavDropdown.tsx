import { Dispatch, SetStateAction } from 'react';

const NavDropdown = ({
  setIsMenuOpen,
  isMenuOpen,
}: {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  isMenuOpen: boolean;
}) => {
  const toggleDropdown = () => setIsMenuOpen(!isMenuOpen);

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

export default NavDropdown;

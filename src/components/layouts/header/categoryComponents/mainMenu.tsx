import Link from 'next/link';
import { useContext } from 'react';
import { DataContext } from '../NavDropdown';

export interface IMainMenu {
  catName: string;
  icon: string;
  link: string;
  submenu?: ISubmenu[] | null;
}

export interface ISubmenu extends IMainMenu {
  submenu?: ISubmenu[] | null;
}

const data: IMainMenu[] = [
  {
    catName: 'Бытовая техника',
    icon: 'i ',
    link: '#',
    submenu: [
      {
        catName: 'Крупная техника для кухни',
        icon: 'i ',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: 'i ', link: '#' },
          { catName: 'Вытяжки', icon: 'i ', link: '#' },
          { catName: 'Кухонные плиты', icon: 'i ', link: '#' },
          { catName: 'Морозильники', icon: 'i ', link: '#' },
          { catName: 'Унитазы', icon: 'i ', link: '#' },
          { catName: 'Водонагреватели', icon: 'i ', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: 'i ', link: '#' },
          { catName: 'Автокамеры', icon: 'i ', link: '#' },
          { catName: 'Газонокосилки', icon: 'i ', link: '#' },
        ],
      },
      {
        catName: 'Посуда для готовки',
        icon: 'i ',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: 'i ', link: '#' },
          { catName: 'Вытяжки', icon: 'i ', link: '#' },
          { catName: 'Кухонные плиты', icon: 'i ', link: '#' },
          { catName: 'Морозильники', icon: 'i ', link: '#' },
          { catName: 'Унитазы', icon: 'i ', link: '#' },
          { catName: 'Водонагреватели', icon: 'i ', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: 'i ', link: '#' },
          { catName: 'Автокамеры', icon: 'i ', link: '#' },
          { catName: 'Газонокосилки', icon: 'i ', link: '#' },
        ],
      },
    ],
  },
  {
    catName: 'Смартфоны, ТВ и электроника',
    icon: 'i ',
    link: '#',
    submenu: [
      {
        catName: 'Компьютерная техника',
        icon: 'i ',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: 'i ', link: '#' },
          { catName: 'Вытяжки', icon: 'i ', link: '#' },
          { catName: 'Кухонные плиты', icon: 'i ', link: '#' },
          { catName: 'Морозильники', icon: 'i ', link: '#' },
          { catName: 'Унитазы', icon: 'i ', link: '#' },
          { catName: 'Водонагреватели', icon: 'i ', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: 'i ', link: '#' },
          { catName: 'Автокамеры', icon: 'i ', link: '#' },
          { catName: 'Газонокосилки', icon: 'i ', link: '#' },
        ],
      },
      {
        catName: 'Комплектующие',
        icon: 'i ',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: 'i ', link: '#' },
          { catName: 'Вытяжки', icon: 'i ', link: '#' },
          { catName: 'Кухонные плиты', icon: 'i ', link: '#' },
          { catName: 'Морозильники', icon: 'i ', link: '#' },
          { catName: 'Унитазы', icon: 'i ', link: '#' },
          { catName: 'Водонагреватели', icon: 'i ', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: 'i ', link: '#' },
          { catName: 'Автокамеры', icon: 'i ', link: '#' },
          { catName: 'Газонокосилки', icon: 'i ', link: '#' },
        ],
      },
    ],
  },
  {
    catName: 'Компьютеры и периферия',
    icon: 'i ',
    link: '#',
    submenu: [
      {
        catName: 'Освещение',
        icon: 'i ',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: 'i ', link: '#' },
          { catName: 'Вытяжки', icon: 'i ', link: '#' },
          { catName: 'Кухонные плиты', icon: 'i ', link: '#' },
          { catName: 'Морозильники', icon: 'i ', link: '#' },
          { catName: 'Унитазы', icon: 'i ', link: '#' },
          { catName: 'Водонагреватели', icon: 'i ', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: 'i ', link: '#' },
          { catName: 'Автокамеры', icon: 'i ', link: '#' },
          { catName: 'Газонокосилки', icon: 'i ', link: '#' },
        ],
      },
      {
        catName: 'Жалюзи, шторы',
        icon: 'i ',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: 'i ', link: '#' },
          { catName: 'Вытяжки', icon: 'i ', link: '#' },
          { catName: 'Кухонные плиты', icon: 'i ', link: '#' },
          { catName: 'Морозильники', icon: 'i ', link: '#' },
          { catName: 'Унитазы', icon: 'i ', link: '#' },
          { catName: 'Водонагреватели', icon: 'i ', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: 'i ', link: '#' },
          { catName: 'Автокамеры', icon: 'i ', link: '#' },
          { catName: 'Газонокосилки', icon: 'i ', link: '#' },
        ],
      },
      {
        catName: 'Жалюзи, шторы',
        icon: 'i ',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: 'i ', link: '#' },
          { catName: 'Вытяжки', icon: 'i ', link: '#' },
          { catName: 'Кухонные плиты', icon: 'i ', link: '#' },
          { catName: 'Морозильники', icon: 'i ', link: '#' },
          { catName: 'Унитазы', icon: 'i ', link: '#' },
          { catName: 'Водонагреватели', icon: 'i ', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: 'i ', link: '#' },
          { catName: 'Автокамеры', icon: 'i ', link: '#' },
          { catName: 'Газонокосилки', icon: 'i ', link: '#' },
        ],
      },
      {
        catName: 'Жалюзи, шторы',
        icon: 'i ',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: 'i ', link: '#' },
          { catName: 'Вытяжки', icon: 'i ', link: '#' },
          { catName: 'Кухонные плиты', icon: 'i ', link: '#' },
          { catName: 'Морозильники', icon: 'i ', link: '#' },
          { catName: 'Унитазы', icon: 'i ', link: '#' },
          { catName: 'Водонагреватели', icon: 'i ', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: 'i ', link: '#' },
          { catName: 'Автокамеры', icon: 'i ', link: '#' },
          { catName: 'Газонокосилки', icon: 'i ', link: '#' },
        ],
      },
      {
        catName: 'Жалюзи, шторы',
        icon: 'i ',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: 'i ', link: '#' },
          { catName: 'Вытяжки', icon: 'i ', link: '#' },
          { catName: 'Кухонные плиты', icon: 'i ', link: '#' },
          { catName: 'Морозильники', icon: 'i ', link: '#' },
          { catName: 'Унитазы', icon: 'i ', link: '#' },
          { catName: 'Водонагреватели', icon: 'i ', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: 'i ', link: '#' },
          { catName: 'Автокамеры', icon: 'i ', link: '#' },
          { catName: 'Газонокосилки', icon: 'i ', link: '#' },
        ],
      },
      {
        catName: 'Жалюзи, шторы',
        icon: 'i ',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: 'i ', link: '#' },
          { catName: 'Вытяжки', icon: 'i ', link: '#' },
          { catName: 'Кухонные плиты', icon: 'i ', link: '#' },
          { catName: 'Морозильники', icon: 'i ', link: '#' },
          { catName: 'Унитазы', icon: 'i ', link: '#' },
          { catName: 'Водонагреватели', icon: 'i ', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: 'i ', link: '#' },
          { catName: 'Автокамеры', icon: 'i ', link: '#' },
          { catName: 'Газонокосилки', icon: 'i ', link: '#' },
        ],
      },
      {
        catName: 'Жалюзи, шторы',
        icon: 'i ',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: 'i ', link: '#' },
          { catName: 'Вытяжки', icon: 'i ', link: '#' },
          { catName: 'Кухонные плиты', icon: 'i ', link: '#' },
          { catName: 'Морозильники', icon: 'i ', link: '#' },
          { catName: 'Унитазы', icon: 'i ', link: '#' },
          { catName: 'Водонагреватели', icon: 'i ', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: 'i ', link: '#' },
          { catName: 'Автокамеры', icon: 'i ', link: '#' },
          { catName: 'Газонокосилки', icon: 'i ', link: '#' },
        ],
      },
      {
        catName: 'Жалюзи, шторы',
        icon: 'i ',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: 'i ', link: '#' },
          { catName: 'Вытяжки', icon: 'i ', link: '#' },
          { catName: 'Кухонные плиты', icon: 'i ', link: '#' },
          { catName: 'Морозильники', icon: 'i ', link: '#' },
          { catName: 'Унитазы', icon: 'i ', link: '#' },
          { catName: 'Водонагреватели', icon: 'i ', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: 'i ', link: '#' },
          { catName: 'Автокамеры', icon: 'i ', link: '#' },
          { catName: 'Газонокосилки', icon: 'i ', link: '#' },
        ],
      },
      {
        catName: 'Жалюзи, шторы',
        icon: 'i ',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: 'i ', link: '#' },
          { catName: 'Вытяжки', icon: 'i ', link: '#' },
          { catName: 'Кухонные плиты', icon: 'i ', link: '#' },
          { catName: 'Морозильники', icon: 'i ', link: '#' },
          { catName: 'Унитазы', icon: 'i ', link: '#' },
          { catName: 'Водонагреватели', icon: 'i ', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: 'i ', link: '#' },
          { catName: 'Автокамеры', icon: 'i ', link: '#' },
          { catName: 'Газонокосилки', icon: 'i ', link: '#' },
        ],
      },
      {
        catName: 'Жалюзи, шторы',
        icon: 'i ',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: 'i ', link: '#' },
          { catName: 'Вытяжки', icon: 'i ', link: '#' },
          { catName: 'Кухонные плиты', icon: 'i ', link: '#' },
          { catName: 'Морозильники', icon: 'i ', link: '#' },
          { catName: 'Унитазы', icon: 'i ', link: '#' },
          { catName: 'Водонагреватели', icon: 'i ', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: 'i ', link: '#' },
          { catName: 'Автокамеры', icon: 'i ', link: '#' },
          { catName: 'Газонокосилки', icon: 'i ', link: '#' },
        ],
      },
      {
        catName: 'Жалюзи, шторы',
        icon: 'i ',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: 'i ', link: '#' },
          { catName: 'Вытяжки', icon: 'i ', link: '#' },
          { catName: 'Кухонные плиты', icon: 'i ', link: '#' },
          { catName: 'Морозильники', icon: 'i ', link: '#' },
          { catName: 'Унитазы', icon: 'i ', link: '#' },
          { catName: 'Водонагреватели', icon: 'i ', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: 'i ', link: '#' },
          { catName: 'Автокамеры', icon: 'i ', link: '#' },
          { catName: 'Газонокосилки', icon: 'i ', link: '#' },
        ],
      },
      {
        catName: 'Жалюзи, шторы',
        icon: 'i ',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: 'i ', link: '#' },
          { catName: 'Вытяжки', icon: 'i ', link: '#' },
          { catName: 'Кухонные плиты', icon: 'i ', link: '#' },
          { catName: 'Морозильники', icon: 'i ', link: '#' },
          { catName: 'Унитазы', icon: 'i ', link: '#' },
          { catName: 'Водонагреватели', icon: 'i ', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: 'i ', link: '#' },
          { catName: 'Автокамеры', icon: 'i ', link: '#' },
          { catName: 'Газонокосилки', icon: 'i ', link: '#' },
        ],
      },
      {
        catName: 'Жалюзи, шторы',
        icon: 'i ',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: 'i ', link: '#' },
          { catName: 'Вытяжки', icon: 'i ', link: '#' },
          { catName: 'Кухонные плиты', icon: 'i ', link: '#' },
          { catName: 'Морозильники', icon: 'i ', link: '#' },
          { catName: 'Унитазы', icon: 'i ', link: '#' },
          { catName: 'Водонагреватели', icon: 'i ', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: 'i ', link: '#' },
          { catName: 'Автокамеры', icon: 'i ', link: '#' },
          { catName: 'Газонокосилки', icon: 'i ', link: '#' },
        ],
      },
      {
        catName: 'Жалюзи, шторы',
        icon: 'i ',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: 'i ', link: '#' },
          { catName: 'Вытяжки', icon: 'i ', link: '#' },
          { catName: 'Кухонные плиты', icon: 'i ', link: '#' },
          { catName: 'Морозильники', icon: 'i ', link: '#' },
          { catName: 'Унитазы', icon: 'i ', link: '#' },
          { catName: 'Водонагреватели', icon: 'i ', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: 'i ', link: '#' },
          { catName: 'Автокамеры', icon: 'i ', link: '#' },
          { catName: 'Газонокосилки', icon: 'i ', link: '#' },
        ],
      },
      {
        catName: 'Жалюзи, шторы',
        icon: 'i ',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: 'i ', link: '#' },
          { catName: 'Вытяжки', icon: 'i ', link: '#' },
          { catName: 'Кухонные плиты', icon: 'i ', link: '#' },
          { catName: 'Морозильники', icon: 'i ', link: '#' },
          { catName: 'Унитазы', icon: 'i ', link: '#' },
          { catName: 'Водонагреватели', icon: 'i ', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: 'i ', link: '#' },
          { catName: 'Автокамеры', icon: 'i ', link: '#' },
          { catName: 'Газонокосилки', icon: 'i ', link: '#' },
        ],
      },
      {
        catName: 'Жалюзи, шторы',
        icon: 'i ',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: 'i ', link: '#' },
          { catName: 'Вытяжки', icon: 'i ', link: '#' },
          { catName: 'Кухонные плиты', icon: 'i ', link: '#' },
          { catName: 'Морозильники', icon: 'i ', link: '#' },
          { catName: 'Унитазы', icon: 'i ', link: '#' },
          { catName: 'Водонагреватели', icon: 'i ', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: 'i ', link: '#' },
          { catName: 'Автокамеры', icon: 'i ', link: '#' },
          { catName: 'Газонокосилки', icon: 'i ', link: '#' },
        ],
      },
      {
        catName: 'Жалюзи, шторы',
        icon: 'i ',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: 'i ', link: '#' },
          { catName: 'Вытяжки', icon: 'i ', link: '#' },
          { catName: 'Кухонные плиты', icon: 'i ', link: '#' },
          { catName: 'Морозильники', icon: 'i ', link: '#' },
          { catName: 'Унитазы', icon: 'i ', link: '#' },
          { catName: 'Водонагреватели', icon: 'i ', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: 'i ', link: '#' },
          { catName: 'Автокамеры', icon: 'i ', link: '#' },
          { catName: 'Газонокосилки', icon: 'i ', link: '#' },
        ],
      },
      {
        catName: 'Жалюзи, шторы',
        icon: 'i ',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: 'i ', link: '#' },
          { catName: 'Вытяжки', icon: 'i ', link: '#' },
          { catName: 'Кухонные плиты', icon: 'i ', link: '#' },
          { catName: 'Морозильники', icon: 'i ', link: '#' },
          { catName: 'Унитазы', icon: 'i ', link: '#' },
          { catName: 'Водонагреватели', icon: 'i ', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: 'i ', link: '#' },
          { catName: 'Автокамеры', icon: 'i ', link: '#' },
          { catName: 'Газонокосилки', icon: 'i ', link: '#' },
        ],
      },
      {
        catName: 'Жалюзи, шторы',
        icon: 'i ',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: 'i ', link: '#' },
          { catName: 'Вытяжки', icon: 'i ', link: '#' },
          { catName: 'Кухонные плиты', icon: 'i ', link: '#' },
          { catName: 'Морозильники', icon: 'i ', link: '#' },
          { catName: 'Унитазы', icon: 'i ', link: '#' },
          { catName: 'Водонагреватели', icon: 'i ', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: 'i ', link: '#' },
          { catName: 'Автокамеры', icon: 'i ', link: '#' },
          { catName: 'Газонокосилки', icon: 'i ', link: '#' },
        ],
      },
    ],
  },
];

const MainMenu = () => {
  const { setSubMenuItems } = useContext(DataContext);

  const handleMouseEnter = (data: ISubmenu[]) => {
    setSubMenuItems(data);
  };

  return (
    <>
      {data && (
        <menu>
          {data.map((menuItem) => (
            <li
              key={menuItem.catName + Math.random.toString()}
              className="hover:bg-red-50 hover:text-red-600"
            >
              <Link
                href={menuItem.link}
                className="block whitespace-nowrap"
                onMouseEnter={() =>
                  handleMouseEnter(menuItem?.submenu ? menuItem?.submenu : [])
                }
              >
                <span>{menuItem.icon}</span>
                <span>{menuItem.catName}</span>
              </Link>
            </li>
          ))}
        </menu>
      )}
    </>
  );
};

export default MainMenu;

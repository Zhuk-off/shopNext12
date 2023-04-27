import Link from 'next/link';
import { useContext } from 'react';

import { useQuery } from '@apollo/client';
import buildMenu from '@/src/utils/buildMenu';
import { IGetCategories } from '@/src/interfaces/apollo/getCatigories.interface';
import { GET_CATEGORIES } from '@/src/utils/apollo/queriesConst';
import { MenuItem } from '@/src/interfaces/apollo/buildMenu.interface';
import Image from 'next/image';
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

const data: IMainMenu[] = [
  {
    catName: 'Инструмент',
    icon: '🔨',
    link: '#',
    submenu: [
      {
        catName: 'Ручной инструмент',
        icon: '🔧',
        link: '#',
        submenu: [
          { catName: 'Отвертки', icon: '🪛', link: '#' },
          { catName: 'Наборы инструментов', icon: '🛠️', link: '#' },
          { catName: 'Тиски', icon: '🗜️', link: '#' },
          { catName: 'Ключи', icon: '🔑', link: '#' },
        ],
      },
      {
        catName: 'Электроинструмент',
        icon: '🔌',
        link: '#',
        submenu: [
          { catName: 'Дрели', icon: '🔩', link: '#' },
          { catName: 'Шлифовальные машины', icon: '🪚', link: '#' },
          { catName: 'Отбойные молотки', icon: '🔨', link: '#' },
        ],
      },
    ],
  },
  {
    catName: 'Стройматериалы',
    icon: '🏗️',
    link: '#',
    submenu: [
      {
        catName: 'Кирпичи',
        icon: '🧱',
        link: '#',
        submenu: [
          { catName: 'Красный', icon: '🟥', link: '#' },
          { catName: 'Керамический', icon: '🟧', link: '#' },
        ],
      },
      { catName: 'Бетон', icon: '🟫', link: '#' },
      { catName: 'Цемент', icon: '🏭', link: '#' },
    ],
  },
  {
    catName: 'Лестницы',
    icon: '🪜',
    link: '#',
    submenu: [
      { catName: 'Лестницы-стремянки', icon: '🪜', link: '#' },
      { catName: 'Леса строительные', icon: '🏗️', link: '#' },
    ],
  },
  {
    catName: 'Инструменты',
    icon: '🔧',
    link: '#',
    submenu: [
      {
        catName: 'Ручные инструменты',
        icon: '🔨',
        link: '#',
        submenu: [
          {
            catName: 'Отвертки',
            icon: '🪛',
            link: '#',
          },
          {
            catName: 'Молотки',
            icon: '🔨',
            link: '#',
          },
          {
            catName: 'Ножи',
            icon: '🔪',
            link: '#',
          },
        ],
      },
      {
        catName: 'Электроинструменты',
        icon: '🔌',
        link: '#',
        submenu: [
          {
            catName: 'Дрели',
            icon: '🔩',
            link: '#',
          },
          {
            catName: 'Шлифмашинки',
            icon: '🪚',
            link: '#',
          },
          {
            catName: 'Пилы',
            icon: '🪚',
            link: '#',
          },
        ],
      },
    ],
  },
  {
    catName: 'Бытовая техника',
    icon: '🏗️',
    link: '#',
    submenu: [
      {
        catName: 'Крупная техника для кухни',
        icon: '🔧',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: '🔧', link: '#' },
          { catName: 'Вытяжки', icon: '🔧', link: '#' },
          { catName: 'Кухонные плиты', icon: '🔧', link: '#' },
          { catName: 'Морозильники', icon: '🔧', link: '#' },
          { catName: 'Унитазы', icon: '🔧', link: '#' },
          { catName: 'Водонагреватели', icon: '🔧', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: '🔧', link: '#' },
          { catName: 'Автокамеры', icon: '🔧', link: '#' },
          { catName: 'Газонокосилки', icon: '🔧', link: '#' },
        ],
      },
      {
        catName: 'Посуда для готовки',
        icon: '🔧',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: '🔧', link: '#' },
          { catName: 'Вытяжки', icon: '🔧', link: '#' },
          { catName: 'Кухонные плиты', icon: '🔧', link: '#' },
          { catName: 'Морозильники', icon: '🔧', link: '#' },
          { catName: 'Унитазы', icon: '🔧', link: '#' },
          { catName: 'Водонагреватели', icon: '🔧', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: '🔧', link: '#' },
          { catName: 'Автокамеры', icon: '🔧', link: '#' },
          { catName: 'Газонокосилки', icon: '🔧', link: '#' },
        ],
      },
    ],
  },
  {
    catName: 'Смартфоны, ТВ и электроника',
    icon: '🔑',
    link: '#',
    submenu: [
      {
        catName: 'Компьютерная техника',
        icon: '🔧',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: '🔧', link: '#' },
          { catName: 'Вытяжки', icon: '🔧', link: '#' },
          { catName: 'Кухонные плиты', icon: '🔧', link: '#' },
          { catName: 'Морозильники', icon: '🔧', link: '#' },
          { catName: 'Унитазы', icon: '🔧', link: '#' },
          { catName: 'Водонагреватели', icon: '🔧', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: '🔧', link: '#' },
          { catName: 'Автокамеры', icon: '🔧', link: '#' },
          { catName: 'Газонокосилки', icon: '🔧', link: '#' },
        ],
      },
      {
        catName: 'Комплектующие',
        icon: '🔧',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: '🔧', link: '#' },
          { catName: 'Вытяжки', icon: '🔧', link: '#' },
          { catName: 'Кухонные плиты', icon: '🔧', link: '#' },
          { catName: 'Морозильники', icon: '🔧', link: '#' },
          { catName: 'Унитазы', icon: '🔧', link: '#' },
          { catName: 'Водонагреватели', icon: '🔧', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: '🔧', link: '#' },
          { catName: 'Автокамеры', icon: '🔧', link: '#' },
          { catName: 'Газонокосилки', icon: '🔧', link: '#' },
        ],
      },
    ],
  },
  {
    catName: 'Компьютеры и периферия',
    icon: '🗜️',
    link: '#',
    submenu: [
      {
        catName: 'Освещение',
        icon: '🔧',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: '🔧', link: '#' },
          { catName: 'Вытяжки', icon: '🔧', link: '#' },
          { catName: 'Кухонные плиты', icon: '🔧', link: '#' },
          { catName: 'Морозильники', icon: '🔧', link: '#' },
          { catName: 'Унитазы', icon: '🔧', link: '#' },
          { catName: 'Водонагреватели', icon: '🔧', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: '🔧', link: '#' },
          { catName: 'Автокамеры', icon: '🔧', link: '#' },
          { catName: 'Газонокосилки', icon: '🔧', link: '#' },
        ],
      },
      {
        catName: 'Жалюзи, шторы',
        icon: '🔧',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: '🔧', link: '#' },
          { catName: 'Вытяжки', icon: '🔧', link: '#' },
          { catName: 'Кухонные плиты', icon: '🔧', link: '#' },
          { catName: 'Морозильники', icon: '🔧', link: '#' },
          { catName: 'Унитазы', icon: '🔧', link: '#' },
          { catName: 'Водонагреватели', icon: '🔧', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: '🔧', link: '#' },
          { catName: 'Автокамеры', icon: '🔧', link: '#' },
          { catName: 'Газонокосилки', icon: '🔧', link: '#' },
        ],
      },
      {
        catName: 'Жалюзи, шторы',
        icon: '🔧',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: '🔧', link: '#' },
          { catName: 'Вытяжки', icon: '🔧', link: '#' },
          { catName: 'Кухонные плиты', icon: '🔧', link: '#' },
          { catName: 'Морозильники', icon: '🔧', link: '#' },
          { catName: 'Унитазы', icon: '🔧', link: '#' },
          { catName: 'Водонагреватели', icon: '🔧', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: '🔧', link: '#' },
          { catName: 'Автокамеры', icon: '🔧', link: '#' },
          { catName: 'Газонокосилки', icon: '🔧', link: '#' },
        ],
      },
      {
        catName: 'Жалюзи, шторы',
        icon: '🔧',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: '🔧', link: '#' },
          { catName: 'Вытяжки', icon: '🔧', link: '#' },
          { catName: 'Кухонные плиты', icon: '🔧', link: '#' },
          { catName: 'Морозильники', icon: '🔧', link: '#' },
          { catName: 'Унитазы', icon: '🔧', link: '#' },
          { catName: 'Водонагреватели', icon: '🔧', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: '🔧', link: '#' },
          { catName: 'Автокамеры', icon: '🔧', link: '#' },
          { catName: 'Газонокосилки', icon: '🔧', link: '#' },
        ],
      },
      {
        catName: 'Жалюзи, шторы',
        icon: '🔧',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: '🔧', link: '#' },
          { catName: 'Вытяжки', icon: '🔧', link: '#' },
          { catName: 'Кухонные плиты', icon: '🔧', link: '#' },
          { catName: 'Морозильники', icon: '🔧', link: '#' },
          { catName: 'Унитазы', icon: '🔧', link: '#' },
          { catName: 'Водонагреватели', icon: '🔧', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: '🔧', link: '#' },
          { catName: 'Автокамеры', icon: '🔧', link: '#' },
          { catName: 'Газонокосилки', icon: '🔧', link: '#' },
        ],
      },
      {
        catName: 'Жалюзи, шторы',
        icon: '🔧',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: '🔧', link: '#' },
          { catName: 'Вытяжки', icon: '🔧', link: '#' },
          { catName: 'Кухонные плиты', icon: '🔧', link: '#' },
          { catName: 'Морозильники', icon: '🔧', link: '#' },
          { catName: 'Унитазы', icon: '🔧', link: '#' },
          { catName: 'Водонагреватели', icon: '🔧', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: '🔧', link: '#' },
          { catName: 'Автокамеры', icon: '🔧', link: '#' },
          { catName: 'Газонокосилки', icon: '🔧', link: '#' },
        ],
      },
      {
        catName: 'Жалюзи, шторы',
        icon: '🔧',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: '🔧', link: '#' },
          { catName: 'Вытяжки', icon: '🔧', link: '#' },
          { catName: 'Кухонные плиты', icon: '🔧', link: '#' },
          { catName: 'Морозильники', icon: '🔧', link: '#' },
          { catName: 'Унитазы', icon: '🔧', link: '#' },
          { catName: 'Водонагреватели', icon: '🔧', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: '🔧', link: '#' },
          { catName: 'Автокамеры', icon: '🔧', link: '#' },
          { catName: 'Газонокосилки', icon: '🔧', link: '#' },
        ],
      },
      {
        catName: 'Жалюзи, шторы',
        icon: '🔧',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: '🔧', link: '#' },
          { catName: 'Вытяжки', icon: '🔧', link: '#' },
          { catName: 'Кухонные плиты', icon: '🔧', link: '#' },
          { catName: 'Морозильники', icon: '🔧', link: '#' },
          { catName: 'Унитазы', icon: '🔧', link: '#' },
          { catName: 'Водонагреватели', icon: '🔧', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: '🔧', link: '#' },
          { catName: 'Автокамеры', icon: '🔧', link: '#' },
          { catName: 'Газонокосилки', icon: '🔧', link: '#' },
        ],
      },
      {
        catName: 'Жалюзи, шторы',
        icon: '🔧',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: '🔧', link: '#' },
          { catName: 'Вытяжки', icon: '🔧', link: '#' },
          { catName: 'Кухонные плиты', icon: '🔧', link: '#' },
          { catName: 'Морозильники', icon: '🔧', link: '#' },
          { catName: 'Унитазы', icon: '🔧', link: '#' },
          { catName: 'Водонагреватели', icon: '🔧', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: '🔧', link: '#' },
          { catName: 'Автокамеры', icon: '🔧', link: '#' },
          { catName: 'Газонокосилки', icon: '🔧', link: '#' },
        ],
      },
      {
        catName: 'Жалюзи, шторы',
        icon: '🔧',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: '🔧', link: '#' },
          { catName: 'Вытяжки', icon: '🔧', link: '#' },
          { catName: 'Кухонные плиты', icon: '🔧', link: '#' },
          { catName: 'Морозильники', icon: '🔧', link: '#' },
          { catName: 'Унитазы', icon: '🔧', link: '#' },
          { catName: 'Водонагреватели', icon: '🔧', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: '🔧', link: '#' },
          { catName: 'Автокамеры', icon: '🔧', link: '#' },
          { catName: 'Газонокосилки', icon: '🔧', link: '#' },
        ],
      },
      {
        catName: 'Жалюзи, шторы',
        icon: '🔧',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: '🔧', link: '#' },
          { catName: 'Вытяжки', icon: '🔧', link: '#' },
          { catName: 'Кухонные плиты', icon: '🔧', link: '#' },
          { catName: 'Морозильники', icon: '🔧', link: '#' },
          { catName: 'Унитазы', icon: '🔧', link: '#' },
          { catName: 'Водонагреватели', icon: '🔧', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: '🔧', link: '#' },
          { catName: 'Автокамеры', icon: '🔧', link: '#' },
          { catName: 'Газонокосилки', icon: '🔧', link: '#' },
        ],
      },
      {
        catName: 'Жалюзи, шторы',
        icon: '🔧',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: '🔧', link: '#' },
          { catName: 'Вытяжки', icon: '🔧', link: '#' },
          { catName: 'Кухонные плиты', icon: '🔧', link: '#' },
          { catName: 'Морозильники', icon: '🔧', link: '#' },
          { catName: 'Унитазы', icon: '🔧', link: '#' },
          { catName: 'Водонагреватели', icon: '🔧', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: '🔧', link: '#' },
          { catName: 'Автокамеры', icon: '🔧', link: '#' },
          { catName: 'Газонокосилки', icon: '🔧', link: '#' },
        ],
      },
      {
        catName: 'Жалюзи, шторы',
        icon: '🔧',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: '🔧', link: '#' },
          { catName: 'Вытяжки', icon: '🔧', link: '#' },
          { catName: 'Кухонные плиты', icon: '🔧', link: '#' },
          { catName: 'Морозильники', icon: '🔧', link: '#' },
          { catName: 'Унитазы', icon: '🔧', link: '#' },
          { catName: 'Водонагреватели', icon: '🔧', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: '🔧', link: '#' },
          { catName: 'Автокамеры', icon: '🔧', link: '#' },
          { catName: 'Газонокосилки', icon: '🔧', link: '#' },
        ],
      },
      {
        catName: 'Жалюзи, шторы',
        icon: '🔧',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: '🔧', link: '#' },
          { catName: 'Вытяжки', icon: '🔧', link: '#' },
          { catName: 'Кухонные плиты', icon: '🔧', link: '#' },
          { catName: 'Морозильники', icon: '🔧', link: '#' },
          { catName: 'Унитазы', icon: '🔧', link: '#' },
          { catName: 'Водонагреватели', icon: '🔧', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: '🔧', link: '#' },
          { catName: 'Автокамеры', icon: '🔧', link: '#' },
          { catName: 'Газонокосилки', icon: '🔧', link: '#' },
        ],
      },
      {
        catName: 'Жалюзи, шторы',
        icon: '🔧',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: '🔧', link: '#' },
          { catName: 'Вытяжки', icon: '🔧', link: '#' },
          { catName: 'Кухонные плиты', icon: '🔧', link: '#' },
          { catName: 'Морозильники', icon: '🔧', link: '#' },
          { catName: 'Унитазы', icon: '🔧', link: '#' },
          { catName: 'Водонагреватели', icon: '🔧', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: '🔧', link: '#' },
          { catName: 'Автокамеры', icon: '🔧', link: '#' },
          { catName: 'Газонокосилки', icon: '🔧', link: '#' },
        ],
      },
      {
        catName: 'Жалюзи, шторы',
        icon: '🔧',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: '🔧', link: '#' },
          { catName: 'Вытяжки', icon: '🔧', link: '#' },
          { catName: 'Кухонные плиты', icon: '🔧', link: '#' },
          { catName: 'Морозильники', icon: '🔧', link: '#' },
          { catName: 'Унитазы', icon: '🔧', link: '#' },
          { catName: 'Водонагреватели', icon: '🔧', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: '🔧', link: '#' },
          { catName: 'Автокамеры', icon: '🔧', link: '#' },
          { catName: 'Газонокосилки', icon: '🔧', link: '#' },
        ],
      },
      {
        catName: 'Жалюзи, шторы',
        icon: '🔧',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: '🔧', link: '#' },
          { catName: 'Вытяжки', icon: '🔧', link: '#' },
          { catName: 'Кухонные плиты', icon: '🔧', link: '#' },
          { catName: 'Морозильники', icon: '🔧', link: '#' },
          { catName: 'Унитазы', icon: '🔧', link: '#' },
          { catName: 'Водонагреватели', icon: '🔧', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: '🔧', link: '#' },
          { catName: 'Автокамеры', icon: '🔧', link: '#' },
          { catName: 'Газонокосилки', icon: '🔧', link: '#' },
        ],
      },
      {
        catName: 'Жалюзи, шторы',
        icon: '🔧',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: '🔧', link: '#' },
          { catName: 'Вытяжки', icon: '🔧', link: '#' },
          { catName: 'Кухонные плиты', icon: '🔧', link: '#' },
          { catName: 'Морозильники', icon: '🔧', link: '#' },
          { catName: 'Унитазы', icon: '🔧', link: '#' },
          { catName: 'Водонагреватели', icon: '🔧', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: '🔧', link: '#' },
          { catName: 'Автокамеры', icon: '🔧', link: '#' },
          { catName: 'Газонокосилки', icon: '🔧', link: '#' },
        ],
      },
      {
        catName: 'Жалюзи, шторы',
        icon: '🔧',
        link: '#',
        submenu: [
          { catName: 'Холодильники', icon: '🔧', link: '#' },
          { catName: 'Вытяжки', icon: '🔧', link: '#' },
          { catName: 'Кухонные плиты', icon: '🔧', link: '#' },
          { catName: 'Морозильники', icon: '🔧', link: '#' },
          { catName: 'Унитазы', icon: '🔧', link: '#' },
          { catName: 'Водонагреватели', icon: '🔧', link: '#' },
          { catName: 'Вентиляторы вытяжные', icon: '🔧', link: '#' },
          { catName: 'Автокамеры', icon: '🔧', link: '#' },
          { catName: 'Газонокосилки', icon: '🔧', link: '#' },
        ],
      },
    ],
  },
];

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
      {data && (
        <menu>
          {menu.map((menuItem) => (
            <li
              key={menuItem.id + Math.random.toString()}
              className="mt-2 text-gray-600 hover:bg-red-50 hover:text-red-600"
            >
              <Link
                href={menuItem.slug}
                className="block"
                onMouseEnter={() =>
                  handleMouseEnter(menuItem?.children ? menuItem?.children : [])
                }
                onClick={toggleDropdown}
              >
                <div className="mr-1 inline-block">
                  <Image
                    src={menuItem.imageUrl ? menuItem.imageUrl : '/vercel.svg'}
                    alt={menuItem.name}
                    width={15}
                    height={15}
                  />
                </div>
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

import { CartContext } from '@/src/contex/CartContex';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import ListItem from './list/listItem';

export default function PersonalData() {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      <ListItem
        image={<></>}
        label="Имя"
        data="Александр"
        ModalWindowType="NAME"
      />
      <ListItem
        image={<></>}
        label="Почта"
        data="zhukoff.alex@gmi"
        ModalWindowType="EMAIL"
      />
      <ListItem
        image={<></>}
        label="Пароль"
        data={
          <svg viewBox="0 0 116 6" width="116" height="6">
            <defs>
              <pattern
                id="passwordDots"
                x="0"
                y="0"
                width="10"
                height="6"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="3" cy="3" r="3" fill="currentColor"></circle>
              </pattern>
            </defs>
            <rect
              x="0"
              y="0"
              width="116"
              height="6"
              fill="url(#passwordDots)"
            ></rect>
          </svg>
        }
        ModalWindowType="PASSWORD"
      />
      <ListItem
        image={<></>}
        label="Основной телефон для связи"
        data="+375 (29) 211-64-45"
        ModalWindowType="PHONE"
      />
      <ListItem
        image={<></>}
        label="Адрес"
        data="г. Витебск ул. Богатырева д. 10"
        ModalWindowType="ADDRESS"
      />
    </ul>
  );
}

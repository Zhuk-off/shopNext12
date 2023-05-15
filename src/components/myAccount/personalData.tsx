import { useSession } from 'next-auth/react';
import ListItem from './list/listItem';

export default function PersonalData() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <ul role="list" className="divide-y divide-gray-100">
      <ListItem
        image={<></>}
        label="Имя"
        data={session?.user.name}
        ModalWindowType="NAME"
      />
      <ListItem
        image={<></>}
        label="Почта"
        data={session?.user.email}
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
        data={session?.user.info.phone}
        ModalWindowType="PHONE"
      />
      <ListItem
        image={<></>}
        label="Адрес"
        data={session?.user.info.address}
        ModalWindowType="ADDRESS"
      />
    </ul>
  );
}

import { useSession } from 'next-auth/react';
import ListItem from './list/listItem';
import { GET_CUSTOMER_DATA } from '@/src/utils/apollo/queriesConst';
import { useQuery } from '@apollo/client';
import { ICustomerData } from '@/src/interfaces/apollo/login.interface';

export default function PersonalData() {
  const { data: session } = useSession();
  const refreshToken =
    typeof localStorage !== 'undefined'
      ? localStorage.getItem('refreshToken')
      : null;
  const authorizationHeader = refreshToken
    ? { authorization: `Bearer ${refreshToken}` }
    : {};

  const { loading, error, data } = useQuery<ICustomerData>(GET_CUSTOMER_DATA, {
    variables: {
      id: session ? session.user.info.id : '',
    },
    context: {
      headers: authorizationHeader,
    },
    pollInterval: 5000,
  });

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {/* <button onClick={() => handleButton()}>get data</button> */}
      <ListItem
        image={<></>}
        label="Имя"
        data={data?.customer.firstName ? data?.customer.firstName : '-'}
        ModalWindowType="NAME"
      />
      <ListItem
        image={<></>}
        label="Почта"
        data={data?.customer.email ? data?.customer.email : '-'}
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
        email={data?.customer.email ? data?.customer.email : ''}
        ModalWindowType="PASSWORD"
      />
      <ListItem
        image={<></>}
        label="Основной телефон для связи"
        data={data?.customer.billing.phone ? data?.customer.billing.phone : '-'}
        ModalWindowType="PHONE"
      />
      <ListItem
        image={<></>}
        label="Адрес"
        data={
          data?.customer.billing.address1
            ? data?.customer.billing.address1
            : '-'
        }
        ModalWindowType="ADDRESS"
      />
    </ul>
  );
}

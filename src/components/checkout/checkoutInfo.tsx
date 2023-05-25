import { GET_CUSTOMER_DATA } from '@/src/utils/apollo/queriesConst';
import { sumToStringWithComa } from '@/src/utils/helpers';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Spinner } from '../spinner';
import { getAuthorizationHeaderWithRefreshToken } from '@/src/utils/helpers/localStorageHelpers';
import { useSession } from 'next-auth/react';
import { ICustomerData } from '@/src/interfaces/apollo/login.interface';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  username: string;
  email: string;
  phone: string;
  address1Billing: string;
  comments: string;
};

export const ChekcoutInfo = ({
  sum,
  totalCount,
  loading,
}: {
  sum: number;
  totalCount: number | undefined;
  loading: boolean;
}) => {
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const { data: session } = useSession();

  const sumWithComa = sumToStringWithComa(sum);
  const {
    loading: userDataLoading,
    error: userDataError,
    data: userDataData,
  } = useQuery<ICustomerData>(GET_CUSTOMER_DATA, {
    variables: {
      id: session ? session.user.info.id : '',
    },
    context: {
      headers: getAuthorizationHeaderWithRefreshToken(),
    },
    pollInterval: 2000,
  });
  const [personalData, setPersonalData] = useState({
    username: '',
    email: '',
    phone: '',
    address1Billing: '',
    comments: '',
    change: false,
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  useEffect(() => {
    if (userDataData && !personalData.change) {
      setPersonalData((old) => ({
        ...old,
        username: userDataData.customer.firstName
          ? userDataData.customer.firstName
          : '',
        email: userDataData.customer.email ? userDataData.customer.email : '',
        // phone: userDataData.customer.billing.phone
        //   ? userDataData.customer.billing.phone
        //   : '',
        // address1Billing: userDataData.customer.billing.address1
        //   ? userDataData.customer.billing.address1
        // : '',
        change: false,
      }));
    }
  }, [personalData.change, userDataData]);

  const handleFieldChange = (e: { target: { id: string; value: string } }) => {
    setPersonalData((old) => ({
      ...old,
      [e.target.id]: e.target.value,
      change: true,
    }));
  };

  // Если форма заполнена верно, то произойдет отправка формы (входной параметр data не нужен, потому что все есть в state)
  // TODO Устнарить БАГ - при отправки формы, если данные не введены вручную, а получены из запроса то поля - undefined
  const onSubmit: SubmitHandler<Inputs> = () => {
    console.log('object');
  };

  // console.log(userDataData);
  // console.log(personalData);
  console.log(errors);

  return (
    <div className="flex w-96 flex-col space-y-3 p-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="username"
            className="block text-left text-sm font-medium leading-6 text-gray-900"
          >
            Имя
          </label>
          <div className="mt-2">
            <input
              {...register('username', {})}
              id="username"
              name="username"
              // required
              disabled
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus-visible:outline-none sm:text-sm sm:leading-6"
              onChange={(e) => handleFieldChange(e)}
              value={personalData.username}
            />
            {/* {errors.username && (
              <span className="text-sm text-red-600" role="alert">
                {errors.username.message}
              </span>
            )} */}
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-left text-sm font-medium leading-6 text-gray-900"
          >
            Email
          </label>
          <div className="mt-2">
            <input
              {...register('email', {})}
              id="email"
              name="email"
              type="email"
              // required
              disabled
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus-visible:outline-none sm:text-sm sm:leading-6"
              onChange={(e) => handleFieldChange(e)}
              value={personalData.email}
            />
            {/* {errors.email && (
              <span className="text-sm text-red-600" role="alert">
                {errors.email.message}
              </span>
            )} */}
          </div>
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-left text-sm font-medium leading-6 text-gray-900"
          >
            Телефон
          </label>
          <div className="mt-2">
            <input
              {...register('phone', {
                required: 'Поле Номер телефона обязательно для заполнения',
                minLength: {
                  value: 7,
                  message:
                    'Поле Номер телефона должно содержать не менее 7 символов',
                },
              })}
              name="phone"
              id="phone"
              type="text"
              required
              placeholder="Пример: +375 (29) 811-81-81"
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus-visible:outline-none sm:text-sm sm:leading-6"
              onChange={(e) => handleFieldChange(e)}
              value={personalData.phone}
            />
            {errors.phone && (
              <span className="text-sm text-red-600" role="alert">
                {errors.phone.message}
              </span>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="address1Billing"
            className="block text-left text-sm font-medium leading-6 text-gray-900"
          >
            Адрес
          </label>
          <div className="mt-2">
            <input
              {...register('address1Billing', {
                required: 'Поле Адрес обязательно для заполнения',
                minLength: {
                  value: 5,
                  message: 'Поле Адрес должно содержать не менее 5 символов',
                },
              })}
              id="address1Billing"
              name="address1Billing"
              required
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus-visible:outline-none sm:text-sm sm:leading-6"
              onChange={(e) => handleFieldChange(e)}
              value={personalData.address1Billing}
            />
            {errors.address1Billing && (
              <span className="text-sm text-red-600" role="alert">
                {errors.address1Billing.message}
              </span>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="comments"
            className="block text-left text-sm font-medium leading-6 text-gray-900"
          >
            Комментарий к заказу
          </label>
          <div className="col-span-full">
            <div className="mt-2">
              <textarea
                {...register('comments')}
                id="comments"
                name="comments"
                rows={3}
                onChange={(e) => handleFieldChange(e)}
                className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus-visible:outline-none sm:text-sm sm:leading-6"
                defaultValue={''}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-5 block w-full rounded-md bg-pink-700 p-3 font-semibold text-white transition hover:bg-pink-800"
        >
          <div className="text-center">
            {' '}
            {loadingCheckout ? (
              <div className="pt-1">
                <Spinner />
              </div>
            ) : (
              'Подтвердить заказ'
            )}
          </div>
        </button>
      </form>
    </div>
  );
};

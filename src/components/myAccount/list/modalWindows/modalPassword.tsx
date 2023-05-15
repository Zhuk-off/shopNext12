import { Spinner } from '@/src/components/spinner';
import { gql, useMutation } from '@apollo/client';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import React, { forwardRef, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  pass: string;
  newPass: string;
  confirmNewPass: string;
  policy: boolean;
};

type Pass = {
  pass: string;
  newPass: string;
  confirmNewPass: string;
};

export const CHANGE = gql`
  mutation MyMutation($id: ID!, $password: String!) {
    updateCustomer(input: { id: $id, password: $password }) {
      authToken
      refreshToken
    }
  }
`;

export const LOGIN = gql`
  mutation Login($password: String!, $username: String!) {
    login(input: { password: $password, username: $username }) {
      refreshToken
      authToken
    }
  }
`;

function ModalPassword(
  { closeModal, email }: { closeModal: () => void; email: string },
  ref: React.Ref<HTMLDivElement>
) {
  const [pageState, setPageState] = useState({
    error: '',
    processing: false,
  });
  const { data: session } = useSession();
  const [pass, setPass] = useState<Pass>({
    pass: '',
    newPass: '',
    confirmNewPass: '',
  });

  const [policy, setPolicy] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const [changePassword, { data: changePasswordData, loading, error }] =
    useMutation(CHANGE);
  const [login, { data: loginData, loading: loginLoading, error: loginError }] =
    useMutation(LOGIN);

  const handleFieldChange = (e: { target: { id: string; value: string } }) => {
    setPass((old) => ({ ...old, [e.target.id]: e.target.value }));
  };

  const refreshToken =
    typeof localStorage !== 'undefined'
      ? localStorage.getItem('refreshToken')
      : null;
  const authorizationHeader = refreshToken
    ? { authorization: `Bearer ${refreshToken}` }
    : {};

  const simplifyError = (error: string) => {
    const errorMap: { [key: string]: string } = {
      incorrect_password: 'Не верный пароль',
    };
    return errorMap[error] ?? 'Не известная ошибка';
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // Проверяем действующий пароль
    await login({
      variables: {
        username: email,
        password: data.pass,
      },
      context: {
        headers: authorizationHeader,
      },
    })
      .then(() => {
        // если действующий пароль верен, то меняем пароль
        changePassword({
          variables: {
            id: session?.user.info.id,
            password: data.newPass,
          },
          context: {
            headers: authorizationHeader,
          },
        })
          .then(() => {
            // если пароль поменяли, то закрываем окно
            closeModal();
          })
          .catch((error) => {
            setPageState((old) => ({
              ...old,
              error: error.message ?? 'Что-то пошло не так...',
            }));
          });
      })
      .catch((error) => {
        setPageState((old) => ({
          ...old,
          error: error.message ?? 'Что-то пошло не так...',
        }));
      });
  };

  if (loginError && pageState.error === '') {
    setPageState((old) => ({
      ...old,
      processing: false,
      error: loginError.message ? loginError.message : '',
    }));
  }

  // Надо для проверки паролей на совпадение, иначе не видно переменной password
  const password = watch('newPass', '');

  return (
    <Dialog.Panel
      ref={ref}
      className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
    >
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-gray-900"
      >
        Изменение пароля
      </Dialog.Title>
      <button
        className="absolute right-5 top-4 text-gray-600"
        onClick={closeModal}
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4 flex items-center justify-between">
          <label
            htmlFor="pass"
            className="block text-sm leading-6 text-gray-400"
          >
            Текущий пароль
          </label>
        </div>
        <div className="mt-1">
          <input
            {...register('pass', {
              required: 'Поле Текущий пароль обязательно для заполнения',
              minLength: {
                value: 1,
                message:
                  'Поле Текущий пароль должно содержать не менее 1 символов',
              },
            })}
            name="pass"
            id="pass"
            type="password"
            value={pass.pass}
            onChange={(e) => handleFieldChange(e)}
            className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 leading-5 placeholder-gray-500 focus:border-blue-500 focus:placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
            autoFocus
          />
          {errors.pass && (
            <span className="text-sm text-red-600" role="alert">
              {errors.pass.message}
            </span>
          )}
          {pageState.error !== '' && (
            <span className="text-sm text-red-600">
              {simplifyError(pageState.error)}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <label
            htmlFor="newPass"
            className="block text-sm leading-6 text-gray-400"
          >
            Новый пароль
          </label>
        </div>
        <div className="mt-1">
          <input
            {...register('newPass', {
              required: 'Поле Новый пароль  обязательно для заполнения',
              minLength: {
                value: 8,
                message:
                  'Поле Новый пароль должно содержать не менее 8 символов',
              },
            })}
            name="newPass"
            id="newPass"
            type="password"
            value={pass.newPass}
            onChange={(e) => handleFieldChange(e)}
            className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 leading-5 placeholder-gray-500 focus:border-blue-500 focus:placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
            autoFocus
          />
          {errors.newPass && (
            <span className="text-sm text-red-600" role="alert">
              {errors.newPass.message}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <label
            htmlFor="confirmNewPass"
            className="block text-sm leading-6 text-gray-400"
          >
            Повторите новый пароль
          </label>
        </div>
        <div className="mt-1">
          <input
            {...register('confirmNewPass', {
              validate: (value) => value === password || 'Пароли не совпадают',
            })}
            name="confirmNewPass"
            id="confirmNewPass"
            type="password"
            value={pass.confirmNewPass}
            onChange={(e) => handleFieldChange(e)}
            className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 leading-5 placeholder-gray-500 focus:border-blue-500 focus:placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
            autoFocus
          />
          {errors.confirmNewPass && (
            <span className="text-sm text-red-600" role="alert">
              {errors.confirmNewPass.message}
            </span>
          )}
        </div>
        <div className="mt-4 flex gap-2 ">
          <input
            className="h-4 w-4 cursor-pointer"
            {...register('policy', {
              required: 'Вы должны согласиться с политикой конфиденциальности',
            })}
            type="checkbox"
            checked={policy}
            name="policy"
            id="policy"
            onChange={() => setPolicy(!policy)}
          />

          <span className="shrink-1 block text-left text-sm text-gray-600">
            Подтверждаю ознакомление с Политикой обработки персональных данных и
            даю согласие на их обработку
          </span>
        </div>
        {errors.policy && (
          <span className="text-sm text-red-600" role="alert">
            {errors.policy.message}
          </span>
        )}
        <div className="mt-4 text-center">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            // onClick={closeModal}
          >
            {loading || loginLoading ? (
              <div className="px-[25px]">
                <Spinner />
              </div>
            ) : (
              'Сохранить'
            )}
          </button>
        </div>
      </form>
    </Dialog.Panel>
  );
}

export default forwardRef<
  HTMLDivElement,
  { closeModal: () => void; email: string }
>(ModalPassword);

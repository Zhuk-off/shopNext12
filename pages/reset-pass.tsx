import Container from '@/src/components/container';
import { SEND_PASSWORD_RESET_EMAIL } from '@/src/utils/apollo/mutationsConst';
import { useMutation } from '@apollo/client';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  username: string;
};

interface ISendPasswordResetEmail {
  sendPasswordResetEmail: SendPasswordResetEmail;
}
interface SendPasswordResetEmail {
  success: boolean;
  __typename: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [authState, setAuthState] = useState<Inputs>({
    username: '',
  });
  const { data: session } = useSession();
  const [
    sendPasswordResetEmail,
    {
      data: sendPasswordResetEmailData,
      loading: loadingSendPasswordResetEmail,
      error,
    },
  ] = useMutation<ISendPasswordResetEmail>(SEND_PASSWORD_RESET_EMAIL);

  const [pageState, setPageState] = useState({
    error: '',
    processing: false,
  });

  if (pageState.error !== '' && error) {
    setPageState((old) => ({ ...old, error: error.message }));
  }

  const handleFieldChange = (e: { target: { id: string; value: string } }) => {
    setAuthState((old) => ({ ...old, [e.target.id]: e.target.value }));
  };

  const simplifyError = (error: string) => {
    const errorMap: { [key: string]: string } = {
      CredentialsSignin: 'Не верный логин или пароль',
      'email not found': 'Пользователь с таким email не найден',
      'Failed to fetch': 'Проверьте подключение к сети',
      'sendPasswordResetEmail-nosuccess': 'Что-то пошло не так',
    };
    return errorMap[error] ?? 'Не известная ошибка';
  };

  // Если форма заполнена верно, то произойдет отправка формы (входной параметр data не нужен, потому что все есть в state)
  const onSubmit: SubmitHandler<Inputs> = () => {
    setPageState((old) => ({ ...old, error: '' }));
    // запустим функцию для сброса пароля
    sendPasswordResetEmail({
      variables: {
        username: authState.username,
      },
    });
  };

  if (
    sendPasswordResetEmailData &&
    sendPasswordResetEmailData.sendPasswordResetEmail.success === true &&
    pageState.error === ''
  ) {
    setPageState((old) => ({
      ...old,
      error: 'sendPasswordResetEmail-nosuccess',
    }));
  }

  return (
    <div className="fixed inset-0 overflow-y-auto">
      <div>
        <p>Signed in as {session && session?.user?.name}</p>
      </div>
      <Container>
        <Link
          href={'/login'}
          className="flex items-center gap-1 font-medium text-indigo-600 hover:text-gray-900"
        >
          <ArrowLeftIcon width={15} height={15} /> Назад
        </Link>
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <div className="justify-cent7er flex min-h-full flex-1 flex-col px-6 py-12 lg:px-8">
            <div className="mb-12">Send password reset link to email</div>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <Image
                className="m-auto h-8 w-auto sm:h-10"
                src="/logo.svg"
                alt="spec1.by"
                width={126}
                height={24}
              />
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              {pageState.error !== '' && (
                <p className="text-red-500">{simplifyError(pageState.error)}</p>
              )}
              {!sendPasswordResetEmailData ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-left text-sm font-medium leading-6 text-gray-900"
                    >
                      Email
                    </label>
                    <div className="mt-2">
                      <input
                        {...register('username', {
                          required: 'Поле Email обязательно для заполнения',
                          pattern: {
                            value: /\S+@\S+\.\S+/,
                            message:
                              'Поле Email должно быть в формате example@domain.com',
                          },
                        })}
                        id="username"
                        name="username"
                        required
                        className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) => handleFieldChange(e)}
                        value={authState.username}
                      />
                      {errors.username && (
                        <span className="text-sm text-red-600" role="alert">
                          {errors.username.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <button
                      className="mt-8 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      type="submit"
                      disabled={pageState.processing}
                    >
                      Send password reset link to email
                    </button>
                  </div>
                </form>
              ) : (
                <div className="font-medium">
                  <p>
                    Письмо с ссылкой для восстановления пароля отправлено.
                    Проверьте вашу почту!
                  </p>
                  <Link
                    href={'/'}
                    className="mt-8 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    На главную
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

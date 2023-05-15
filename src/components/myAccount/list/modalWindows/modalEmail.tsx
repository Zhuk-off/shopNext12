import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import React, { forwardRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  name: string;
  password: string;
  policy: boolean;
};

function ModalEmail(
  { closeModal }: { closeModal: () => void },
  ref: React.Ref<HTMLDivElement>
) {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [policy, setPolicy] = useState(false);
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const handleName = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setName(e.target.value);
  };
  const handlePass = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPass(e.target.value);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };
  console.log(session);

  return (
    <Dialog.Panel
      ref={ref}
      className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
    >
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-gray-900"
      >
        Изменение почты
      </Dialog.Title>
      <p className="mt-2 text-sm">
        Для изменения вашей почты
        <span> {session ? session?.user.email : null} </span>
        нужно ввести текущий пароль.
      </p>
      <button
        className="absolute right-5 top-4 text-gray-600"
        onClick={closeModal}
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-3 flex items-center justify-between">
          <label
            htmlFor="name"
            className="block text-sm leading-6 text-gray-400"
          >
            Почта
          </label>
        </div>
        <div className="mt-1">
          <input
            {...register('name', {
              required: 'Поле Имя обязательно для заполнения',
              minLength: 2,
            })}
            name="name"
            id="name"
            type="text"
            placeholder="example@gmail.com"
            value={name}
            onChange={handleName}
            className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 leading-5 placeholder-gray-500 focus:border-blue-500 focus:placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
            autoFocus
          />
          {errors.name && (
            <span className="text-sm text-red-600" role="alert">
              {errors.name.message}
            </span>
          )}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm leading-6 text-gray-400"
          >
            Пароль
          </label>
        </div>
        <div className="mt-1">
          <input
            {...register('password', {
              required: 'Поле Пароль обязательно для заполнения',
              minLength: {
                value: 1,
                message: 'Поле Пароль должно содержать не менее 1 символов',
              },
            })}
            name="password"
            id="password"
            type="password"
            placeholder="Пароль"
            value={pass}
            onChange={handlePass}
            className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 leading-5 placeholder-gray-500 focus:border-blue-500 focus:placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
            autoFocus
          />
          {errors.password && (
            <span className="text-sm text-red-600" role="alert">
              {errors.password.message}
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
            Сохранить
          </button>
        </div>
      </form>
    </Dialog.Panel>
  );
}

export default forwardRef<HTMLDivElement, { closeModal: () => void }>(
  ModalEmail
);

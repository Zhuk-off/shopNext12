import { LOGIN_AUTH } from '@/src/utils/apollo/mutationsConst';
import { useMutation } from '@apollo/client';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Dispatch, FormEvent, Fragment, SetStateAction, useState } from 'react';

export default function LoginModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const [auth, { data, loading, error, reset }] = useMutation(LOGIN_AUTH);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function handleForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // предотвращаем отправку формы по умолчанию
    // выполняем действия с данными формы, например, отправляем их на сервер
    console.log(`Email: ${login}, Password: ${pass}`);

    auth({ variables: { username: login, password: pass } });
    // closeModal();

    // closeModal();
  }

  if (data) {
    // console.log(data);
  }
  if (error) {
    // console.log('error', error);
    reset();
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Sign in to your account
                  </Dialog.Title>
                  {error && <p className='text-red-600'>{error.message}</p>}
                  <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
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
                      <form
                        className="space-y-6"
                        onSubmit={handleForm} // обработчик отправки формы
                      >
                        <div>
                          <label
                            htmlFor="login"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Login
                          </label>
                          <div className="mt-2">
                            <input
                              id="login"
                              name="login"
                              // type="login"
                              // autoComplete="email"
                              onChange={(e) => setLogin(e.target.value)}
                              value={login}
                              required
                              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between">
                            <label
                              htmlFor="password"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Password
                            </label>
                            <div className="text-sm">
                              <a
                                href="#"
                                className="font-semibold text-indigo-600 hover:text-indigo-500"
                              >
                                Forgot password?
                              </a>
                            </div>
                          </div>
                          <div className="mt-2">
                            <input
                              id="password"
                              name="password"
                              type="password"
                              autoComplete="current-password"
                              onChange={(e) => setPass(e.target.value)}
                              value={pass}
                              required
                              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div>
                          <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Sign in
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

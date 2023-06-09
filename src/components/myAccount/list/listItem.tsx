import { ModalWindowType } from '@/src/interfaces/account/account.interface';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode, useRef, useState } from 'react';
import ModalWindowData from './modalWindowData';

function ListItem({
  image,
  label,
  data,
  email,
  ModalWindowType,
}: {
  image: ReactNode;
  label: string;
  data: ReactNode;
  email?: string;
  ModalWindowType: ModalWindowType;
}) {
  const ref = useRef(null);
  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <li className="flex items-center justify-between gap-x-6 border-t border-gray-100 py-5">
      <div className="flex gap-x-4 overflow-hidden text-ellipsis">
        {image}
        <div className="flex min-w-0 flex-col">
          <p className="text-sm  leading-6 text-gray-400">{label}</p>
          <p className="mt-1 overflow-hidden text-ellipsis leading-5 text-gray-900">
            {data}
          </p>
        </div>
      </div>
      <div className="flex items-end ">
        <button type="button" onClick={openModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6 text-indigo-600 transition hover:text-pink-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </button>
      </div>

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
                <ModalWindowData
                  ModalWindowType={ModalWindowType}
                  email={email ? email : ''}
                  setIsOpen={setIsOpen}
                  ref={ref}
                />
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </li>
  );
}

export default ListItem;

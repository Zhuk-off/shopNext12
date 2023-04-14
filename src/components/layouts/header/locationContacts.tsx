import Link from 'next/link';
import { Location, Clock } from '../../icons';

import { Fragment, useState } from 'react';
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react';
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from '@heroicons/react/20/solid';

const products = [
  {
    name: 'Оплата',
    href: '#',
  },
  {
    name: 'Доставка',
    href: '#',
  },
  {
    name: 'Самовывоз',
    href: '#',
  },
];
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
];

const LocationContacts = () => {
  return (
    <div className="hidden md:flex p-2 whitespace-nowrap items-center">
      <div className='hover:text-red-500 mr-2'>
        <button
          type="button"
          className="flex items-center gap-1 focus:outline-none focus:ring"
          // onClick={() => setLocationPopUp(true)}
        >
          <Location className="h-4 w-4" aria-hidden="true" />
          <span>г. Витебск</span>
        </button>
      </div>
      <div className="flex h-full w-1/2 justify-end gap-3 border-r">
        <Link href={'#'} className='hidden lg:block hover:text-red-500'>Оплата частями</Link>
        <Link href={'#'} className='hidden lg:block hover:text-red-500'>Бонусная программа</Link>
        <Popover.Group className="flex lg:gap-x-12">
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 hover:text-red-500 focus:outline-none focus:ring-0">
              Еще
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 max-w-md overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-3">
                  {products.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <div className="group relative flex items-center gap-x-6 rounded-lg p-1 leading-6 hover:bg-red-100 hover:text-red-500">
                        <div>{item.name}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </Popover.Group>
      </div>

      <div className="flex h-full w-1/2 justify-end gap-3 border-r">
        <Link href={'#'} className='hover:text-red-500'>Viber</Link>
        <Link href={'#'} className='hover:text-red-500'>+375 29 344 55 66</Link>

        <Popover.Group className="flex lg:gap-x-12">
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 hover:text-red-500 focus:outline-none focus:ring-0">
              Еще
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute right-3/4 z-10 max-w-md overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-3">
                  <Link href="#">
                    <div className="group relative flex items-center gap-x-6 rounded-lg p-1 leading-6 hover:bg-red-100 hover:text-red-500">
                      <div>+375 29 344 55 66</div>
                    </div>
                  </Link>

                  <Link href="#">
                    <div className="group relative flex items-center gap-x-6 rounded-lg p-1 leading-6 hover:bg-red-100 hover:text-red-500">
                      <div>+375 29 344 55 66</div>
                    </div>
                  </Link>

                  <Link href="#">
                    <div className="group relative flex items-center gap-x-6 rounded-lg p-1 leading-6 hover:bg-red-100 hover:text-red-500">
                      <div>+375 29 344 55 66</div>
                    </div>
                  </Link>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </Popover.Group>
      </div>

      <div className="flex justify-center items-center gap-3 px-2">
        <div className="w-4">
          <Clock className='text-slate-500' />
        </div>
        <div>
          <div className="text-xs text-slate-500">Контакт-центр</div>
          <div className="text-xs text-slate-500">с 8:00 до 22:00</div>
        </div>


      </div>
    </div>
  );
};

export default LocationContacts;

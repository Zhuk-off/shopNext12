import { CartContext } from '@/src/contex/CartCounter';
import { Menu } from '@headlessui/react';
import { useRouter } from 'next/router';
import { useContext } from 'react';

//  function classNames(...classes: string[]) {
//   return classes.filter(Boolean).join(' ');
// }

export default function CartButton() {
  const [cart] = useContext(CartContext);
  const router = useRouter()
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button
        className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-full
         bg-white px-4 py-1 font-medium text-gray-900 shadow-sm ring-1 
         ring-inset ring-gray-300 hover:bg-gray-50"
         onClick={()=>router.push('/order')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
        {/* <CartCounter className='absolute left-24 top-1'/> */}
        <div className="bg absolute left-24 top-0 rounded-full bg-pink-700 px-1 text-xs text-white">
          {cart ? cart?.totalQty : null}
        </div>
        Корзина
      </Menu.Button>
    </Menu>
  );
}

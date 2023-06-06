import Link from 'next/link';
import React from 'react';

function TestHeaderExample() {
  return (
    <div className="bg-red-100">
      <h2 className="p-1 text-center font-bold text-red-600 transition-all">
        <span className="animate-pulse ">
          Внимание! Магазин не является действующим все цены и товары
          представленны для образца. Заказать сайт можно на{' '}
        </span>
        <span className="gradient-text font-fira-bold inline-block font-bold leading-tight tracking-[-0.04em] underline hover:animate-bounce hover:underline">
          <Link href={'https://zhukoff.by/'} className="hover:underline">
            Zhukoff.by
          </Link>
        </span>{' '}
      </h2>
    </div>
  );
}

export default TestHeaderExample;

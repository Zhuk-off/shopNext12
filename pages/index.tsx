import { Inter } from 'next/font/google';
import Header from '@/src/components/layouts/header';
import { Slider } from '@/src/components/slider';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className="">
      <div className="container mx-auto max-w-7xl ">
        <Header />
        <div className="mb-20 mt-12 rounded-xl px-20 ">
          <Slider />
        </div>

        <p className={inter.className}>Hello, Next.js!</p>
        <p style={inter.style}>Hello World</p>
      </div>
    </main>
  );
}

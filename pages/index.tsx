import { Inter } from 'next/font/google';
import Header from '@/src/components/layouts/header';
import { Slider } from '@/src/components/slider';
import { Banners } from '@/src/components/banners';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className="">
      <Header />
      <div className="container mx-auto max-w-7xl ">
        <div className="mb-20 mt-12 rounded-xl px-20 ">
          <Slider />
        </div>
        <Banners />
      </div>
    </main>
  );
}

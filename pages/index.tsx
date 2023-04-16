import { Inter } from 'next/font/google';
import Header from '@/src/components/layouts/header';
import { Slider } from '@/src/components/slider';
import { Banners } from '@/src/components/banners';
import Footer from '@/src/components/layouts/footer';
import Offers from '@/src/components/offers';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className="">
      <Header />
     
        <div className="mb-20 mt-12 rounded-xl px-20 ">
          <Slider />
        </div>
        <Banners />
        <Offers/>
    
      <Footer/>
    </main>
  );
}

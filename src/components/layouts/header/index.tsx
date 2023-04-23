import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import LocationContacts from './locationContacts';
import Promotions from './promotions';
import NavMenu from './menuSearchLogin';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { IHeader } from '@/src/interfaces/footerHeaderRestAPIDataResponse';
import { MenuItem } from '@/src/interfaces/apollo/buildMenu.interface';

const Header = ({ header,menu }: { header: IHeader | undefined ,menu:MenuItem[]}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  // console.log('header', header);
  // console.log('header', header);

  return (
    <header className="relative bg-gray-100 shadow">
      <div className="mx-auto max-w-7xl bg-gray-100 px-2 sm:px-6 lg:px-8">
        <LocationContacts />
        <NavMenu menu={menu}/>
        <Promotions />
      </div>
    </header>
  );
};

export default Header;

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import LocationContacts from './locationContacts';
import Promotions from './promotions';
import NavMenu from './menuSearchLogin';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className="relative bg-gray-100 shadow">
      <div className="mx-auto max-w-7xl bg-gray-100 px-2 sm:px-6 lg:px-8">
        <LocationContacts />
        <NavMenu />
        <Promotions />
      </div>
    </header>
  );
};

export default Header;

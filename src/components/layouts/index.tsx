import Header from './header';
import Footer from './footer';
import { IData } from '@/src/interfaces/footerHeaderRestAPIDataResponse';
import { ReactNode } from 'react';
import { MenuItem } from '@/src/interfaces/apollo/buildMenu.interface';

const Layout = ({
  children,
  headerFooter,
  menu,
}: {
  children: ReactNode;
  headerFooter: IData;
  menu: MenuItem[];
}) => {
  const { header, footer } = headerFooter || {};
  return (
    <div className="flex min-h-screen flex-col">
      <Header header={header} menu={menu} />
      <main className="container mx-auto flex-grow py-8">{children}</main>
      <Footer footer={footer} />
    </div>
  );
};

export default Layout;

/**
 * External Dependencies
 */

import Head from 'next/head';

/**
 * Internal Dependencies.
 */
// import { AppProvider } from '../context';
import Header from './header';
import Footer from './footer';
import {
  IData,
  IHeaderFooterContext,
} from '@/src/interfaces/footerHeaderRestAPIDataResponse';
import { ReactNode } from 'react';
import { MenuItem } from '@/src/interfaces/apollo/buildMenu.interface';
import { CartCountProvider } from '@/src/contex/CartContex';

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
  // const yoastSchema = seo?.schema ? replaceBackendWithFrontendUrl( JSON.stringify( seo.schema ) ) : null;

  return (
    <div>
      {/* <Seo seo={ seo || {} } uri={ uri || '' }/> */}
      {/* <Head>
					<link rel="shortcut icon" href={ footer?.favicon ?? '/favicon.ico' }/>
					{
						yoastSchema ?
							( <script
								type="application/ld+json"
								className="yoast-schema-graph"
								key="yoastSchema"
								dangerouslySetInnerHTML={ { __html: sanitize( yoastSchema ) } }
							/> ) :
							<title>{ header?.siteTitle ?? 'Nexts WooCommerce' }</title>
					}
				</Head> */}
      {/* <Header header={header} /> */}
      <Header header={header} menu={menu} />
      <main className="min-h-50vh container mx-auto py-4">{children}</main>
      <Footer footer={footer} />
    </div>
  );
};

export default Layout;

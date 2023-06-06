// pages/server-sitemap.xml/index.tsx

import { getServerSideSitemapLegacy } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import { getAllProductsURI } from '@/src/utils/helpers/getStaticPathHelpers';
import { ICategory } from '@/src/interfaces/apollo/getCatigories.interface';
import { getAllCategories } from '@/src/utils/apollo/queries';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')

  // const allPages = await getAllPagesSlug();
  // const allProducts: IProduct[] = await getProductsData();
  const paths: string[] = await getAllProductsURI();
  const menu: ICategory[] = await getAllCategories();
  // const allPosts = await getAllPostsWithSlug();

  const fields: any[] = [];

  paths.map((product) => {
    fields.push({
      loc: process.env.NEXT_PUBLIC_SITE_URL + `/product/${product}` + '/',
      lastmod: new Date().toISOString(),
      changefreq: 'daily', //'weekly','yearly',
      priority: 0.7,
    });
  });

  menu.map(({ node }) => {
    fields.push({
      loc: process.env.NEXT_PUBLIC_SITE_URL + `/${node.slug}` + '/',
      lastmod: new Date().toISOString(),
      changefreq: 'daily', //'weekly','yearly',
      priority: 0.7,
    });
  });

  // allPages.edges.map(({ node }) => {
  //   const slug = filterSlugPages('/' + node.slug);
  //   if (slug) {
  //     fields.push({
  //       loc: process.env.NEXT_PUBLIC_SITE_URL + `/${node.slug}` + '/',
  //       lastmod: new Date(Date.parse(node.modified)).toISOString(),
  //       changefreq: 'daily', //'weekly','yearly',
  //       priority: 0.7,
  //     });
  //   }
  // });

  return getServerSideSitemapLegacy(ctx, fields);
};

// Default export to prevent next.js errors
export default function Sitemap() {}

import React from 'react';
import { client } from '../apollo/apolloClient';
import { GET_PRODUCTS_URI, GET_PRODUCT_DATA } from '../apollo/queriesConst';
import { ParsedUrlQuery } from 'querystring';


export async function getAllProductsURI() {

  // const paths:string[] = [];
  // const first = 100;
  // let cursor = null;
  // let allProducts: any[] = [];

  // while (true) {
  //   let products: any = [];
  //   await client
  //     .query({
  //       query: GET_PRODUCTS_URI,
  //       variables: { first, cursor },
  //     })
  //     .then(({ data }) => {
  //       products = data?.products;
  //       console.log('getProductsURI', data);
  //     });
  //   console.log(products);
  //   allProducts = allProducts?.concat(products?.edges);
  //   if (!products?.pageInfo?.hasNextPage) {
  //     break;
  //   }
  //   const pagePaths = products?.edges?.map(
  //     ({ node }: { node: any }) => `/product/${node.slug}`
  //   );
  //   paths.push(...pagePaths);
  //   cursor = products?.pageInfo?.endCursor;
  //   console.log('paths', paths);
  // }

  // return paths;
  const paths:string[] = ['/product/karman-v-bagazhnik-na-lipuchke-universalnyj-40h30-sm-rexant'];

  return paths
}

export async function getProductDataByURI(slug:string | string[] ) {
let product={}
    await client
      .query({
        query: GET_PRODUCT_DATA,
        variables: { id:slug },
      })
      .then(({ data }) => {
        product=data
     
        console.log('getProductDataByURI', data);
      });
   
  return product;
}

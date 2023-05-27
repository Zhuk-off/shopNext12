// похожий интерфейс IGetProductsSimple

export interface IProductPage {
  product: Product;
}

export interface Product {
  __typename: string;
  id: string;
  databaseId: number;
  name: string;
  image: ImageProduct;
  galleryImages: GalleryImages;
  description: null | string;
  shortDescription: null | string;
  price: string;
  regularPrice?: null | string;
  salePrice: null | string;
  stockStatus: 'IN_STOCK' | 'OUT_OF_STOCK';
}

export interface ImageProduct {
  __typename: string;
  altText: string;
  sourceUrl: string;
}

export interface GalleryImages {
  __typename: string;
  edges: GalleryImage[];
}

export interface GalleryImage {
  __typename: string;
  node: ImageProduct;
}

export interface ImageProduct {
  __typename: string;
  altText: string;
  sourceUrl: string;
}

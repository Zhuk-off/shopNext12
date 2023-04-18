export interface IGetCategories {
  productCategories: ProductCategories;
}

export interface ProductCategories {
  edges: ICategory[];
}

export interface ICategory {
  node: Node;
}

interface Node {
  id: string;
  name: string;
  parentId?: null | string;
  slug: string;
  uri?: string;
  databaseId: number;
  image: { sourceUrl: string };
  seo?: ISeo;
}

interface ISeo {
  breadcrumbs: IBreadcrumbs[];
}

export interface IBreadcrumbs {
  text: string;
  url: string;
}

export interface IProductCategoryData {
  productCategory: ProductCategory;
}

export interface ProductCategory {
  __typename?: string;
  id: string;
  databaseId: number;
  description: null;
  slug: string;
  image: Image;
  name: string;
  seo?: SEO;
}

export interface Image {
  __typename?: string;
  sourceUrl: string;
}

export interface SEO {
  __typename?: string;
  breadcrumbs: Breadcrumb[];
}

export interface Breadcrumb {
  __typename?: string;
  text: string;
  url: string;
}

// для суб категорий на странице категории
export interface ChildSlugNameByCategory {
  slug: string;
  name: string;
}

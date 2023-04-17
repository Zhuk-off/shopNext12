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
  id:         string;
  name:       string;
  parentId:   null | string;
  slug:       string;
  uri:        string;
  databaseId: number;
}
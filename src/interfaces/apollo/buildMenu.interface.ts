export interface MenuItem {
  id: string;
  name: string;
  slug: string;
  uri: string;
  databaseId: number;
  children?: MenuItem[];
}
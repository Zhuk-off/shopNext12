export interface MenuItem {
  id: string;
  name: string;
  slug: string;
  // uri?: string;
  // databaseId: number;
  // imageUrl: string | null;
  children?: MenuItem[];
}

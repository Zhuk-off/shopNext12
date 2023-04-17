import { MenuItem } from '../interfaces/apollo/buildMenu.interface';
import { ICategory } from '../interfaces/apollo/getCatigories.interface';

function buildMenu(categories: ICategory[]): MenuItem[] {
  const menu: MenuItem[] = [];

  const findChildren = (parentId: string | null) => {
    return categories.filter((category) => category.node.parentId === parentId);
  };

  const buildMenuItem = (category: ICategory) => {
    const children = findChildren(category.node.id);

    const menuItem: MenuItem = {
      id: category.node.id,
      name: category.node.name,
      slug: category.node.slug,
      uri: category.node.uri,
      databaseId: category.node.databaseId,
      children: children.map((child) => buildMenuItem(child)),
    };

    return menuItem;
  };

  const topLevelCategories = findChildren(null);

  topLevelCategories.forEach((category) => {
    const menuItem = buildMenuItem(category);
    menu.push(menuItem);
  });

  return menu;
}

export default buildMenu;

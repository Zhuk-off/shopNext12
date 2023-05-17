import { MenuItem } from '../interfaces/apollo/buildMenu.interface';
import { ChildSlugNameByCategory } from '../interfaces/apollo/getCatigories.interface';

export const getAllChildSlugs = (obj: MenuItem) => {
  let childIds: string[] = [];
  if (obj.children && obj.children.length > 0) {
    obj.children.forEach((child) => {
      childIds.push(child.slug);
      childIds = [...childIds, ...getAllChildSlugs(child)];
    });
  }
  return childIds;
};

export const getAllChildSlugsAndName = (
  obj: MenuItem
): ChildSlugNameByCategory[] => {
  let childObj: ChildSlugNameByCategory[] = [];
  if (obj.children && obj.children?.length > 0) {
    obj.children.forEach((child) => {
      childObj.push({ slug: child.slug, name: child.name });
      childObj = [...childObj, ...getAllChildSlugsAndName(child)];
    });
  }
  return childObj;
};

export const findObjectById = (
  obj: MenuItem,
  slugByParams: string | string[] | undefined
): MenuItem | null => {
  if (!slugByParams) return null;
  let slug = slugByParams;
  if (Array.isArray(slug)) {
    slug = slugByParams[0];
  }

  if (obj.slug === slug) {
    return obj;
  }
  if (obj.children && obj.children?.length > 0) {
    for (let i = 0; i < obj.children?.length; i++) {
      const found = findObjectById(obj.children[i], slug);
      if (found) {
        return found;
      }
    }
  }
  return null;
};



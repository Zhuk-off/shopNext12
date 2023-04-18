// Получить slug из URL
export const getSlugFromUrl = (url: string): string => {
  const parts = url.split('/').filter(Boolean);
  const slug = parts[parts.length - 1];
  return slug;
};

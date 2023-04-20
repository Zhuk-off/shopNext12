// Получить slug из URL
export const getSlugFromUrl = (url: string): string => {
  const parts = url.split('/').filter(Boolean);
  const slug = parts[parts.length - 1];
  return slug;
};

export const formatBelarusianCurrency = (currencyString: string) => {
  const amount = Number(currencyString.replace('Br', ''));
  const formattedAmount = amount.toLocaleString('ru-RU', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formattedAmount;
};

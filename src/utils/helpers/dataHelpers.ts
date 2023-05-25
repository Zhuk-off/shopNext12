import { format, parseISO } from 'date-fns';

const formatDate = (dateString:string) => {
  const date = parseISO(dateString);
  const formattedDate = format(date, 'dd.MM.yyyyг. HH:mm ');
  return formattedDate;
};

export const formattedDate = (date:string) => {
   const formattedDate = formatDate(date);
  return formattedDate
};

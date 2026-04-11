import { format, parseISO } from 'date-fns';

export const formatDate = (dateValue) => {
  if (!dateValue) return 'NA';
  const date = typeof dateValue === 'string' ? parseISO(dateValue) : dateValue;
  return format(date, 'dd-MMM-yyyy');
};

export const formatDateTime = (dateValue) => {
  if (!dateValue) return 'NA';
  const date = typeof dateValue === 'string' ? parseISO(dateValue) : dateValue;
  return format(date, 'dd-MMM-yyyy, h:mm a');
};

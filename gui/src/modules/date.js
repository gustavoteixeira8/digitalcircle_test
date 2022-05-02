import { format } from 'date-fns'

const formatDate = (date) => {
  return format(new Date(date), 'MM/dd/yyyy HH:mm');
};

export { formatDate };

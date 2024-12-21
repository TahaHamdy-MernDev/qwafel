import { format } from "date-fns";
export const formatDateTime = (date: string) => {
  return format(new Date(date), "dd/MM/yy hh:mm a");
};


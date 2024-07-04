import { parseISO, format } from "date-fns";

interface DateFormatterProps {
  dateString: string;
}

export const DateFormatter = ({ dateString }: DateFormatterProps) => {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
};

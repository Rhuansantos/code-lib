export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export interface DateRangeSelectReactDatesProps {
  onDateRangeChange?: (dateRange: DateRange) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  allowPastDates?: boolean;
  numberOfMonths?: 1 | 2;
}
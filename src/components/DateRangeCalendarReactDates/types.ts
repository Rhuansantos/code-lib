import { Moment } from 'moment';

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export interface DateRangeCalendarReactDatesProps {
  onDateRangeChange?: (dateRange: DateRange) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  allowPastDates?: boolean;
  numberOfMonths?: number;
}
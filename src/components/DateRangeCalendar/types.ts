export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export interface DateRangeSelectProps {
  onDateRangeChange?: (dateRange: DateRange) => void;
  format?: Intl.DateTimeFormatOptions;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  allowPastDates?: boolean;
}

export interface CalendarHeaderProps {
  onPrevMonth: () => void;
  onNextMonth: () => void;
  selecting: 'start' | 'end';
}

export interface DateButtonProps {
  date: Date;
  onDateClick: (date: Date) => void;
  onMouseEnter: (date: Date) => void;
  onMouseLeave: (date: Date | null) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  isStart: boolean;
  isEnd: boolean;
  isInRange: boolean;
  isHovered: boolean;
  isToday: boolean;
  isPastDate: boolean;
  isDisabled: boolean;
  tabIndex: number;
  'aria-label': string;
}

export interface CalendarMonthProps {
  currentMonth: Date;
  monthOffset?: number;
  onDateClick: (date: Date) => void;
  onMouseEnter: (date: Date) => void;
  onMouseLeave: (date: Date | null) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  isDateInRange: (date: Date) => boolean;
  isDateHovered: (date: Date) => boolean;
  isSameDay: (date1: Date, date2: Date | null) => boolean;
  startDate: Date | null;
  endDate: Date | null;
  focusedDate: Date | null;
  allowPastDates: boolean;
}

export interface DateRangeTriggerProps {
  displayText: string;
  hasSelectedDates: boolean;
  onClear: (e?: React.MouseEvent) => void;
  isOpen: boolean;
  isMobile: boolean;
}

export interface UseDateRangeReturn {
  startDate: Date | null;
  endDate: Date | null;
  hoverDate: Date | null;
  selecting: 'start' | 'end';
  currentMonth: Date;
  setHoverDate: (date: Date | null) => void;
  selectDate: (date: Date) => void;
  clearDates: (e?: React.MouseEvent) => void;
  navigateMonth: (direction: number) => void;
  isDateInRange: (date: Date) => boolean;
  isDateHovered: (date: Date) => boolean;
  isSameDay: (date1: Date, date2: Date | null) => boolean;
}

export interface UseKeyboardNavigationReturn {
  focusedDate: Date | null;
  setFocusedDate: (date: Date | null) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  initializeFocus: (date?: Date) => void;
}

export interface CalendarConfig {
  MONTH_NAMES: string[];
  DAY_NAMES: string[];
  MOBILE_BREAKPOINT: number;
  DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions;
}

export interface KeyboardKeys {
  ARROW_LEFT: string;
  ARROW_RIGHT: string;
  ARROW_UP: string;
  ARROW_DOWN: string;
  ENTER: string;
  ESCAPE: string;
  SPACE: string;
}
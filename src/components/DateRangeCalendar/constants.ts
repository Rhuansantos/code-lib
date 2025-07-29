import { CalendarConfig, KeyboardKeys } from './types';

export const CALENDAR_CONFIG: CalendarConfig = {
  MONTH_NAMES: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ],
  DAY_NAMES: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  MOBILE_BREAKPOINT: 640,
  DATE_FORMAT_OPTIONS: {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }
};

export const KEYBOARD_KEYS: KeyboardKeys = {
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ENTER: 'Enter',
  ESCAPE: 'Escape',
  SPACE: ' '
};
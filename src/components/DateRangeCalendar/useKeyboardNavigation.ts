import { useState, useCallback } from 'react';
import { UseKeyboardNavigationReturn } from './types';
import { KEYBOARD_KEYS } from './constants';

export const useKeyboardNavigation = (
  currentMonth: Date, 
  selectDate: (date: Date) => void
): UseKeyboardNavigationReturn => {
  const [focusedDate, setFocusedDate] = useState<Date | null>(null);

  const handleKeyDown = useCallback((e: React.KeyboardEvent): void => {
    if (!focusedDate) return;

    const currentFocused = new Date(focusedDate);
    let newFocused = new Date(focusedDate);

    switch (e.key) {
      case KEYBOARD_KEYS.ARROW_LEFT:
        e.preventDefault();
        newFocused.setDate(currentFocused.getDate() - 1);
        break;
        
      case KEYBOARD_KEYS.ARROW_RIGHT:
        e.preventDefault();
        newFocused.setDate(currentFocused.getDate() + 1);
        break;
        
      case KEYBOARD_KEYS.ARROW_UP:
        e.preventDefault();
        newFocused.setDate(currentFocused.getDate() - 7);
        break;
        
      case KEYBOARD_KEYS.ARROW_DOWN:
        e.preventDefault();
        newFocused.setDate(currentFocused.getDate() + 7);
        break;
        
      case KEYBOARD_KEYS.ENTER:
      case KEYBOARD_KEYS.SPACE:
        e.preventDefault();
        selectDate(focusedDate);
        return;
        
      case KEYBOARD_KEYS.ESCAPE:
        e.preventDefault();
        setFocusedDate(null);
        return;
        
      default:
        return;
    }

    setFocusedDate(newFocused);
  }, [focusedDate, selectDate]);

  const initializeFocus = useCallback((date?: Date): void => {
    if (!focusedDate) {
      const initialFocus = date || new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
      setFocusedDate(initialFocus);
    }
  }, [focusedDate, currentMonth]);

  return {
    focusedDate,
    setFocusedDate,
    handleKeyDown,
    initializeFocus
  };
};
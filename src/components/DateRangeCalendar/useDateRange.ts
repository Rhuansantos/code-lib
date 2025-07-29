import { useState, useCallback } from 'react';
import { UseDateRangeReturn } from './types';

export const useDateRange = (
  initialStartDate: Date | null = null, 
  initialEndDate: Date | null = null
): UseDateRangeReturn => {
  const [startDate, setStartDate] = useState<Date | null>(initialStartDate);
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [selecting, setSelecting] = useState<'start' | 'end'>('start');
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const selectDate = useCallback((date: Date): void => {
    if (!date) return;

    if (selecting === 'start' || !startDate || endDate) {
      setStartDate(date);
      setEndDate(null);
      setSelecting('end');
    } else {
      if (date >= startDate) {
        setEndDate(date);
        setSelecting('start');
      } else {
        setStartDate(date);
        setEndDate(null);
      }
    }
  }, [selecting, startDate, endDate]);

  const clearDates = useCallback((e?: React.MouseEvent): void => {
    e?.stopPropagation();
    setStartDate(null);
    setEndDate(null);
    setSelecting('start');
    setHoverDate(null);
  }, []);

  const navigateMonth = useCallback((direction: number): void => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  }, [currentMonth]);

  const isDateInRange = useCallback((date: Date): boolean => {
    if (!date || !startDate || !endDate) return false;
    return date >= startDate && date <= endDate;
  }, [startDate, endDate]);

  const isDateHovered = useCallback((date: Date): boolean => {
    if (!date || !startDate || !hoverDate || endDate) return false;
    const start = startDate;
    const end = hoverDate;
    const minTime = Math.min(start.getTime(), end.getTime());
    const maxTime = Math.max(start.getTime(), end.getTime());
    return date.getTime() >= minTime && date.getTime() <= maxTime;
  }, [startDate, hoverDate, endDate]);

  const isSameDay = useCallback((date1: Date, date2: Date | null): boolean => {
    if (!date1 || !date2) return false;
    return date1.toDateString() === date2.toDateString();
  }, []);

  return {
    startDate,
    endDate,
    hoverDate,
    selecting,
    currentMonth,
    setHoverDate,
    selectDate,
    clearDates,
    navigateMonth,
    isDateInRange,
    isDateHovered,
    isSameDay
  };
};
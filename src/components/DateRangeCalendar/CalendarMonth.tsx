import React, { useMemo } from 'react';
import { DateButton } from './DateButton';
import { CALENDAR_CONFIG } from './constants';
import { CalendarMonthProps } from './types';

export const CalendarMonth: React.FC<CalendarMonthProps> = ({ 
  currentMonth, 
  monthOffset = 0, 
  onDateClick, 
  onMouseEnter, 
  onMouseLeave,
  onKeyDown,
  isDateInRange,
  isDateHovered,
  isSameDay,
  startDate,
  endDate,
  focusedDate,
  allowPastDates
}) => {
  const displayMonth = useMemo((): Date => {
    const month = new Date(currentMonth);
    month.setMonth(currentMonth.getMonth() + monthOffset);
    return month;
  }, [currentMonth, monthOffset]);

  const generateCalendarDays = useMemo((): (Date | null)[] => {
    const year = displayMonth.getFullYear();
    const month = displayMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  }, [displayMonth]);

  const formatDate = (date: Date, format: 'short' | 'full' = 'short'): string => {
    if (!date) return '';
    const options: Intl.DateTimeFormatOptions = format === 'full' 
      ? { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      : CALENDAR_CONFIG.DATE_FORMAT_OPTIONS;
    
    return date.toLocaleDateString('en-US', options);
  };

  const isPastDate = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateToCheck = new Date(date);
    dateToCheck.setHours(0, 0, 0, 0);
    return dateToCheck < today;
  };

  return (
    <div className="p-4">
      <div className="text-center font-semibold mb-4">
        {CALENDAR_CONFIG.MONTH_NAMES[displayMonth.getMonth()]} {displayMonth.getFullYear()}
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2" role="row">
        {CALENDAR_CONFIG.DAY_NAMES.map((day: string) => (
          <div key={day} className="text-center text-xs text-gray-600 font-medium p-2" role="columnheader">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1" role="grid" aria-label="Calendar">
        {generateCalendarDays.map((date: Date | null, index: number) => {
          if (!date) {
            return <div key={`empty-${index}`} className="p-2" role="gridcell"></div>;
          }
          
          const isStart = isSameDay(date, startDate);
          const isEnd = isSameDay(date, endDate);
          const isInRange = isDateInRange(date);
          const isHovered = isDateHovered(date);
          const isToday = isSameDay(date, new Date());
          const isFocused = focusedDate && isSameDay(date, focusedDate);
          const isPast = isPastDate(date);
          const isDisabled = !allowPastDates && isPast;
          
          return (
            <DateButton
              key={date.toISOString()}
              date={date}
              onDateClick={onDateClick}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onKeyDown={onKeyDown}
              isStart={isStart}
              isEnd={isEnd}
              isInRange={isInRange}
              isHovered={isHovered}
              isToday={isToday}
              isPastDate={isPast}
              isDisabled={isDisabled}
              tabIndex={isFocused && !isDisabled ? 0 : -1}
              aria-label={formatDate(date, 'full')}
            />
          );
        })}
      </div>
    </div>
  );
};
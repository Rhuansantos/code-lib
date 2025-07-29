import React, { useMemo } from 'react';
import { DateButtonProps } from './types';

export const DateButton: React.FC<DateButtonProps> = ({ 
  date, 
  onDateClick, 
  onMouseEnter, 
  onMouseLeave,
  onKeyDown,
  isStart, 
  isEnd, 
  isInRange, 
  isHovered, 
  isToday,
  isPastDate,
  isDisabled,
  tabIndex,
  'aria-label': ariaLabel
}) => {
  const buttonClasses = useMemo((): string => {
    const baseClasses = 'p-2 text-sm rounded-lg transition-all duration-150 relative focus:outline-none focus:ring-2 focus:ring-blue-500';
    
    if (isDisabled) {
      return `${baseClasses} text-gray-300 cursor-not-allowed bg-gray-50`;
    }
    
    if (isStart || isEnd) {
      return `${baseClasses} bg-blue-500 text-white font-semibold hover:bg-blue-600`;
    }
    
    if (isInRange && !isStart && !isEnd) {
      return `${baseClasses} bg-blue-100 text-blue-900 hover:bg-blue-200`;
    }
    
    if (isHovered && !isInRange) {
      return `${baseClasses} bg-blue-50 hover:bg-blue-100`;
    }
    
    if (isPastDate && !isStart && !isEnd) {
      return `${baseClasses} text-gray-400 hover:bg-gray-50`;
    }
    
    if (isToday && !isStart && !isEnd) {
      return `${baseClasses} font-semibold text-blue-600 hover:bg-gray-100`;
    }
    
    return `${baseClasses} hover:bg-gray-100`;
  }, [isStart, isEnd, isInRange, isHovered, isToday, isPastDate, isDisabled]);

  return (
    <button
      onClick={() => !isDisabled && onDateClick(date)}
      onMouseEnter={() => !isDisabled && onMouseEnter(date)}
      onMouseLeave={() => !isDisabled && onMouseLeave(null)}
      onKeyDown={!isDisabled ? onKeyDown : undefined}
      className={buttonClasses}
      tabIndex={isDisabled ? -1 : tabIndex}
      aria-label={ariaLabel}
      aria-disabled={isDisabled}
      role="gridcell"
      aria-selected={isStart || isEnd}
      disabled={isDisabled}
    >
      {date.getDate()}
      {isToday && (
        <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-current rounded-full"></div>
      )}
    </button>
  );
};
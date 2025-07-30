import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import * as Dialog from '@radix-ui/react-dialog';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { useDateRange } from './useDateRange';
import { useResponsive } from './useResponsive';
import { useKeyboardNavigation } from './useKeyboardNavigation';
import { CalendarHeader } from './CalendarHeader';
import { CalendarMonth } from './CalendarMonth';
import { DateRangeTrigger } from './DateRangeTrigger';
import { CALENDAR_CONFIG } from './constants';
import { DateRangeSelectProps, DateRange } from './types';

export const DateRangeCalendar: React.FC<DateRangeSelectProps> = ({
  onDateRangeChange,
  format = CALENDAR_CONFIG.DATE_FORMAT_OPTIONS,
  placeholder = 'Select date range',
  className = '',
  disabled = false,
  allowPastDates = false
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isMobile = useResponsive(CALENDAR_CONFIG.MOBILE_BREAKPOINT);

  const {
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
  } = useDateRange();

  const {
    focusedDate,
    handleKeyDown,
    initializeFocus
  } = useKeyboardNavigation(currentMonth, selectDate);

  const handleOpenChange = (open: boolean): void => {
    if (isMobile) {
      if (open) {
        setIsDialogOpen(true);
        setIsAnimating(true);
        initializeFocus();
      } else {
        setIsAnimating(false);
        // Delay closing to allow animation to complete
        setTimeout(() => setIsDialogOpen(false), 300);
      }
    } else {
      if (open) {
        setIsOpen(true);
        setIsAnimating(true);
        initializeFocus();
      } else {
        setIsAnimating(false);
        // Delay closing to allow animation to complete
        setTimeout(() => setIsOpen(false), 200);
      }
    }
  };

  const formatDate = useMemo(() => {
    return (date: Date | null): string => {
      if (!date) return '';
      return date.toLocaleDateString('en-US', format);
    };
  }, [format]);

  const displayText = useMemo((): string => {
    if (!startDate && !endDate) return placeholder;
    if (startDate && !endDate) return `${formatDate(startDate)} - Select end date`;
    if (startDate && endDate) return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    return placeholder;
  }, [startDate, endDate, formatDate, placeholder]);

  const hasSelectedDates = Boolean(startDate || endDate);

  // Notify parent component of changes
  useEffect(() => {
    if (onDateRangeChange) {
      const dateRange: DateRange = { startDate, endDate };
      onDateRangeChange(dateRange);
    }
  }, [startDate, endDate, onDateRangeChange]);

  const handleDateClick = (date: Date): void => {
    selectDate(date);
  };

  const renderCalendarContent = (): JSX.Element => (
    <>
      <CalendarHeader
        onPrevMonth={() => navigateMonth(-1)}
        onNextMonth={() => navigateMonth(1)}
        selecting={selecting}
      />
      
      <div className="flex">
        <div className="border-r">
          <CalendarMonth
            currentMonth={currentMonth}
            monthOffset={0}
            onDateClick={handleDateClick}
            onMouseEnter={setHoverDate}
            onMouseLeave={setHoverDate}
            onKeyDown={handleKeyDown}
            isDateInRange={isDateInRange}
            isDateHovered={isDateHovered}
            isSameDay={isSameDay}
            startDate={startDate}
            endDate={endDate}
            focusedDate={focusedDate}
            allowPastDates={allowPastDates}
          />
        </div>
        <div>
          <CalendarMonth
            currentMonth={currentMonth}
            monthOffset={1}
            onDateClick={handleDateClick}
            onMouseEnter={setHoverDate}
            onMouseLeave={setHoverDate}
            onKeyDown={handleKeyDown}
            isDateInRange={isDateInRange}
            isDateHovered={isDateHovered}
            isSameDay={isSameDay}
            startDate={startDate}
            endDate={endDate}
            focusedDate={focusedDate}
            allowPastDates={allowPastDates}
          />
        </div>
      </div>
      
      <Separator className="bg-gray-200" />
      
      <div className="flex items-center justify-between p-4 bg-gray-50">
        <div className="text-sm text-gray-600">
          {startDate && (
            <span>
              {formatDate(startDate)}
              {endDate && ` - ${formatDate(endDate)}`}
            </span>
          )}
        </div>
        <Button
          onClick={() => handleOpenChange(false)}
          disabled={!startDate}
          className="font-medium"
        >
          Apply
        </Button>
      </div>
    </>
  );

  const renderMobileCalendarContent = (): JSX.Element => (
    <>
      <CalendarHeader
        onPrevMonth={() => navigateMonth(-1)}
        onNextMonth={() => navigateMonth(1)}
        selecting={selecting}
      />
      
      <CalendarMonth
        currentMonth={currentMonth}
        monthOffset={0}
        onDateClick={handleDateClick}
        onMouseEnter={setHoverDate}
        onMouseLeave={setHoverDate}
        onKeyDown={handleKeyDown}
        isDateInRange={isDateInRange}
        isDateHovered={isDateHovered}
        isSameDay={isSameDay}
        startDate={startDate}
        endDate={endDate}
        focusedDate={focusedDate}
        allowPastDates={allowPastDates}
      />
      
      <Separator className="bg-gray-200" />
      
      <div className="flex items-center justify-between p-4 bg-gray-50">
        <div className="text-sm text-gray-600">
          {startDate && (
            <span>
              {formatDate(startDate)}
              {endDate && ` - ${formatDate(endDate)}`}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              clearDates();
            }}
            disabled={!startDate && !endDate}
            variant="secondary"
          >
            Clear
          </Button>
          <Dialog.Close asChild>
            <Button
              disabled={!startDate}
              className="font-medium"
            >
              Apply
            </Button>
          </Dialog.Close>
        </div>
      </div>
    </>
  );

  return (
    <div className={`w-full max-w-2xl mx-auto p-8 ${className}`}>
      <h2 className="text-2xl font-bold mb-6">Custom Date Range Select (React-Dates Style)</h2>
      
      <div className="relative" ref={wrapperRef}>
        <Popover open={!isMobile && (isOpen)} onOpenChange={handleOpenChange}>
          <PopoverTrigger asChild>
            <button
              onClick={isMobile ? () => setIsDialogOpen(true) : undefined}
              disabled={disabled}
              className="w-full max-w-md px-4 py-3 text-left bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out data-[state=open]:border-blue-500 data-[state=open]:ring-2 data-[state=open]:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed min-h-[3rem]"
              aria-label="Open date range picker"
              aria-expanded={isOpen || isDialogOpen}
              aria-haspopup="dialog"
            >
              <DateRangeTrigger
                displayText={displayText}
                hasSelectedDates={hasSelectedDates}
                onClear={clearDates}
                isOpen={isOpen}
                isMobile={isMobile}
              />
            </button>
          </PopoverTrigger>

          <PopoverContent
            className={cn(
              "z-50 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden min-w-[600px] p-0 transition-all duration-200 ease-out",
              isOpen && isAnimating 
                ? 'opacity-100 scale-100 translate-y-0' 
                : 'opacity-0 scale-95 translate-y-1'
            )}
            sideOffset={8}
            align="start"
            onKeyDown={handleKeyDown}
          >
            {renderCalendarContent()}
          </PopoverContent>
        </Popover>

        <Dialog.Root open={isDialogOpen} onOpenChange={handleOpenChange}>
          <Dialog.Portal>
            <Dialog.Overlay 
              className={cn(
                "fixed inset-0 bg-black transition-opacity duration-200 z-40",
                isDialogOpen ? 'bg-opacity-50' : 'bg-opacity-0'
              )} 
            />
            
            <Dialog.Content 
              className={cn(
                "fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl shadow-2xl border border-gray-200 max-h-[90vh] overflow-hidden transition-transform duration-300 ease-out",
                isDialogOpen ? 'translate-y-0' : 'translate-y-full'
              )}
              onKeyDown={handleKeyDown}
            >
              <div className="flex items-center justify-between p-4 border-b bg-white">
                <Dialog.Title className="text-lg font-semibold">Select Date Range</Dialog.Title>
                <Dialog.Close asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    aria-label="Close"
                  >
                    <span className="text-lg">✕</span>
                  </Button>
                </Dialog.Close>
              </div>
              
              <div className="overflow-y-auto max-h-[calc(90vh-4rem)] bg-white">
                {renderMobileCalendarContent()}
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  );
};
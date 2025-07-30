import React, { useState, useEffect, useRef } from 'react';
import { DayPickerRangeController } from 'react-dates';
import moment, { Moment } from 'moment';
import { CalendarIcon, X } from 'lucide-react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useResponsive } from '../DateRangeCalendar/useResponsive';
import { DateRangeSelectReactDatesProps, DateRange } from './types';

export const DateRangeSelectReactDates: React.FC<DateRangeSelectReactDatesProps> = ({
  onDateRangeChange,
  placeholder = 'Select date range',
  className = '',
  disabled = false,
  allowPastDates = false,
  numberOfMonths = 2
}) => {
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const [focusedInput, setFocusedInput] = useState<'startDate' | 'endDate' | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useResponsive(768);

  // Notify parent component of changes
  useEffect(() => {
    if (onDateRangeChange) {
      const dateRange: DateRange = {
        startDate: startDate ? startDate.toDate() : null,
        endDate: endDate ? endDate.toDate() : null
      };
      onDateRangeChange(dateRange);
    }
  }, [startDate, endDate, onDateRangeChange]);

  const handleDatesChange = ({ startDate, endDate }: { startDate: Moment | null; endDate: Moment | null }) => {
    setStartDate(startDate);
    setEndDate(endDate);
    
    // Close the select when both dates are selected
    if (startDate && endDate) {
      setIsOpen(false);
      setFocusedInput(null);
    }
  };

  const handleFocusChange = (focusedInput: 'startDate' | 'endDate' | null) => {
    setFocusedInput(focusedInput);
  };

  const handleSelectOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      // When opening, focus on start date if no dates selected, or end date if only start is selected
      setFocusedInput(startDate && !endDate ? 'endDate' : 'startDate');
    } else {
      setFocusedInput(null);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStartDate(null);
    setEndDate(null);
    setFocusedInput(null);
    setIsOpen(false);
  };

  const isOutsideRange = (day: Moment): boolean => {
    if (allowPastDates) {
      return false; // Allow all dates
    }
    // Block past dates (before today)
    return day.isBefore(moment(), 'day');
  };

  const displayText = React.useMemo(() => {
    if (startDate) {
      if (endDate) {
        return `${startDate.format('MMM DD, YYYY')} - ${endDate.format('MMM DD, YYYY')}`;
      } else {
        return `${startDate.format('MMM DD, YYYY')} - Select end date`;
      }
    }
    return placeholder;
  }, [startDate, endDate, placeholder]);

  const hasSelectedDates = Boolean(startDate || endDate);

  return (
    <div className={cn("w-full max-w-2xl mx-auto p-4 sm:p-8", className)}>
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">React-Dates with Shadcn Select Trigger</h2>
      
      <div className="relative w-full max-w-md">
        <Select open={isOpen} onOpenChange={handleSelectOpenChange}>
          <SelectTrigger 
            className={cn(
              "h-12 justify-between text-left font-normal",
              !hasSelectedDates && "text-muted-foreground"
            )}
            disabled={disabled}
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <CalendarIcon className="h-4 w-4 opacity-50 flex-shrink-0" />
              <span className="truncate">{displayText}</span>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              {hasSelectedDates && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-muted"
                  onClick={handleClear}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          </SelectTrigger>
          
          <SelectContent className="w-auto p-0 bg-popover border" align="start">
            <div className="p-4">
              <DayPickerRangeController
                startDate={startDate}
                endDate={endDate}
                onDatesChange={handleDatesChange}
                focusedInput={focusedInput}
                onFocusChange={handleFocusChange}
                numberOfMonths={isMobile ? 1 : numberOfMonths}
                isOutsideRange={isOutsideRange}
                hideKeyboardShortcutsPanel={true}
                minimumNights={0}
                keepOpenOnDateSelect={true}
                noBorder={true}
                initialVisibleMonth={() => moment()}
              />
              
              {/* Action buttons */}
              <div className="flex items-center justify-between pt-4 border-t mt-4">
                <div className="text-sm text-muted-foreground">
                  {startDate && (
                    <span>
                      {startDate.format('MMM DD, YYYY')}
                      {endDate && ` - ${endDate.format('MMM DD, YYYY')}`}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClear}
                    disabled={!hasSelectedDates}
                  >
                    Clear
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    disabled={!startDate}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </div>
          </SelectContent>
        </Select>
      </div>

      <style>{`
        /* Style the day picker controller */
        .DayPickerRangeController {
          background: transparent !important;
        }

        /* Mobile-specific styles */
        @media (max-width: 768px) {
          .DayPicker {
            font-size: 14px !important;
          }
          
          .CalendarDay__default {
            width: 35px !important;
            height: 35px !important;
            line-height: 35px !important;
          }
          
          .DayPickerNavigation {
            padding: 0 8px !important;
          }
          
          .CalendarMonth_caption {
            font-size: 16px !important;
          }
        }
        
        .CalendarDay__default {
          transition: all 0.15s;
          border: 1px solid transparent;
        }
        
        .CalendarDay__default:hover {
          background: hsl(var(--accent)) !important;
          border: 1px solid hsl(var(--border)) !important;
          color: hsl(var(--accent-foreground)) !important;
        }
        
        .CalendarDay__selected {
          background: hsl(var(--primary)) !important;
          border: 1px solid hsl(var(--primary)) !important;
          color: hsl(var(--primary-foreground)) !important;
        }
        
        .CalendarDay__selected:hover {
          background: hsl(var(--primary)) !important;
          border: 1px solid hsl(var(--primary)) !important;
          color: hsl(var(--primary-foreground)) !important;
        }
        
        .CalendarDay__selected_span {
          background: hsl(var(--accent)) !important;
          border: 1px solid hsl(var(--border)) !important;
          color: hsl(var(--accent-foreground)) !important;
        }
        
        .CalendarDay__blocked_out_of_range {
          background: hsl(var(--muted)) !important;
          color: hsl(var(--muted-foreground)) !important;
          cursor: not-allowed !important;
        }
        
        .DayPickerNavigation_button {
          border: none !important;
          background: transparent !important;
          color: hsl(var(--muted-foreground)) !important;
          transition: all 0.15s !important;
          border-radius: 0.375rem !important;
        }
        
        .DayPickerNavigation_button:hover {
          background: hsl(var(--accent)) !important;
          color: hsl(var(--accent-foreground)) !important;
        }
        
        .DayPickerNavigation_button:focus {
          outline: 2px solid hsl(var(--ring)) !important;
          outline-offset: 2px !important;
        }
        
        .DayPicker_weekHeader {
          color: hsl(var(--muted-foreground)) !important;
        }
        
        .CalendarMonth_caption {
          color: hsl(var(--foreground)) !important;
          font-weight: 600 !important;
        }
      `}</style>
    </div>
  );
};
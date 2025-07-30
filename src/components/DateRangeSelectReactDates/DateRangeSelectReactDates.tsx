import React, { useState, useEffect, useRef } from "react";
import { DayPickerRangeController } from "react-dates";
import moment, { Moment } from "moment";
import { CalendarIcon, X, ChevronDown } from "lucide-react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useResponsive } from "../DateRangeCalendar/useResponsive";
import { DateRangeSelectReactDatesProps, DateRange } from "./types";

export const DateRangeSelectReactDates: React.FC<
  DateRangeSelectReactDatesProps
> = ({
  onDateRangeChange,
  placeholder = "Select date range",
  className = "",
  disabled = false,
  allowPastDates = false,
  numberOfMonths = 2,
}) => {
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const [focusedInput, setFocusedInput] = useState<
    "startDate" | "endDate" | null
  >(null);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useResponsive(768);

  // Notify parent component of changes
  useEffect(() => {
    if (onDateRangeChange) {
      const dateRange: DateRange = {
        startDate: startDate ? startDate.toDate() : null,
        endDate: endDate ? endDate.toDate() : null,
      };
      onDateRangeChange(dateRange);
    }
  }, [startDate, endDate, onDateRangeChange]);

  const handleDatesChange = ({
    startDate,
    endDate,
  }: {
    startDate: Moment | null;
    endDate: Moment | null;
  }) => {
    setStartDate(startDate);
    setEndDate(endDate);

    // Don't auto-close on mobile, let user click Apply
    if (!isMobile && startDate && endDate) {
      setIsOpen(false);
      setFocusedInput(null);
    }
  };

  const handleFocusChange = (focusedInput: "startDate" | "endDate" | null) => {
    setFocusedInput(focusedInput);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      // When opening, focus on start date if no dates selected, or end date if only start is selected
      setFocusedInput(startDate && !endDate ? "endDate" : "startDate");
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
    return day.isBefore(moment(), "day");
  };

  const displayText = React.useMemo(() => {
    if (startDate) {
      if (endDate) {
        return `${startDate.format("MMM DD, YYYY")} - ${endDate.format(
          "MMM DD, YYYY"
        )}`;
      } else {
        return `${startDate.format("MMM DD, YYYY")} - Select end date`;
      }
    }
    return placeholder;
  }, [startDate, endDate, placeholder]);

  const hasSelectedDates = Boolean(startDate || endDate);

  const CalendarSection = () => (
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
              {startDate.format("MMM DD, YYYY")}
              {endDate && ` - ${endDate.format("MMM DD, YYYY")}`}
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
  );

  if (isMobile) {
    return (
      <div className={cn("w-full max-w-2xl mx-auto p-4 sm:p-8", className)}>
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
          React-Dates with Shadcn Select Trigger
        </h2>

        <div className="relative w-full">
          <Button
            variant="outline"
            disabled={disabled}
            onClick={() => {
              setIsOpen(true);
              setFocusedInput("startDate");
            }}
            className={cn(
              "w-full justify-between text-left font-normal h-12 px-4",
              !hasSelectedDates && "text-muted-foreground"
            )}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    setStartDate(null);
                    setEndDate(null);
                    setFocusedInput(null);
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </div>
          </Button>

          {isOpen && (
            <div className="fixed inset-0 z-50 flex items-end justify-center animate-in fade-in duration-200">
              <div
                className="fixed inset-0 bg-black bg-opacity-50"
                onClick={() => setIsOpen(false)}
              />
              <div className="relative z-50 w-full bg-white rounded-t-2xl shadow-xl animate-in slide-in-from-bottom duration-300 max-h-[90vh] flex flex-col">
                <div className="p-4 border-b flex-shrink-0">
                  <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
                  <h3 className="text-lg font-semibold">Select Date Range</h3>
                </div>

                <div className="px-4 py-4 flex justify-center overflow-y-auto flex-1">
                  <DayPickerRangeController
                    startDate={startDate}
                    endDate={endDate}
                    onDatesChange={handleDatesChange}
                    focusedInput={focusedInput}
                    onFocusChange={handleFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={isOutsideRange}
                    hideKeyboardShortcutsPanel={true}
                    minimumNights={0}
                    keepOpenOnDateSelect={true}
                    noBorder={true}
                    initialVisibleMonth={() => moment()}
                    daySize={60}
                  />
                </div>

                <div className="p-4 border-t flex items-center justify-between flex-shrink-0">
                  <div className="text-sm text-gray-600">
                    {startDate && (
                      <span>
                        {startDate.format("MMM DD, YYYY")}
                        {endDate && ` - ${endDate.format("MMM DD, YYYY")}`}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setStartDate(null);
                        setEndDate(null);
                        setFocusedInput(null);
                      }}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                      disabled={!hasSelectedDates}
                    >
                      Clear
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                      disabled={!startDate}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full max-w-2xl mx-auto p-4 sm:p-8", className)}>
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
        React-Dates with Shadcn Select Trigger
      </h2>

      <div className="relative w-full max-w-md">
        <Select open={isOpen} onOpenChange={handleOpenChange}>
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
            <CalendarSection />
          </SelectContent>
        </Select>
      </div>

      <style>{`
        /* Style the day picker controller */
        .DayPickerRangeController {
          background: transparent !important;
        }

        /* Animation classes */
        .animate-in {
          animation-duration: 300ms;
          animation-fill-mode: both;
        }

        .fade-in {
          animation-name: fadeIn;
        }

        .slide-in-from-bottom {
          animation-name: slideInFromBottom;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInFromBottom {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        /* Mobile-specific styles */
        @media (max-width: 768px) {
          .DayPicker {
            font-size: 14px !important;
          }
          
          .CalendarDay__default {
            cursor: pointer !important;
            -webkit-tap-highlight-color: transparent;
          }
          
          .CalendarDay__default:active {
            background: hsl(var(--accent)) !important;
          }
          
          .DayPickerNavigation {
            padding: 0 8px !important;
          }
          
          .DayPickerNavigation_button {
            width: 40px !important;
            height: 40px !important;
            -webkit-tap-highlight-color: transparent;
          }
          
          .CalendarMonth_caption {
            font-size: 16px !important;
          }

          /* Ensure the calendar is interactive */
          .DayPickerRangeController {
            touch-action: manipulation;
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

import React, { useState, useEffect, useRef } from 'react';
import { DateRangePicker } from 'react-dates';
import moment, { Moment } from 'moment';
import { ChevronDown } from 'lucide-react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangeCalendarReactDatesProps, DateRange } from './types';

export const DateRangeCalendarReactDates: React.FC<DateRangeCalendarReactDatesProps> = ({
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
  };

  const handleFocusChange = (focusedInput: 'startDate' | 'endDate' | null) => {
    setFocusedInput(focusedInput);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStartDate(null);
    setEndDate(null);
    setFocusedInput(null);
  };


  const isOutsideRange = (day: Moment): boolean => {
    if (allowPastDates) {
      return false; // Allow all dates
    }
    // Block past dates (before today)
    return day.isBefore(moment(), 'day');
  };

  const hasSelectedDates = Boolean(startDate || endDate);

  return (
    <div className={`w-full max-w-2xl mx-auto p-8 ${className}`}>
      <h2 className="text-2xl font-bold mb-6">React-Dates Implementation</h2>
      
      <div className="relative">
        <DateRangePicker
          startDate={startDate}
          startDateId="start_date_id"
          endDate={endDate}
          endDateId="end_date_id"
          onDatesChange={handleDatesChange}
          focusedInput={focusedInput}
          onFocusChange={handleFocusChange}
          numberOfMonths={numberOfMonths}
          showClearDates={false}
          showDefaultInputIcon={false}
          disabled={disabled}
          isOutsideRange={isOutsideRange}
          displayFormat="MMM DD, YYYY"
          startDatePlaceholderText="Start Date"
          endDatePlaceholderText="End Date"
          hideKeyboardShortcutsPanel={true}
          minimumNights={0}
          noBorder={true}
          withPortal={false}
          withFullScreenPortal={false}
          appendToBody={false}
          keepOpenOnDateSelect={false}
          reopenPickerOnClearDates={false}
          customInputIcon={
            <ChevronDown 
              className={`w-5 h-5 text-gray-400 transition-transform duration-300 ease-in-out ${
                focusedInput ? 'rotate-180' : ''
              }`} 
            />
          }
          inputIconPosition="after"
        />
        
        {/* Clear button overlay - positioned like custom trigger */}
        {hasSelectedDates && (
          <div className="absolute right-10 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center z-10">
            <button
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-150"
              aria-label="Clear dates"
              title="Clear selected dates"
            >
              <span className="text-sm leading-none">✕</span>
            </button>
          </div>
        )}
      </div>

      <style>{`
        /* Match the custom DateRangeTrigger styling */
        .DateRangePickerInput {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          width: 100% !important;
          max-width: 28rem !important;
          padding: 0.75rem 1rem !important;
          background: white !important;
          border: 1px solid #d1d5db !important;
          border-radius: 0.5rem !important;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important;
          transition: all 0.3s ease-in-out !important;
          min-height: 3rem !important;
          cursor: pointer !important;
        }
        
        .DateRangePickerInput:hover {
          border-color: #9ca3af !important;
        }
        
        .DateRangePickerInput__focus {
          outline: 2px solid transparent !important;
          outline-offset: 2px !important;
          box-shadow: 0 0 0 2px #3b82f6 !important;
          border-color: #3b82f6 !important;
        }
        
        /* Container for inputs and arrow */
        .DateRangePickerInput_input__display_text {
          display: flex !important;
          align-items: center !important;
          flex: 1 !important;
          min-width: 0 !important;
        }
        
        /* Style individual inputs to appear as single display */
        .DateRangePickerInput_input {
          border: none !important;
          padding: 0 !important;
          background: transparent !important;
          font-size: 1rem !important;
          color: #111827 !important;
          cursor: pointer !important;
          outline: none !important;
          width: auto !important;
          min-width: 0 !important;
        }
        
        .DateRangePickerInput_input::placeholder {
          color: #6b7280 !important;
        }
        
        .DateRangePickerInput_input:focus {
          outline: none !important;
        }
        
        /* Style the start date input */
        .DateRangePickerInput_input__start_date {
          flex: 1 !important;
        }
        
        /* Style the end date input */
        .DateRangePickerInput_input__end_date {
          flex: 1 !important;
        }
        
        /* Hide the arrow between inputs to match single trigger */
        .DateRangePickerInput_arrow {
          display: none !important;
        }
        
        /* Icon positioning */
        .DateRangePickerInput_display_text__input_icon {
          margin-left: auto !important;
          flex-shrink: 0 !important;
        }
        
        /* Style the picker */
        .DateRangePicker_picker {
          background: white !important;
          border: 1px solid #e5e7eb !important;
          border-radius: 0.5rem !important;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
          margin-top: 0.5rem !important;
        }
        
        .CalendarDay__default {
          transition: all 0.15s;
          border: 1px solid transparent;
        }
        
        .CalendarDay__default:hover {
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
        }
        
        .CalendarDay__selected {
          background: #3b82f6 !important;
          border: 1px solid #3b82f6 !important;
          color: white !important;
        }
        
        .CalendarDay__selected:hover {
          background: #2563eb !important;
          border: 1px solid #2563eb !important;
        }
        
        .CalendarDay__selected_span {
          background: #dbeafe !important;
          border: 1px solid #bfdbfe !important;
          color: #1e40af !important;
        }
        
        .CalendarDay__blocked_out_of_range {
          background: #f9fafb !important;
          color: #d1d5db !important;
          cursor: not-allowed !important;
        }
        
        .DayPickerNavigation_button {
          border: none !important;
          background: transparent !important;
          color: #6b7280 !important;
          transition: all 0.15s !important;
        }
        
        .DayPickerNavigation_button:hover {
          background: #f3f4f6 !important;
          color: #374151 !important;
        }
      `}</style>
    </div>
  );
};
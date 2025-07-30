import React, { useState, useRef, useEffect } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import { format } from "date-fns";
import { Calendar, ChevronDown, X } from "lucide-react";
import "react-day-picker/style.css";
import "./DateRangePicker.css";

interface DateRangePickerProps {
  onDateRangeChange?: (dateRange: {
    startDate: Date | null;
    endDate: Date | null;
  }) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function DateRangePicker({
  onDateRangeChange,
  className = "",
  placeholder = "Select date range",
  disabled = false,
}: DateRangePickerProps) {
  const [range, setRange] = useState<DateRange | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleRangeSelect = (newRange: DateRange | undefined) => {
    setRange(newRange);
    if (onDateRangeChange) {
      onDateRangeChange({
        startDate: newRange?.from || null,
        endDate: newRange?.to || null,
      });
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleRangeSelect(undefined);
  };

  const handleApply = () => {
    setIsOpen(false);
  };

  const displayText = range?.from
    ? range.to
      ? `${format(range.from, "MMM dd, yyyy")} - ${format(
          range.to,
          "MMM dd, yyyy"
        )}`
      : format(range.from, "MMM dd, yyyy")
    : placeholder;

  return (
    <div className={`w-full max-w-2xl mx-auto p-8 ${className}`}>
      <h2 className="text-2xl font-bold mb-6">
        Date Range Picker (react-day-picker)
      </h2>

      <div ref={containerRef} className="relative w-full max-w-md">
        {/* Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled}
          className={`
            w-full px-4 py-3 text-left bg-white border rounded-lg
            flex items-center justify-between
            transition-all duration-200
            ${
              disabled
                ? "opacity-50 cursor-not-allowed"
                : "hover:border-gray-400 cursor-pointer"
            }
            ${
              isOpen
                ? "border-blue-500 ring-2 ring-blue-200"
                : "border-gray-300"
            }
          `}
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span className={range ? "text-gray-900" : "text-gray-500"}>
              {displayText}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {range && (
              <button
                onClick={handleClear}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
            <ChevronDown
              className={`w-5 h-5 text-gray-400 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </button>

        {/* Calendar Popover/Modal */}
        {isOpen && (
          <>
            {/* Mobile Modal */}
            {isMobile && (
              <div className="fixed inset-0 z-50 flex items-end justify-center">
                <div
                  className="fixed inset-0 bg-black bg-opacity-50"
                  onClick={() => setIsOpen(false)}
                />
                <div className="relative z-50 w-full bg-white rounded-t-2xl shadow-xl animate-slide-up">
                  <div className="p-4 border-b">
                    <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
                    <h3 className="text-lg font-semibold">Select Date Range</h3>
                  </div>

                  <div className="px-4 py-4 flex justify-center">
                    <DayPicker
                      animate
                      mode="range"
                      selected={range}
                      onSelect={handleRangeSelect}
                      numberOfMonths={1}
                      disabled={{ before: new Date() }}
                      className="rdp-custom"
                    />
                  </div>

                  <div className="p-4 border-t flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      {range?.from && (
                        <span>
                          {format(range.from, "MMM dd, yyyy")}
                          {range.to && ` - ${format(range.to, "MMM dd, yyyy")}`}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleRangeSelect(undefined)}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                        disabled={!range}
                      >
                        Clear
                      </button>
                      <button
                        onClick={handleApply}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        disabled={!range?.from}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Desktop Popover */}
            {!isMobile && (
              <div
                ref={popoverRef}
                className="absolute z-50 mt-2 bg-white rounded-lg shadow-xl border animate-fade-in min-w-fit"
              >
                <div className="p-4">
                  <DayPicker
                    animate
                    mode="range"
                    selected={range}
                    onSelect={handleRangeSelect}
                    numberOfMonths={1}
                    disabled={{ before: new Date() }}
                    className="rdp-custom"
                    showOutsideDays
                  />
                </div>

                <div className="p-4 border-t flex items-center justify-between bg-gray-50">
                  <div className="text-sm text-gray-600">
                    {range?.from && (
                      <span>
                        {format(range.from, "MMM dd, yyyy")}
                        {range.to && ` - ${format(range.to, "MMM dd, yyyy")}`}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleRangeSelect(undefined)}
                      className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                      disabled={!range}
                    >
                      Clear
                    </button>
                    <button
                      onClick={handleApply}
                      className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                      disabled={!range?.from}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { CalendarIcon, ChevronDown, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { useResponsive } from '../DateRangeCalendar/useResponsive';

interface DateRangeSelectProps {
  onDateRangeChange?: (dateRange: { startDate: Date | null; endDate: Date | null }) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function DateRangeSelect({
  onDateRangeChange,
  className,
  placeholder = "Select date range",
  disabled = false,
}: DateRangeSelectProps) {
  const [date, setDate] = useState<DateRange | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useResponsive(768);

  const handleSelect = (newDate: DateRange | undefined) => {
    console.log('Date selected:', newDate); // Debug log
    setDate(newDate);
    if (onDateRangeChange) {
      onDateRangeChange({
        startDate: newDate?.from || null,
        endDate: newDate?.to || null,
      });
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleSelect(undefined);
  };

  const handleApply = () => {
    setIsOpen(false);
  };

  const displayText = React.useMemo(() => {
    if (date?.from) {
      if (date.to) {
        return `${format(date.from, "MMM dd, yyyy")} - ${format(date.to, "MMM dd, yyyy")}`;
      } else {
        return `${format(date.from, "MMM dd, yyyy")} - Select end date`;
      }
    }
    return placeholder;
  }, [date, placeholder]);

  const CalendarSection = () => (
    <>
      <Calendar
        mode="range"
        selected={date}
        onSelect={handleSelect}
        numberOfMonths={isMobile ? 1 : 2}
        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
        defaultMonth={new Date()}
        showOutsideDays={true}
      />
      
      <Separator />
      
      <div className="flex items-center justify-between p-4 bg-muted/50">
        <div className="text-sm text-muted-foreground">
          {date?.from && (
            <span>
              {format(date.from, "MMM dd, yyyy")}
              {date.to && ` - ${format(date.to, "MMM dd, yyyy")}`}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          {!isMobile && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSelect(undefined)}
              disabled={!date}
            >
              Clear
            </Button>
          )}
          <Button
            size="sm"
            onClick={handleApply}
            disabled={!date?.from}
          >
            Apply
          </Button>
        </div>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <div className={cn("w-full max-w-2xl mx-auto p-8", className)}>
        <h2 className="text-2xl font-bold mb-6">Date Range Select (Shadcn Components)</h2>
        
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              disabled={disabled}
              className={cn(
                "w-full max-w-md justify-between text-left font-normal h-12 px-4",
                !date && "text-muted-foreground"
              )}
            >
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 opacity-50" />
                <span className="truncate">{displayText}</span>
              </div>
              <div className="flex items-center gap-1">
                {date && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 hover:bg-muted"
                    onClick={handleClear}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
                <ChevronDown className="h-4 w-4 opacity-50" />
              </div>
            </Button>
          </DrawerTrigger>
          
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Select Date Range</DrawerTitle>
            </DrawerHeader>
            <CalendarSection />
          </DrawerContent>
        </Drawer>
      </div>
    );
  }

  return (
    <div className={cn("w-full max-w-2xl mx-auto p-8", className)}>
      <h2 className="text-2xl font-bold mb-6">Date Range Select (Shadcn Components)</h2>
      
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-full max-w-md justify-between text-left font-normal h-12 px-4",
              !date && "text-muted-foreground"
            )}
          >
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 opacity-50" />
              <span className="truncate">{displayText}</span>
            </div>
            <div className="flex items-center gap-1">
              {date && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-muted"
                  onClick={handleClear}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
              <ChevronDown className={cn(
                "h-4 w-4 opacity-50 transition-transform",
                isOpen && "rotate-180"
              )} />
            </div>
          </Button>
        </PopoverTrigger>
        
        <PopoverContent className="w-auto p-0" align="start" sideOffset={4}>
          <CalendarSection />
        </PopoverContent>
      </Popover>
    </div>
  );
}
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CalendarHeaderProps } from './types';

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({ 
  onPrevMonth, 
  onNextMonth, 
  selecting 
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b" aria-label="Calendar navigation">
      <Button 
        onClick={onPrevMonth}
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        aria-label="Previous month"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600" />
        <span className="sr-only">Previous month</span>
      </Button>
      
      <Separator orientation="vertical" className="h-6 mx-2" />
      
      <div className="text-sm text-gray-600 font-medium" role="status" aria-live="polite">
        {selecting === 'start' ? 'Select start date' : 'Select end date'}
      </div>
      
      <Separator orientation="vertical" className="h-6 mx-2" />
      
      <Button 
        onClick={onNextMonth}
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        aria-label="Next month"
      >
        <ChevronRight className="w-5 h-5 text-gray-600" />
        <span className="sr-only">Next month</span>
      </Button>
    </div>
  );
};
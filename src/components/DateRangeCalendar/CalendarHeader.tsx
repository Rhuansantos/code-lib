import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as Toolbar from '@radix-ui/react-toolbar';
import * as Tooltip from '@radix-ui/react-tooltip';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { CalendarHeaderProps } from './types';

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({ 
  onPrevMonth, 
  onNextMonth, 
  selecting 
}) => {
  return (
    <Toolbar.Root className="flex items-center justify-between p-4 border-b" aria-label="Calendar navigation">
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Toolbar.Button 
              onClick={onPrevMonth}
              className="p-1 rounded hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
              <VisuallyHidden.Root>Previous month</VisuallyHidden.Root>
            </Toolbar.Button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              className="px-2 py-1 text-sm bg-gray-900 text-white rounded shadow-lg"
              sideOffset={5}
            >
              Previous month
              <Tooltip.Arrow className="fill-gray-900" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
      
      <Toolbar.Separator className="w-px h-6 bg-gray-300 mx-2" />
      
      <div className="text-sm text-gray-600 font-medium" role="status" aria-live="polite">
        {selecting === 'start' ? 'Select start date' : 'Select end date'}
      </div>
      
      <Toolbar.Separator className="w-px h-6 bg-gray-300 mx-2" />
      
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Toolbar.Button 
              onClick={onNextMonth}
              className="p-1 rounded hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Next month"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
              <VisuallyHidden.Root>Next month</VisuallyHidden.Root>
            </Toolbar.Button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              className="px-2 py-1 text-sm bg-gray-900 text-white rounded shadow-lg"
              sideOffset={5}
            >
              Next month
              <Tooltip.Arrow className="fill-gray-900" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </Toolbar.Root>
  );
};
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { DateRangeTriggerProps } from './types';

export const DateRangeTrigger: React.FC<DateRangeTriggerProps> = ({ 
  displayText, 
  hasSelectedDates, 
  onClear, 
  isOpen, 
  isMobile 
}) => {
  return (
    <div className="flex items-center justify-between min-h-[1.5rem]">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <span className={`truncate ${hasSelectedDates ? 'text-gray-900' : 'text-gray-500'}`}>
          {displayText}
        </span>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="w-6 h-6 flex items-center justify-center">
          {hasSelectedDates && (
            <TooltipProvider delayDuration={800} skipDelayDuration={600}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={onClear}
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-gray-400 hover:text-gray-600"
                    aria-label="Clear dates"
                  >
                    <span className="text-sm leading-none">✕</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  className="px-2 py-1 text-sm"
                  sideOffset={5}
                  avoidCollisions={true}
                >
                  Clear selected dates
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-gray-400 transition-transform duration-300 ease-in-out ${
            (!isMobile && isOpen) ? 'rotate-180' : ''
          }`} 
        />
      </div>
    </div>
  );
};
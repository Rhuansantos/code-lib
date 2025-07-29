import React from 'react';
import { ChevronDown } from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';
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
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button
                    onClick={onClear}
                    className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-150"
                    aria-label="Clear dates"
                  >
                    <span className="text-sm leading-none">✕</span>
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="px-2 py-1 text-sm bg-gray-900 text-white rounded shadow-lg"
                    sideOffset={5}
                  >
                    Clear selected dates
                    <Tooltip.Arrow className="fill-gray-900" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
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
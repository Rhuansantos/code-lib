import React from 'react';
import { DateRangeCalendar, DateRange } from './components/DateRangeCalendar';
import { DateRangeCalendarReactDates, DateRange as DateRangeReactDates } from './components/DateRangeCalendarReactDates';

const App: React.FC = () => {
  const handleDateRangeChange = (dateRange: DateRange): void => {
    console.log('Custom implementation - Date range changed:', dateRange);
  };

  const handleReactDatesChange = (dateRange: DateRangeReactDates): void => {
    console.log('React-dates implementation - Date range changed:', dateRange);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-8">
        <DateRangeCalendar 
          onDateRangeChange={handleDateRangeChange}
        />
        
        <div className="border-t pt-8">
          <DateRangeCalendarReactDates 
            onDateRangeChange={handleReactDatesChange}
            allowPastDates={false}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
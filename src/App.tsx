import React from "react";
import { DateRangeCalendar, DateRange } from "./components/DateRangeCalendar";
import {
  DateRangeCalendarReactDates,
  DateRange as DateRangeReactDates,
} from "./components/DateRangeCalendarReactDates";
import { DateRangeSelect } from "./components/DateRangeCalendarShadcn";
import { DateRangePicker } from "./components/DateRangePickerDayPicker";
import {
  DateRangeSelectReactDates,
  DateRange as DateRangeSelectReactDatesType,
} from "./components/DateRangeSelectReactDates";

const App: React.FC = () => {
  const handleDateRangeChange = (dateRange: DateRange): void => {
    console.log("Custom implementation - Date range changed:", dateRange);
  };

  const handleReactDatesChange = (dateRange: DateRangeReactDates): void => {
    console.log("React-dates implementation - Date range changed:", dateRange);
  };

  const handleShadcnDateRangeChange = (dateRange: {
    startDate: Date | null;
    endDate: Date | null;
  }): void => {
    console.log("Shadcn implementation - Date range changed:", dateRange);
  };

  const handleDayPickerDateRangeChange = (dateRange: {
    startDate: Date | null;
    endDate: Date | null;
  }): void => {
    console.log("DayPicker implementation - Date range changed:", dateRange);
  };

  const handleSelectReactDatesChange = (
    dateRange: DateRangeSelectReactDatesType
  ): void => {
    console.log(
      "Select React-dates implementation - Date range changed:",
      dateRange
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-8">
        <DateRangePicker onDateRangeChange={handleDateRangeChange} />

        {/* <div className="border-t pt-8">
          <DateRangeCalendarReactDates 
            onDateRangeChange={handleReactDatesChange}
            allowPastDates={false}
          />
        </div> */}

        {/* <div className="border-t pt-8">
          <DateRangeSelect onDateRangeChange={handleShadcnDateRangeChange} />
        </div> */}

        <div className="border-t pt-8">
          <DateRangeSelectReactDates
            onDateRangeChange={handleSelectReactDatesChange}
          />
        </div>

        {/* <div className="border-t pt-8">
          <DateRangePicker onDateRangeChange={handleDayPickerDateRangeChange} />
        </div> */}
      </div>
    </div>
  );
};

export default App;

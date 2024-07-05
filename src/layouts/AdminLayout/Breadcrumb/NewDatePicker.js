import React from 'react';
import { DateRange } from 'react-date-range';
import { useStateContext } from '../../../contexts/MainContext';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from 'date-fns';

export default function DateRangePicker() {
  const { presentDate, toDate, setPresentDate, setToDate,setSelectedDate } = useStateContext();

  const handleSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    const formattedStartDate = format(startDate, 'yyyy-MM-dd');
    const formattedEndDate = format(endDate, 'yyyy-MM-dd');
    setPresentDate(formattedStartDate);
    setToDate(formattedEndDate);
    setSelectedDate("")
  };

  const today = new Date();

  return (
    <>
      <DateRange
        editableDateInputs={true}
        onChange={handleSelect}
        moveRangeOnFirstSelection={false}
        ranges={[
          {
            startDate: new Date(presentDate),
            endDate: new Date(toDate),
            key: 'selection'
          }
        ]}
        maxDate={today} // Disable future dates, allow only up to today
      />
    </>
  );
}

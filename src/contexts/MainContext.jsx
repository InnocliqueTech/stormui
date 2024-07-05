import { format, subDays } from 'date-fns';
import { useState } from 'react';
import { createContext, useContext } from 'react';

const StateContext = createContext();
export const StateContextProvider = ({ children }) => {
  const [zoneId, setZoneId] = useState(0);
  const [selectedDate, setSelectedDate] = useState('7D');
  const today = format(new Date(), 'yyyy-MM-dd');
  const [presentDate, setPresentDate] = useState(format(subDays(new Date(today), 7), 'yyyy-MM-dd'));
  const [toDate, setToDate] = useState(today);
  const [isDatePickerOpen, setDatePickerOpen] = useState(false); //to Toggle date picker

  const onDateChange = (daysToSub) => {
    setToDate(today);
    const newDate = format(subDays(new Date(toDate), daysToSub), 'yyyy-MM-dd');
    setPresentDate(newDate);
    setDatePickerOpen(false);
  };

  const toggleDatePicker = () => {
    setDatePickerOpen(!isDatePickerOpen);
  };

  return (
    <StateContext.Provider
      value={{
        toDate,
        setToDate,
        presentDate,
        setPresentDate,
        onDateChange,
        zoneId,
        setZoneId,
        selectedDate,
        setSelectedDate,
        toggleDatePicker,
        isDatePickerOpen,
        setDatePickerOpen
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  return useContext(StateContext);
};

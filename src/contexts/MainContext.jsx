import { format, subDays } from 'date-fns';
import { useState } from 'react';
import { createContext, useContext } from 'react';

const StateContext = createContext();
export const StateContextProvider = ({ children }) => {
  const [zoneId,setZoneId] = useState(0)
  const today = format(new Date(), 'yyyy-MM-dd');
  const [presentDate, setPresentDate] = useState(format(subDays(new Date(today), 7), 'yyyy-MM-dd'));
  const [toDate, setToDate] = useState(today);

  const onDateChange = (daysToSub) => {
    const newDate = format(subDays(new Date(toDate), daysToSub), 'yyyy-MM-dd');
    setPresentDate(newDate);
  };



  return <StateContext.Provider value={{ toDate, setToDate, presentDate, setPresentDate, onDateChange,zoneId,setZoneId }}>{children}</StateContext.Provider>;
};

export const useStateContext = () => {
  return useContext(StateContext);
};

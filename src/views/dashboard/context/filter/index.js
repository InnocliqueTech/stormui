import React, { createContext, useState } from 'react';
import axios from 'axios';
import { BASE_API_URL1 } from '../../../../config/constant';

// Create context
export const FilterContext = createContext();

// Create provider component
export const FilterProvider = ({ children }) => {
  // State for filters
  const [filters, setFilters] = useState({
    clientId: '',
    zoneId: '',
    fromDate: '',
    toDate: ''
  });

  // Function to fetch outflow data
  const getOutFlowData = async () => {
    try {
           const flowData = await axios.post(BASE_API_URL1 +'http://49.207.11.223:3307/dashboard/getTotalOutflowInDashboard', {
        clientId: filters.clientId,
        zoneId: filters.zoneId,
        fromDate: filters.fromDate,
        toDate: filters.toDate
      });
      // Update the filters context state with outFlowData
      setFilters(prevFilters => ({
        ...prevFilters,
        outFlowData: flowData.data
      }));
      console.log(flowData.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <FilterContext.Provider value={{ filters, setFilters, getOutFlowData }}>
      {children}
    </FilterContext.Provider>
  );
};

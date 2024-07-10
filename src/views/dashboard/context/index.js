// ClientsContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_API_URL1 } from '../../../config/constant';

export const ClientsContext = createContext();

export const ClientsProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [zones, setZones] = useState([]);
  const [selectedZone, setSelectedZone] = useState(0)
  

  useEffect(() => {
    const getSelectClient = async () => {
      try {
        const response = await axios.post(BASE_API_URL1 + 'clients/getAllClients', {
          userId: 1
        });
        console.log(response)
        if (Array.isArray(response.data.clients)) {
          setClients(response.data.clients);
          if (response.data.clients.length > 0) {
            setSelectedClient(response.data.clients[0].clientId);
          }
        } else {
          console.error('Response data is not an array', response.data);
          setClients([]);
        }
      } catch (e) {
        console.error('Error fetching clients:', e);
        setClients([]);
      }
    };
    getSelectClient();

  }, []);
  console.log('clients', clients)

  useEffect(() => {
    const getSelectZone = async () => {
      try {
        const response = await axios.post(BASE_API_URL1 + 'zones/getAllZoneDetailsWithClientId', {
          clientId: selectedClient
        });
        if (Array.isArray(response.data.zonesList)) {
          setZones(response.data.zonesList);
        } else {
          setZones([]);
        }
      } catch (error) {
        setZones([]);
      }
    }
    if (selectedClient) {
      getSelectZone();
    }
  }, [selectedClient]);
 
console.log('clients', clients)
  return (
    <ClientsContext.Provider value={{ clients, selectedClient, setSelectedClient, zones, selectedZone, setSelectedZone }}>
      {children}
    </ClientsContext.Provider>
  );
};

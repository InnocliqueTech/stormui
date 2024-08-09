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
  const [dmas, setDmas] = useState([])
  const [selectedDma, setSelectedDma] = useState(0)
  const [gateways, setGateways] = useState([]);
  const [selectedGateway, setSelectedGateway] = useState(0)
  const [status, setStatus] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(0)


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
        const response = await axios.post('http://49.207.11.223:3307/zones/getAllZonesForDropdown', {
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

  useEffect(() => {
    const getSelectDma = async () => {
      try {
        const response = await axios.post('http://49.207.11.223:3307/dma/getAllDMAsWithClientIdAndZoneIdForDropdown', {
          clientId: selectedClient,
          zoneId: selectedZone
        });
        console.log(response)
        if (Array.isArray(response.data.dmasList)) {
          setDmas(response.data.dmasList);
          console.log(dmas)
        } else {
          setDmas([]);
        }
      } catch (error) {
        console.log(error)
        setDmas([]);
      }
    }
    if (selectedClient) {
      getSelectDma();
    }
  }, [selectedClient, selectedZone])

  useEffect(() => {
    const getSelectGateway = async () => {
      try {
        const response = await axios.post('http://49.207.11.223:3307/gateways/getAllGatewaysForDropdown', {
          clientId: selectedClient,
          zoneId: selectedZone,
          dmaId: selectedDma
        });
        console.log(response)
        if (Array.isArray(response.data.gatewayDetails)) {
          setGateways(response.data.gatewayDetails);
        } else {
          setGateways([]);
        }
      } catch (error) {
        console.log(error)
        setGateways([]);
      }
    }
    if (selectedClient) {
      getSelectGateway();
    }
  }, [selectedClient, selectedZone, selectedDma])

  useEffect(() => {
    const dummyData = [
      { statusId: 0, displayName: 'All' },
      { statusId: 1, displayName: 'Active' },
      { statusId: 2, displayName: 'Inactive' }
    ]
    setStatus(dummyData);
    console.log(status)

  }, [])

  console.log('clients', clients)
  console.log(zones)
  console.log(dmas)
  return (
    <ClientsContext.Provider value={{ clients, selectedClient, setSelectedClient, zones, selectedZone, setSelectedZone, dmas, selectedDma, setSelectedDma, gateways, selectedGateway, setSelectedGateway, status, selectedStatus, setSelectedStatus }}>
      {children}
    </ClientsContext.Provider>
  );
};

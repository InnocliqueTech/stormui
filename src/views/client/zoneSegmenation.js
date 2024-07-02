import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MoreVert } from '@mui/icons-material';
import Table from 'react-bootstrap/Table';

const  ZoneSegmenation =() =>{
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.post('http://49.207.11.223:3307/zones/getTotalZoneWiseSegementation', {
      clientId: 1,
      zoneId: 0,
      dmaId: 0
    })
    .then(response => {
      setCustomers(response.data.customerDetails);
    })
    .catch(error => {
      console.error('There was an error fetching the customer data!', error);
    });
  }, []);
  return (
    <Table responsive style={{marginTop: 30, borderRadius: 10, border: '1px solid #ccc'}}>
      <thead style={{backgroundColor: '#F4F5F5'}}>
        <tr>
          <th className='clienttablehead'>#CAN</th>
          <th className='clienttablehead'>Type</th>
          <th className='clienttablehead'>Gateway ID</th>
          <th className='clienttablehead'>Last Communication Time</th>
          <th className='clienttablehead'>Reading</th>
          <th className='clienttablehead'>Zones</th>
          <th className='clienttablehead'>Status</th>
          <th className='clienttablehead'>Action</th>
        </tr>
      </thead>
      <tbody>
      {customers.slice(0, 5).map((customer, index) => (
          <tr key={index}>
            <td className='clienttabletext'>{customer.can || 'N/A'}</td>
            <td className='clienttabletext'>{customer.type}</td>
            <td className='clienttabletext'>{customer.gatewayId}</td>
            <td className='clienttabletext'>{new Date(customer.lastCommunicationTime).toLocaleString()}</td>
            <td className='clienttabletext'>
              <span style={{backgroundColor: '#f4f5f5', padding: 8, paddingLeft: 20, paddingRight: 20, borderRadius: 20}}>
                {customer.reading}
              </span>
            </td>
            <td className='clienttabletext'>
              <span style={{backgroundColor: 'rgba(149, 172, 255, 0.2)', padding: 8, paddingLeft: 40, paddingRight: 40, borderRadius: 20}}>
                {customer.zone}
              </span>
            </td>
            <td className='clienttabletext'>
              <span style={{backgroundColor: customer.reading > 0 ? 'rgba(47, 182, 23, 1)' : 'rgba(255, 0, 0, 1)', padding: 8, paddingLeft: 20, paddingRight: 20, color: '#fff'}}>
                {customer.reading > 0 ? 'Active' : 'Inactive'}
              </span>
            </td>
            <td className='clienttabletext'><MoreVert /></td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ZoneSegmenation;

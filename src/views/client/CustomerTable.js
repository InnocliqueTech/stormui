import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MoreVert } from '@mui/icons-material';
import Table from 'react-bootstrap/Table';

function CustomerTable() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.post('http://49.207.11.223:3307/clients/getTotalCustomerWiseSegementation', {
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
    <div className='customer-table'>
      <Table style={{ borderRadius: 8 }} >
        <thead style={{ backgroundColor: '#F4F5F5' }}>
          <tr>
            <th className='tablehead'>#CAN</th>
            <th className='tablehead'>Type</th>
            <th className='tablehead'>Gateway ID</th>
            <th className='tablehead'>Last Communication Time</th>
            <th className='tablehead'>Reading</th>
            <th className='tablehead'>Zones</th>
            <th className='tablehead'>Status</th>
            <th className='tablehead'>Action</th>
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
    </div>
  );
}

export default CustomerTable;

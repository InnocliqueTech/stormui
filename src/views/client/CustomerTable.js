import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { MoreVert } from '@mui/icons-material';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Paginations from '../../components/Paginatons';
import { ClientsContext } from '../dashboard/context/index';
function CustomerTable() {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const { selectedClient, selectedZone } = useContext(ClientsContext);
  useEffect(() => {

    fetchData(); // Initial data fetch
  }, []);

  const fetchData = () => {
    setLoading(true);
    axios.post('http://49.207.11.223:3307/clients/getTotalCustomerWiseSegementation', {
      clientId: selectedClient,
      zoneId: selectedZone,
      dmaId: 0
    })
      .then(response => {
        setCustomers(response.data.customerDetails);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the customer data!', error);
        setLoading(false);
      });
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const offset = (currentPage - 1) * itemsPerPage;
  const currentPageData = customers.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(customers.length / itemsPerPage);

  return (
    <div className='customer-table'>
      <div className='pagination-controls' style={{ marginTop: '20px', marginLeft: '10PX' }}>
        <label htmlFor='itemsPerPage' style={{ fontWeight: '500', color: 'black', fontSize: '18px' }}>Items per page:</label><nsbp /><nsbp />
        <select id='itemsPerPage' value={itemsPerPage} onChange={handleItemsPerPageChange} style={{ marginLeft: '8px' }}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
      {loading ? ( // Display spinner if loading is true
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
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
            {currentPageData.map((customer, index) => (
              <tr key={index}>
                <td className='clienttabletext'>{customer.can || 'N/A'}</td>
                <td className='clienttabletext'>{customer.type}</td>
                <td className='clienttabletext'>{customer.gatewayId}</td>
                <td className='clienttabletext'>{new Date(customer.lastCommunicationTime).toLocaleString()}</td>
                <td className='clienttabletext'>
                  <span style={{ backgroundColor: '#f4f5f5', padding: 8, paddingLeft: 20, paddingRight: 20, borderRadius: 20 }}>
                    {customer.reading}
                  </span>
                </td>
                <td className='clienttabletext'>
                  <span style={{ backgroundColor: 'rgba(149, 172, 255, 0.2)', padding: 8, paddingLeft: 40, paddingRight: 40, borderRadius: 20 }}>
                    {customer.zone}
                  </span>
                </td>
                <td className='clienttabletext'>
                  <span style={{ backgroundColor: customer.reading > 0 ? 'rgba(47, 182, 23, 1)' : 'rgba(255, 0, 0, 1)', padding: 8, paddingLeft: 20, paddingRight: 20, color: '#fff' }}>
                    {customer.reading > 0 ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className='clienttabletext'><MoreVert /></td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <div style={{ textAlign: 'center', marginTop: '100PX' }}>

        <Paginations
          currentPage={currentPage}
          totalPages={pageCount}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default CustomerTable;

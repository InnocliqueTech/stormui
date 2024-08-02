import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {Col, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { MoreVert } from '@mui/icons-material';
// import { ThreeDots } from 'react-loader-spinner';
import Paginations from '../../components/Paginatons';
import { ClientsContext } from '../dashboard/context';
import { BASE_API_URL1 } from '../../config/constant';
import { useLocation } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';


export default function DmaList() {
  // const selectedZone = 0;
  const { clients, selectedZone } = useContext(ClientsContext);
  const [zonesList, setZonesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const location = useLocation();
  // Destructure the state directly from location.state
  const { zoneId } = location.state || { zoneId: selectedZone };
  console.log('location.state:', location.state);  // Debugging line
  console.log('zoneId:', zoneId);  // Debugging line


  useEffect(() => {
    if (clients && clients.length > 0) {
      getDashboardData(clients[0].clientId);
    }
  }, [clients]);

  const getDashboardData = async (clientId) => {
    setLoading(true);
    try {
      const requestBody = {
        clientId: clientId,
        zoneId: zoneId,
      }
      console.log(requestBody)
      const response = await axios.post(BASE_API_URL1 + 'dma/getAllDMAsWithClientIdAndZoneId', requestBody);
      setZonesList(response.data.dmasList || []);
      console.log(zonesList)
    } catch (e) {
      console.log('Error fetching data:', e);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const offset = (currentPage - 1) * itemsPerPage;
  const currentPageData = zonesList.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(zonesList.length / itemsPerPage);

  return (
    <div className='col-md-12'>
      <div style={{ backgroundColor: '#fff', padding: 16, borderRadius: 10, paddingBottom: 100 }}>
        <Row style={{ marginBottom: '24px' }}>
          <Col md={9} sm={7} xs={7}></Col>
          <Col md={3} sm={5} xs={5} style={{ textAlign: 'end' }}>
            <CachedOutlinedIcon style={{ color: '#6C757D' }} />
            <FilterAltOutlinedIcon style={{ color: '#6C757D', marginLeft: 20, marginRight: 20 }} />
            <FileUploadOutlinedIcon style={{ color: '#6C757D' }} />
          </Col>
        </Row>

        <div className='customer-table mt-0'>
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
            <Table style={{ borderRadius: 8 }}>
            <thead style={{ backgroundColor: '#F4F5F5' }}>
              <tr>
                <th className='tablehead'>DMA ID</th>
                <th className='tablehead'>Gateway ID</th>
                <th className='tablehead'>Last Communication Time</th>
                <th className='tablehead'>Reading</th>
                <th className='tablehead'>Meters</th>
                <th className='tablehead'>Status</th>
                <th className='tablehead'>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentPageData.map((dma, index) => (
                <tr key={dma.dmaId}>
                  <td className='tablecontent-link'>
                    <Link
                      // href="/app/meterlist" 
                      to="/app/gatewaylist"
                      state={{ zoneId: zoneId, dmaId: dma.dmaId}}
                      onClick={() => console.log('Link clicked for dmaId:', dma.dmaId, zoneId )}
                      style={{ textDecoration: 'none', cursor: 'pointer' }}>{dma.displayName}</Link>
                  </td>
                  <td className='tablecontent'>{dma.gatewayId}</td>
                  <td className='tablecontent'>{new Date(dma.lastCommunicationTime).toLocaleString()}</td>
                  <td className='tablecontent'>
                    <span style={{ backgroundColor: '#E3F2FD', padding: 8, paddingLeft: 20, paddingRight: 20, borderRadius: 20, color: '#1565C0' }}>{dma.reading}</span>
                  </td>
                  <td className='tablecontent'>
                    <span style={{ backgroundColor: '#E3F2FD', padding: 8, paddingLeft: 20, paddingRight: 20, borderRadius: 20, color: '#1565C0' }}>{dma.meters}</span>
                  </td>
                  <td className='tablecontent'>
                    <span style={{ backgroundColor: 'rgba(47, 182, 23, 1)', padding: 8, paddingLeft: 20, paddingRight: 20, borderRadius: 20, color: 'white' }}>{dma.status}</span>
                  </td>
                  <td className='tablecontent'>
                    <MoreVert />
                  </td>
                </tr>
              ))}
              {zonesList.length === 0 && (
                <tr>
                  <td colSpan="8" className='tablecontent' style={{ textAlign: 'center' }}>No data available</td>
                </tr>
              )}
            </tbody>
            </Table>
          )}
        </div>
        <div style={{ textAlign: 'center', marginTop: '40PX' }}>

          <Paginations
            currentPage={currentPage}
            totalPages={pageCount}
            onPageChange={handlePageChange} // Ensure onPageChange is correctly passed
          />
        </div>
      </div>
    </div>
  );
}


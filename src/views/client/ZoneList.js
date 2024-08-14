import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
// import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
// import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
// import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { Link } from 'react-router-dom';
// import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
// import { MoreVert } from '@mui/icons-material';
import Spinner from 'react-bootstrap/Spinner';
import Paginations from '../../components/Paginatons'; // Make sure this path is correct
//import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { ClientsContext } from '../dashboard/context';
import { BASE_API_URL1 } from '../../config/constant';

export default function ZoneList() {
  const { clients } = useContext(ClientsContext);
  const [zonesList, setZonesList] = useState([]);
  const [expandedZone] = useState(null);
  const [data] = useState({});
  const [currentPage, setCurrentPage] = useState(1); // 1-based index for pages
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (clients && clients.length > 0) {
      getDashboardData(clients[0].clientId); // Assuming each client has an id field
    }
  }, [clients]);

  const getDashboardData = async (clientId) => {
    try {
      setLoading(true);
      const response = await axios.post(BASE_API_URL1 + 'zones/getAllZoneDetailsWithClientId', {
        clientId: clientId
      });
      console.log(response)
      setZonesList(response.data.zonesList);
      console.log(zonesList)
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  // const getZoneBasedOnData = async (clientId, zoneId) => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.post(BASE_API_URL1 + 'dma/getAllDMAsWithClientIdAndZoneId', {
  //       clientId: clientId,
  //       zoneId: zoneId,
  //     });
  //     setZoneData((prevData) => ({
  //       ...prevData,
  //       [zoneId]: response.data.dmasList,
  //     }));
  //     setLoading(false);
  //   } catch (e) {
  //     console.log(e);
  //     setLoading(false);
  //   }
  // };

  // const handleAccordionChange = (zoneId) => {
  //   setExpandedZone((prevExpandedZone) => (prevExpandedZone === zoneId ? null : zoneId));
  //   if (!data[zoneId]) {
  //     getZoneBasedOnData(clients[0].clientId, zoneId);
  //   }
  // };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page
  };

  const offset = (currentPage - 1) * itemsPerPage;
  const currentPageData = zonesList.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(zonesList.length / itemsPerPage);
  console.log(zonesList)

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active':
        return { backgroundColor: 'rgba(47, 182, 23, 1)', color: '#fff' };
      case 'Inactive':
        return { backgroundColor: 'rgba(255, 0, 0, 1)', color: '#fff' };
      default:
        return { backgroundColor: 'rgba(128, 128, 128, 1)', color: '#fff' }; // Default color for other statuses
    }
  };

  return (
    <div className='col-md-12'>
      <div style={{ backgroundColor: '#fff', padding: 16, borderRadius: 10, paddingBottom: 100 }}>
        <Row style={{ marginBottom: '24px' }}>
          <Col md={9} sm={7} xs={7}>
            <span style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>Zones</span>{' '}
          </Col>
          {/* <Col md={3} sm={5} xs={5} style={{ textAlign: 'end' }}>
            <CachedOutlinedIcon style={{ color: '#6C757D' }} />
            <FilterAltOutlinedIcon style={{ color: '#6C757D', marginLeft: 20, marginRight: 20 }} />
            <FileUploadOutlinedIcon style={{ color: '#6C757D' }} />
          </Col> */}
        </Row>

        <div className='customer-table mt-0'>

          {loading ? ( // Display spinner if loading is true
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <Table style={{ borderRadius: 8 }}>
              <thead>
                <tr>
                  {/* <th className='tablehead'></th> */}
                  <th className='tablehead'>Zone ID</th>
                  <th className='tablehead'>Gateway ID</th>
                  <th className='tablehead'>Last Communication Time</th>
                  <th className='tablehead'>Reading</th>
                  <th className='tablehead'>Meters</th>
                  <th className='tablehead'>Status</th>
                  {/* <th className='tablehead'>Action</th> */}
                </tr>
              </thead>
              <tbody>

                {currentPageData.map((zone) => (
                  <React.Fragment key={zone.zoneId}>
                    <tr>
                      <td className='tablecontent-link'>
                        <Link
                          to="/app/dmalist"
                          state={{ zoneId: zone.zoneId }}
                          // to={{
                          //   pathname: "/app/dmalist",
                          //   state: { zoneId: zone.zoneId }
                          // }}
                          onClick={() => console.log('Link clicked for zoneId:', zone.zoneId)}  // Debugging line
                          style={{ textDecoration: 'none', cursor: 'pointer' }}>

                          {zone.displayName}

                        </Link>
                      </td>

                      <td className='tablecontent'>
                        <span style={{ backgroundColor: '#FFF3E8', padding: 8, paddingLeft: 20, paddingRight: 20, borderRadius: 20, color: '#FF8515' }}>
                          {zone.gatewayId}
                        </span>
                      </td>
                      <td className='tablecontent'>{zone.lastCommunicationTime}</td>
                      <td className='tablecontent'>
                        <span style={{ backgroundColor: '#E3F2FD', padding: 8, paddingLeft: 20, paddingRight: 20, borderRadius: 20, color: '#1565C0' }}>
                          {zone.reading || 'N/A'}
                        </span>
                      </td>
                      <td className='tablecontent'>
                        <span style={{ backgroundColor: '#E3F2FD', padding: 8, paddingLeft: 20, paddingRight: 20, borderRadius: 20, color: '#1565C0' }}>
                          {zone.meters}
                        </span>
                      </td>
                      {/* <td className='tablecontent'>
                        <span style={{ backgroundColor: 'rgba(47, 182, 23, 1)', padding: 8, paddingLeft: 20, paddingRight: 20, color: '#fff' }}>
                          {zone.status}
                        </span>
                      </td> */}
                      <td className='tablecontent'>
                        <span style={{ ...getStatusStyle(zone.status), padding: '8px 20px' }}>
                          {zone.status}
                        </span>
                      </td>
                      {/* <td className='tablecontent'><MoreVert style={{ color: '#D6D9DC' }} /></td> */}
                    </tr>
                    {expandedZone === zone.zoneId && data[zone.zoneId] && data[zone.zoneId].map((dma) => (
                      <tr key={dma.dmaId}>
                        <td className='tablecontent tabelexpand-bg'>

                          <tr></tr>
                          {/* <span style={{ backgroundColor: '#FFF3E8', padding: 8, paddingLeft: 20, paddingRight: 20, borderRadius: 20, color: '#FF8515' }}> */}
                          {/* {dma.dmaId} */}
                          {/* </span> */}
                        </td>
                        <td className='tablecontent tabelexpand-bg'>

                          {/* <span style={{ backgroundColor: '#FFF3E8', padding: 8, paddingLeft: 20, paddingRight: 20, borderRadius: 20, color: '#FF8515' }}> */}
                          {dma.dmaId}
                          {/* </span> */}
                        </td>
                        <td className='tablecontent tabelexpand-bg'>
                          <span style={{ backgroundColor: '#FFF3E8', padding: 8, paddingLeft: 20, paddingRight: 20, borderRadius: 20, color: '#FF8515' }}>
                            {dma.gatewayId}
                          </span>
                        </td>
                        <td className='tablecontent tabelexpand-bg'>


                          {/* <span style={{ backgroundColor: '#FFF3E8', padding: 8, paddingLeft: 20, paddingRight: 20, borderRadius: 20, color: '#FF8515' }}> */}
                          {dma.lastCommunicationTime}
                          {/* </span> */}
                        </td>
                        <td className='tablecontent tabelexpand-bg'>
                          <span style={{ backgroundColor: '#E3F2FD', padding: 8, paddingLeft: 20, paddingRight: 20, borderRadius: 20, color: '#1565C0' }}>
                            {dma.reading || 'N/A'}
                          </span>
                        </td>
                        <td className='tablecontent tabelexpand-bg'>
                          <span style={{ backgroundColor: '#E3F2FD', padding: 8, paddingLeft: 20, paddingRight: 20, borderRadius: 20, color: '#1565C0' }}>
                            {dma.meters}
                          </span>
                        </td>
                        <td className='tablecontent tabelexpand-bg'>
                          <span style={{ backgroundColor: 'rgba(47, 182, 23, 1)', padding: 8, paddingLeft: 20, paddingRight: 20, color: '#fff' }}>
                            {dma.status}
                          </span>
                        </td>
                        <td className='tablecontent tabelexpand-bg'> </td>

                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </Table>
          )}
        </div>
        <div className='row mt-3'>
          <div className='col-md-5'>
            <div className='pagination-controls' style={{ marginTop: '10px', marginLeft: '10PX' }}>
              <label htmlFor='itemsPerPage' style={{ fontWeight: '500', color: 'black', fontSize: '18px' }}>Items per page:</label><nsbp /><nsbp />
              <select id='itemsPerPage' value={itemsPerPage} onChange={handleItemsPerPageChange} style={{ marginLeft: '8px' }}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>
          <div className='col-md-1'></div>
          <div className='col-md-6'>
            <div >
              <Paginations
                currentPage={currentPage}
                totalPages={pageCount}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

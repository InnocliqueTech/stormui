import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { Accordion, AccordionSummary, AccordionDetails, Link } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import Paginations from '../../components/Paginatons'; // Make sure this path is correct
//import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { ClientsContext } from '../dashboard/context';
import { BASE_API_URL1 } from '../../config/constant';

export default function ZoneList() {
  const { clients } = useContext(ClientsContext);
  const [zonesList, setZonesList] = useState([]);
  const [expandedZone, setExpandedZone] = useState(null);
  const [data, setZoneData] = useState({});

  useEffect(() => {
    if (clients && clients.length > 0) {
      getDashboardData(clients[0].clientId); // Assuming each client has an id field
    }
  }, [clients]);

  const getDashboardData = async (clientId) => {
    try {
      const response = await axios.post(BASE_API_URL1 + 'zones/getAllZoneDetailsWithClientId', {
        clientId: clientId
      });
      setZonesList(response.data.zonesList);
    } catch (e) {
      console.log(e);
    }
  };

  const getZoneBasedOnData = async (clientId, zoneId) => {
    try {
      const response = await axios.post(BASE_API_URL1 + 'dma/getAllDMAsWithClientIdAndZoneId', {
        clientId: clientId,
        zoneId: zoneId,
      });
      setZoneData((prevData) => ({
        ...prevData,
        [zoneId]: response.data.dmasList,
      }));
    } catch (e) {
      console.log(e);
    }
  };

  const handleAccordionChange = (zoneId) => {
    setExpandedZone((prevExpandedZone) => (prevExpandedZone === zoneId ? null : zoneId));
    if (!data[zoneId]) {
      getZoneBasedOnData(clients[0].clientId, zoneId);
    }
  };

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
          <Table style={{ borderRadius: 8 }}>
            <thead>
              <tr>
                <th className='tablehead'></th>
                <th className='tablehead'>Zone/DMA ID</th>
                <th className='tablehead'>Gateway ID</th>
                <th className='tablehead'>Last Communication Time</th>
                <th className='tablehead'>Reading</th>
                <th className='tablehead'>Meters</th>
                <th className='tablehead'>Status</th>
                <th className='tablehead'>Action</th>
              </tr>
            </thead>
            <tbody>
              {zonesList.slice(0, 5).map((zone) => (
                <React.Fragment key={zone.zoneId}>
                  <tr>
                    <td className='tablecontent'>
                      <Accordion expanded={expandedZone === zone.zoneId} onChange={() => handleAccordionChange(zone.zoneId)} style={{ boxShadow: 'none' }}>
                        <AccordionSummary
                          expandIcon={<NavigateNextIcon />}
                          aria-controls="panel1-content"
                          id="panel1-header"
                        >
                    
                        </AccordionSummary>
                        <AccordionDetails>
                         
                        </AccordionDetails>
                      </Accordion>
                    </td>
                    <td className='tablecontent'>
                      <Link to="/app/dmalist" style={{ textDecoration: 'none', cursor: 'pointer', color: '#212121' }}>
                        {zone.zoneId}
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
                    <td className='tablecontent'>
                      <span style={{ backgroundColor: 'rgba(47, 182, 23, 1)', padding: 8, paddingLeft: 20, paddingRight: 20, color: '#fff' }}>
                        {zone.status}
                      </span>
                    </td>
                    <td className='tablecontent'><MoreVert style={{ color: '#D6D9DC' }} /></td>
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
        </div>
        <Paginations />
      </div>
    </div>
  );
}

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Link } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import Paginations from '../../components/Paginatons';
import { ThreeDots } from 'react-loader-spinner';
import { ClientsContext } from '../dashboard/context';
import { BASE_API_URL1 } from '../../config/constant';

export default function DmaList() {
  const { clients } = useContext(ClientsContext);
  const [zonesList, setZonesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (clients && clients.length > 0) {
      getDashboardData(clients[0].clientId);
    }
  }, [clients]);

  const getDashboardData = async (clientId) => {
    setLoading(true);
    try {
      const response = await axios.post(BASE_API_URL1 + 'dma/getAllDMAsWithClientIdAndZoneId', {
        clientId: clientId,
        zoneId: "0"
      });
      setZonesList(response.data.dmasList || []);
    } catch (e) {
      console.log('Error fetching data:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-around row">
        {/* Breadcrumbs and client selection */}
      </div>

      <div style={{ backgroundColor: '#fff', padding: 16, borderRadius: 10, paddingBottom: 100 }}>
        <Row style={{ marginBottom: '24px' }}>
          {/* Navigation and icons */}
        </Row>
        <div className="dashheading"></div>
        <div className='customer-table mt-0'>
          {loading ? (
            <div className="loader-container" style={{ textAlign: 'center', marginTop: '20px' }}>
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#00BFFF"
                ariaLabel="three-dots-loading"
                visible={true}
              />
            </div>
          ) : (
            <Table style={{ borderRadius: 8 }}>
              <thead style={{ backgroundColor: '#F4F5F5' }}>
                <tr>
                  <th className='tablehead'>DMA ID</th>
                  <th className='tablehead'>Region</th>
                  <th className='tablehead'>Gateway ID</th>
                  <th className='tablehead'>Last Communication Time</th>
                  <th className='tablehead'>Reading</th>
                  <th className='tablehead'>Meters</th>
                  <th className='tablehead'>Status</th>
                  <th className='tablehead'>Action</th>
                </tr>
              </thead>
              <tbody>
                {zonesList.slice(0, 5).map((dma, index) => (
                  <tr key={index}>
                    <td className='tablecontent'>
                      <Link href="/app/meterlist" style={{ textDecoration: 'none', cursor: 'pointer', color: '#212121' }}>#{dma.dmaId} </Link>
                    </td>
                    <td className='tablecontent'>
                      <span style={{ backgroundColor: '#FFF3E8', padding: 8, paddingLeft: 20, paddingRight: 20, borderRadius: 20, color: '#FF8515' }}>{dma.region}</span>
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
          <Paginations />
      </div>
    </>
  );
}

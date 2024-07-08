import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MoreVert } from '@mui/icons-material';
import Table from 'react-bootstrap/Table';
import { Col, Pagination, Row } from 'react-bootstrap';

const ZoneSegmenation = () => {
  const [zonesDetails, setZonesDetails] = useState([]);

  //For Pagination
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const filteredItems = zonesDetails.slice(firstIndex, lastIndex);

  useEffect(() => {
    axios
      .post('http://49.207.11.223:3307/zones/getTotalZoneWiseSegementation', {
        clientId: 1,
        zoneId: 0,
        dmaId: 0
      })
      .then((response) => {
        setZonesDetails(response.data.zoneDetails);
      })
      .catch((error) => {
        console.error('There was an error fetching the customer data!', error);
      });
  }, []);
  return (
    <>
      <div className="customer-table">
        <Table style={{ borderRadius: 8 }}>
          <thead style={{ backgroundColor: '#F4F5F5' }}>
            <tr>
              <th className="tablehead">ZoneId</th>
              <th className="tablehead">Gateway ID</th>
              <th className="tablehead">Last Communication Time</th>
              <th className="tablehead">Reading</th>
              <th className="tablehead">DMAS</th>
              <th className="tablehead">Meters</th>
              <th className="tablehead">Status</th>
              <th className="tablehead">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((customer, index) => (
              <tr key={index}>
                <td className="clienttabletext">{customer.zoneId || 'N/A'}</td>
                <td className="clienttabletext">{customer.gatewayId}</td>
                <td className="clienttabletext">{new Date(customer.lastCommunicationTime).toLocaleString()}</td>
                <td className="clienttabletext">
                  <span style={{ backgroundColor: '#f4f5f5', padding: 8, paddingLeft: 20, paddingRight: 20, borderRadius: 20 }}>
                    {customer.reading}
                  </span>
                </td>
                <td className="clienttabletext">{customer.dmas}</td>
                <td className="clienttabletext">
                  <span
                    style={{ backgroundColor: 'rgba(149, 172, 255, 0.2)', padding: 8, paddingLeft: 40, paddingRight: 40, borderRadius: 20 }}
                  >
                    {customer.meters}
                  </span>
                </td>
                <td className="clienttabletext">
                  <span
                    style={{
                      backgroundColor: customer.reading > 0 ? 'rgba(47, 182, 23, 1)' : 'rgba(255, 0, 0, 1)',
                      padding: 8,
                      paddingLeft: 20,
                      paddingRight: 20,
                      color: '#fff'
                    }}
                  >
                    {customer.reading > 0 ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="clienttabletext">
                  <MoreVert />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Paginations
          zonesDetails={zonesDetails}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setItemsPerPage={setItemsPerPage}
        />
      </div>
    </>
  );
};

export default ZoneSegmenation;

function Paginations({ zonesDetails, itemsPerPage, currentPage, setCurrentPage }) {
  // const { zonesList, itemsPerPage, currentPage } = useStateContext();
  const items = Math.ceil(zonesDetails.length / itemsPerPage);
  const paginateItems = Array(items)
    .fill()
    .map((_, index) => index + 1);

  return (
    <Row style={{ position: 'absolute', bottom: -15, right: 30 }}>
      <Col md={12} style={{ textAlign: 'end' }}>
        <Pagination>
          {paginateItems.map((item, index) => {
            return (
              <Pagination.Item key={index} active={item === currentPage} onClick={() => setCurrentPage(item)}>
                {item}
              </Pagination.Item>
            );
          })}
        </Pagination>
      </Col>
    </Row>
  );
}

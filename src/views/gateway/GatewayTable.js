import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Card } from '@mui/material';
import { Col, Row } from 'react-bootstrap';
import { CachedOutlined, FileUploadOutlined } from '@mui/icons-material';
import Table from 'react-bootstrap/Table';
import Paginations from '../../components/Paginatons';
import { BASE_API_URL1 } from '../../config/constant';
import { ClientsContext } from '../dashboard/context/index';
import { useLocation } from 'react-router-dom';
// import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
// import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
// import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  fullWidth: true,
}));

const GatewayTable = ({onClickGateWay, gatewayIdClick}) => {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [gateways, setGateways] = useState([]);
  const [basicDetails] = useState({});
  const [lastFrameData] = useState({});
  const { selectedClient, selectedZone, selectedDma } = useContext(ClientsContext);
  const location = useLocation();
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);


  const { zoneId, dmaId } = location.state || { zoneId: selectedZone, dmaId: selectedDma };
  console.log('location.state:', location.state);
  console.log('zoneId:', zoneId);
  console.log('dmaId:', dmaId);
  useEffect(() => {
    getAllGateways();
  }, [selectedClient, selectedZone, selectedDma]);

  const getAllGateways = async () => {
    const clientId = selectedClient;
    const requestBody = {
      clientId,
      zoneId: zoneId,
      dmaId: dmaId
    }
    console.log(requestBody)
    try {

      const response = await axios.post(`${BASE_API_URL1}gateways/getAllGatewaysWithClientId`, requestBody);
      console.log(response)
      if (response.data && response.data.gatewayDetails) {
        setGateways(response.data.gatewayDetails);
      }
      setLoading(false);
    } catch (e) {
      console.error('Error fetching gateways:', e);
    }
  };

  // const handleClickOpen = async (Id) => {
  //   try {
  //     const clientId = selectedClient;
  //     const response = await axios.post(`${BASE_API_URL1}gateways/getGatewayDetailsWithClientIdAndGatewayId`, {
  //       clientId,
  //       gatewayId: Id
  //     });
  //     if (response.data) {
  //       setLastFrameData(response.data);
  //       setBasicDetails({
  //         id: response.data.id,
  //         type: response.data.type,
  //         subnet: response.data.subnet,
  //         ceacon: response.data.ceacon,
  //         transmittingPower: response.data.transmittingPower,
  //         createdTime: response.data.createdTime,
  //         name: response.data.name,
  //         region: response.data.region,
  //         beacon: response.data.beacon,
  //         gdtp: response.data.gdtp,
  //         http: response.data.http,
  //         remarks: response.data.remarks,
  //       });
  //       setOpen(true);
  //     }
  //   } catch (e) {
  //     console.error('Error fetching gateway details:', e);
  //   }
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page
  };
  const offset = (currentPage - 1) * itemsPerPage;
  const currentPageData = gateways.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(gateways.length / itemsPerPage);
  console.log(gateways)

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active':
        return { backgroundColor: 'rgba(47, 182, 23, 1)', color: '#fff' };
      case 'Inactive':
        return { backgroundColor: 'rgba(255, 0, 0, 1)', color: '#fff' };
      case 'Not Working':
        return { backgroundColor: 'rgba(255, 0, 0, 1)', color: '#fff' };
      default:
        return { backgroundColor: 'transparent', color: '#fff' }; // Default color for other statuses
    }
  };

  return (
    <div style={{ backgroundColor: '#fff', padding: 16, borderRadius: 10 }}>
      <Row>
        <Col md={9} sm={7} xs={7}>
        {gatewayIdClick == true ? 'click' : <span style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>Gateways</span>}
          
          {/* <span style={{ textAlign: 'end' }}>
              <InfoOutlinedIcon style={{ height: 20, width: 20, justifyContent: 'center', color: '#D6D9DC', marginLeft: 5 }} />
            </span>
          </Col>
          <Col md={3} sm={5} xs={5} style={{ textAlign: 'end' }}>
            <CachedOutlinedIcon style={{ color: '#6C757D' }} />{' '}
            <span>
              {' '}
              <FilterAltOutlinedIcon style={{ color: '#6C757D', marginLeft: 20, marginRight: 20 }} />
            </span>
            <span>
              {' '}
              <FileUploadOutlinedIcon style={{ color: '#6C757D' }} />
            </span> */}
        </Col>
      </Row>
      <div className='customer-table'>

        {loading ? ( // Display spinner if loading is true
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Table style={{ borderRadius: 8 }}>
            <thead style={{ backgroundColor: '#F4F5F5' }}>
              <tr>
                {/* <th className='tablehead'><Checkbox /></th> */}
                <th className='tablehead'>Gateway ID</th>
                <th className='tablehead'>Time</th>
                <th className='tablehead'>ETH State</th>
                <th className='tablehead'>LTE State</th>
                <th className='tablehead'>Temperature</th>
                <th className='tablehead'>Power State</th>
                <th className='tablehead'>Battery State</th>
                <th className='tablehead'>Battery Level</th>
                <th className='tablehead'>Battery Voltage</th>
                <th className='tablehead'>Status</th>
              </tr>
            </thead>
            <tbody>
              {
                currentPageData.map(gateway => (
                  <tr key={gateway.id}>
                    {/* <td className='tablecontent'><Checkbox /></td> */}
                    <td className='tablecontent-link'>
                      <Link
                        style={{ textDecoration: 'none', cursor: 'pointer' }}
                        // to="/app/meterlist"
                        state={{ zoneId: zoneId, dmaId: dmaId, gatewayId: gateway.id }}
                        onClick={() => {
                          console.log('Link clicked for dmaId:', zoneId, dmaId, gateway.id)
                          onClickGateWay()
                        }}
                      >
                        {gateway.gatewayId}
                      </Link>
                    </td>
                    {/* <td className='tablecontent'>{gateway.gatewayId}</td>
                <td className='tablecontent'>{gateway.region}</td>
                <td className='tablecontent'>
                  <span style={{ backgroundColor: '#E3F2FD', padding: 8, paddingLeft: 20, paddingRight: 20, borderRadius: 20, color: '#1565C0' }}>
                    {gateway.subnet}
                  </span>
                </td> */}
                    {/* <td className='tablecontent'>{gateway.gateway}</td> */}
                    <td className='tablecontent'>
                      {new Date(gateway.time).toISOString().replace('T', ' ').split('.')[0]}
                    </td>

                    <td className='tablecontent text-end'>{gateway.ethState}</td>
                    <td className='tablecontent text-end'>{gateway.lteState}</td>
                    <td className='tablecontent text-end'>{gateway.temperature}</td>
                    <td className='tablecontent text-end'>{gateway.powerState}</td>
                    <td className='tablecontent text-end'>{gateway.batteryState}</td>
                    <td className='tablecontent text-end'>{gateway.batteryLevel}</td>
                    <td className='tablecontent text-end'>{gateway.batteryVoltage}</td>
                    {/* <td className='tablecontent'>{gateway.status}</td> */}
                    <td className='tablecontent'>
                      <span style={{ ...getStatusStyle(gateway.status), padding: '8px 20px' }}>
                        {gateway.status}
                      </span>
                    </td>

                  </tr>
                ))
              }


            </tbody>
          </Table>
        )
        }
      </div>

      <div className='row mt-3'>
        <div className='col-md-4'>
          <div className='pagination-controls' style={{ marginTop: '10px', marginLeft: '10PX' }}>
            <label htmlFor='itemsPerPage' style={{ fontWeight: '500', color: 'black', fontSize: '18px' }}>Items per page:</label><nsbp /><nsbp />
            <select id='itemsPerPage' value={itemsPerPage} onChange={handleItemsPerPageChange} style={{ marginLeft: '8px' }}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>
        <div className='col-md-4'></div>
        <div className='col-md-4'>
          <div >

            <Paginations
              currentPage={currentPage}
              totalPages={pageCount}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
      >
        <Row style={{ padding: '0px', margin: 0, background: '#F4F5F5' }}>
          <Row style={{ padding: '0px', margin: 0, backgroundColor: '#000' }}>
            <Col md={10} sm={12} xs={10}>
              <DialogTitle style={{ color: '#fff' }} sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Gateway Details
              </DialogTitle>
            </Col>
            <Col md={1} sm={1} xs={1}>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            </Col>
          </Row>
          <Row style={{ padding: 15, justifyContent: "end", display: "flex" }}>
            <Col md={3} xs={12} sm={12} style={{ width: "144px", justifyContent: "end", display: "flex" }}>
              <Button style={{ backgroundColor: '#1976D2', color: '#fff' }}>
                <CachedOutlined style={{ marginRight: 5 }} /> Refresh
              </Button>
            </Col>
            <Col md={2} xs={12} sm={12} style={{ marginLeft: -10 }}>
              <Button style={{ backgroundColor: '#fff', color: '#1976D2', border: '1px solid #1976D2' }}>
                <FileUploadOutlined style={{ marginRight: 5 }} /> Export
              </Button>
            </Col>
          </Row>
          <Row>
            <Card style={{ margin: 0, padding: '16px', borderRadius: 8, marginBottom: 24, marginRight: 16, marginLeft: 16 }}>
              <div style={{ fontFamily: 'inter', fontWeight: 600, fontSize: '18px', color: '#212121', marginBottom: 16 }}>Basic Details</div>
              <Row>
                <Col md={6} xs={12} sm={12}>
                  <Row>
                    <Col md={6} xs={6} sm={6}>
                      <div className='meterdetails-list'>id:</div>
                      <div className='meterdetails-list'>Type:</div>
                      <div className='meterdetails-list'>Subnet:</div>
                      <div className='meterdetails-list'>Ceacon:</div>
                      <div className='meterdetails-list'>Transmitting Power:</div>
                      <div className='meterdetails-list'>Created Time:</div>
                    </Col>
                    <Col md={6} xs={6} sm={6}>
                      <div className='meterdetails-list1'>{basicDetails.id}</div>
                      <div className='meterdetails-list1'>{basicDetails.type}</div>
                      <div className='meterdetails-list1'>{basicDetails.subnet}</div>
                      <div className='inter400red meterdetails-list1'>{basicDetails.ceacon}</div>
                      <div className='inter400yellow meterdetails-list1'>{basicDetails.transmittingPower}</div>
                      <div className='meterdetails-list1'>{basicDetails.createdTime}</div>
                    </Col>
                  </Row>
                </Col>
                <Col md={6} xs={12} sm={12}>
                  <Row>
                    <Col md={6} xs={6} sm={6}>
                      <div className='meterdetails-list'>Name:</div>
                      <div className='meterdetails-list'>Region:</div>
                      <div className='meterdetails-list'>Beacon:</div>
                      <div className='meterdetails-list'>GDTP:</div>
                      <div className='meterdetails-list'>HTTP:</div>
                      <div className='meterdetails-list'>Remarks:</div>
                    </Col>
                    <Col md={6} xs={6} sm={6}>
                      <div className='meterdetails-list1'>{basicDetails.name}</div>
                      <div className='meterdetails-list1'>{basicDetails.region}</div>
                      <div className='inter400red meterdetails-list1'>{basicDetails.beacon}</div>
                      <div className='inter400yellow meterdetails-list1'>{basicDetails.gdtp}</div>
                      <div className='meterdetails-list1'>{basicDetails.http}</div>
                      <div className='inter400yellow meterdetails-list1'>{basicDetails.remarks}</div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Row>
          <Row>
            <Card style={{ margin: 0, padding: '16px', borderRadius: 8, marginBottom: 24, marginRight: 16, marginLeft: 16 }}>
              <div style={{ fontFamily: 'inter', fontWeight: 600, fontSize: '18px', color: '#212121', marginBottom: 16 }}>Last Frame Data</div>
              <Row>
                <Col md={6} xs={12} sm={12}>
                  <Row>
                    <Col md={6} xs={6} sm={6}>
                      <div className='meterdetails-list'>Transmission Time:</div>
                      <div className='meterdetails-list'>Device Type:</div>
                      <div className='meterdetails-list'>Tx Power:</div>
                      <div className='meterdetails-list'>Device ID:</div>
                    </Col>
                    <Col md={6} xs={6} sm={6}>
                      <div className='meterdetails-list1'>{lastFrameData.transmissionTime}</div>
                      <div className='meterdetails-list1'>{lastFrameData.deviceType}</div>
                      <div className='meterdetails-list1'>{lastFrameData.txPower}</div>
                      <div className='meterdetails-list1'>{lastFrameData.deviceId}</div>
                    </Col>
                  </Row>
                </Col>
                <Col md={6} xs={12} sm={12}>
                  <Row>
                    <Col md={5} xs={6} sm={6}>
                      <div className='meterdetails-list'>Temperature:</div>
                      <div className='meterdetails-list'>Latitude:</div>
                      <div className='meterdetails-list'>Humidity:</div>
                      <div className='meterdetails-list'>Longitude:</div>
                    </Col>
                    <Col md={7} xs={6} sm={6}>
                      <div className='meterdetails-list1'>{lastFrameData.temperature}</div>
                      <div className='meterdetails-list1'>{lastFrameData.latitude}</div>
                      <div className='meterdetails-list1'>{lastFrameData.humidity}</div>
                      <div className='meterdetails-list1'>{lastFrameData.longitude}</div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Row>
        </Row>
      </BootstrapDialog>
    </div>
  );
};

export default GatewayTable;
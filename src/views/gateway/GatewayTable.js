import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Card, Checkbox, Link } from '@mui/material';
import { Col, Row } from 'react-bootstrap';
import { CachedOutlined, FileUploadOutlined } from '@mui/icons-material';
import Table from 'react-bootstrap/Table';
// import Paginations from '../../components/Paginatons';
import { BASE_API_URL1 } from '../../config/constant';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const GatewayTable = () => {
  const [open, setOpen] = useState(false);
  const [fullWidth] = useState(true);
  const [gateways, setGateways] = useState([]);
  const [basicDetails, setBasicDetails] = useState({});
  const [lastFrameData, setLastFrameData] = useState({});

  const handleClickOpen = (Id) => {
    getGatewayDetails(Id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getAllGateways();
  }, []);

  const getAllGateways = async () => {
    try {
      const response = await axios.post(`${BASE_API_URL1}gateways/getAllGatewaysWithClientId`, { clientId: 1 });
      if (response.data && response.data.gatewayDetails) {
        setGateways(response.data.gatewayDetails);
      }
    } catch (e) {
      console.error('Error fetching gateways:', e);
    }
  };

  const getGatewayDetails = async (Id) => {
    try {
      const response = await axios.post(`${BASE_API_URL1}gateways/getGatewayDetailsWithClientIdAndGatewayId`, {
        clientId: 1,
        gatewayId: Id
      });
      if (response.data) {
        const { basicDetails, lastFrameData } = response.data;
        setBasicDetails(basicDetails);
        setLastFrameData(lastFrameData);
      }
    } catch (e) {
      console.error('Error fetching gateway details:', e);
    }
  };


  return (
    <>
    <div className='customer-table'>
      <Table style={{ borderRadius: 8 }}>
        <thead style={{ backgroundColor: '#F4F5F5' }}>
          <tr>
            <th className='tablehead'><Checkbox /></th>
            <th className='tablehead'>Gateway ID</th>
            <th className='tablehead'>Gateway Name</th>
            <th className='tablehead'>Region</th>
            <th className='tablehead'>Subnet</th>
            <th className='tablehead'>Gateway</th>
            <th className='tablehead'>Online Status</th>
            <th className='tablehead'>Connection</th>
            <th className='tablehead'>Creator</th>
            <th className='tablehead'>Last Stats Seen</th>
            <th className='tablehead'>Tag</th>
            <th className='tablehead'>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {gateways.map(gateway => (
            <tr key={gateway.Id}>
              <td className='tablecontent'><Checkbox /></td>
              <td className='tablecontent'>
                <Link
                  style={{ textDecoration: 'none', cursor: 'pointer', color: '#212121' }}
                  onClick={() => handleClickOpen(gateway.Id)}
                >
                  {gateway.gatewayId}
                </Link>
              </td>
              <td className='tablecontent'>{gateway.gatewayName}</td>
              <td className='tablecontent'>{gateway.region}</td>
              <td className='tablecontent'>
                <span style={{ backgroundColor: '#E3F2FD', padding: 8, paddingLeft: 20, paddingRight: 20, borderRadius: 20, color: '#1565C0' }}>
                  {gateway.subnet }
                </span>
              </td>
              <td className='tablecontent'>{gateway.gateway}</td>
              <td className='tablecontent'>
                <span style={{ backgroundColor: gateway.onlineStatus === 'Active' ? 'rgba(47, 182, 23, 1)' : 'rgba(255, 0, 0, 1)', padding: 8, paddingLeft: 20, paddingRight: 20, color: '#fff' }}>
                  {gateway.onlineStatus  || 'N/A'}
                </span>
              </td>
              <td className='tablecontent'>{gateway.connection}</td>
              <td className='tablecontent'>{gateway.creator}</td>
              <td className='tablecontent'>{gateway.lastStatsSeen}</td>
              <td className='tablecontent'>{gateway.tag}</td>
              <td className='tablecontent'>{gateway.remarks}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          fullWidth={fullWidth}
        >
        <Row style={{padding:'0px',margin:0, background:'#F4F5F5'}}>
          <Row style={{padding:'0px',margin:0, backgroundColor: '#000' }}>
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
          <Card style={{ margin: 0, padding: '16px', borderRadius: 8, marginBottom:24, marginRight:16, marginLeft:16}}>
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
                    <div className='meterdetails-list1'>{basicDetails.beacon}</div>
                    <div className='inter400blue meterdetails-list1'>{basicDetails.gdtp}</div>
                    <div className='meterdetails-list'>{basicDetails.http}</div>
                    <div className='meterdetails-list'>{basicDetails.remarks}</div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
          </Row>
          <Row>
            <Card style={{ margin: 0, padding: '16px', borderRadius: 8, marginBottom:24, marginRight:16, marginLeft:16}}>
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
      
      
      {/* <Paginations /> */}
    </div>
    
      </>
  );
};

export default GatewayTable;

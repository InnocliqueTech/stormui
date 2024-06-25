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
        <Row style={{ backgroundColor: '#000' }}>
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
        <Card style={{ margin: 10, padding: 30, paddingTop: 10 }}>
          <div style={{ fontFamily: 'inter', fontWeight: 600, fontSize: '18px' }}>Basic Details</div>
          <Row>
            <Col md={6} xs={12} sm={12}>
              <Row>
                <Col md={5} xs={6} sm={6}>
                  <div className='inter600'>id:</div>
                  <div className='inter600'>Type:</div>
                  <div className='inter600'>Subnet:</div>
                  <div className='inter600 marginTop'>Ceacon:</div>
                  <div className='inter600 marginTop'>Transmitting Power:</div>
                  <div className='inter600'>Created Time:</div>
                </Col>
                <Col md={7} xs={6} sm={6}>
                  <div className='inter400black'>{basicDetails.id}</div>
                  <div className='inter400black'>{basicDetails.type}</div>
                  <div className='inter400black'>{basicDetails.subnet}</div>
                  <div className='inter400red'>{basicDetails.ceacon}</div>
                  <div className='inter400yellow'>{basicDetails.transmittingPower}</div>
                  <div className='inter400black'>{basicDetails.createdTime}</div>
                </Col>
              </Row>
            </Col>
            <Col md={6} xs={12} sm={12}>
              <Row>
                <Col md={5} xs={6} sm={6}>
                  <div className='inter600'>Name:</div>
                  <div className='inter600'>Region:</div>
                  <div className='inter600 marginTop'>Beacon:</div>
                  <div className='inter600 marginTop'>GDTP:</div>
                  <div className='inter600'>HTTP:</div>
                  <div className='inter600'>Remarks:</div>
                </Col>
                <Col md={7} xs={6} sm={6}>
                  <div className='inter400black'>{basicDetails.name}</div>
                  <div className='inter400black'>{basicDetails.region}</div>
                  <div className='inter400green'>{basicDetails.beacon}</div>
                  <div className='inter400blue'>{basicDetails.gdtp}</div>
                  <div className='inter400black'>{basicDetails.http}</div>
                  <div className='inter400black'>{basicDetails.remarks}</div>
                </Col>
              </Row>
            </Col>
          </Row>
          <div style={{ fontFamily: 'inter', fontWeight: 600, fontSize: '18px' }}>Last Frame Data</div>
          <Row>
            <Col md={6} xs={12} sm={12}>
              <Row>
                <Col md={5} xs={6} sm={6}>
                  <div className='inter600'>Transmission Time:</div>
                  <div className='inter600'>Device Type:</div>
                  <div className='inter600'>Tx Power:</div>
                  <div className='inter600'>Device ID:</div>
                </Col>
                <Col md={7} xs={6} sm={6}>
                  <div className='inter400black'>{lastFrameData.transmissionTime}</div>
                  <div className='inter400black'>{lastFrameData.deviceType}</div>
                  <div className='inter400black'>{lastFrameData.txPower}</div>
                  <div className='inter400black'>{lastFrameData.deviceId}</div>
                </Col>
              </Row>
            </Col>
            <Col md={6} xs={12} sm={12}>
              <Row>
                <Col md={5} xs={6} sm={6}>
                  <div className='inter600'>Temperature:</div>
                  <div className='inter600'>Latitude:</div>
                  <div className='inter600'>Humidity:</div>
                  <div className='inter600'>Longitude:</div>
                </Col>
                <Col md={7} xs={6} sm={6}>
                  <div className='inter400black'>{lastFrameData.temperature}</div>
                  <div className='inter400black'>{lastFrameData.latitude}</div>
                  <div className='inter400black'>{lastFrameData.humidity}</div>
                  <div className='inter400black'>{lastFrameData.longitude}</div>
                </Col>
              </Row>
            </Col>
          </Row>1
        </Card>
      </BootstrapDialog>
      {/* <Paginations /> */}
    </div>
    
      </>
  );
};

export default GatewayTable;

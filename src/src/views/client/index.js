import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Image } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import Overflow from '../dashboard/Overflow';
import axios from 'axios';
import { BASE_API_URL } from '../../config/constant';
import "../dashboard/dashboard.scss";
import Alert from '../dashboard/Alert';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CustomPieChart from '../dashboard/CustomPieChart';
import customer from '../../assets/images/customer.svg';
import zone from '../../assets/images/zone.svg';
import refresh from '../../assets/images/refresh.svg';
import download from '../../assets/images/download.svg';
import info from "../../assets/images/info.svg"
import CustomerTable from './CustomerTable';
import ClientZone from './ClientZone';
import ClientDma from './ClientDma';
import {  Link } from '@mui/material';
import DmaTable from './dmatable';
import ZoneTable from './Zonetable';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const Client = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [alertData, setAlertData] = useState({});
  const [outFlowData, setOutFlowData] = useState({});
  useEffect(() => {
    getDashboardData();
  }, [])
  const getDashboardData = async () => {
    try {
      const response = await axios.post(BASE_API_URL + "/getTotalDashboards");
      setDashboardData(response.data)
      const aData = await axios.post(BASE_API_URL + "/getAlerts");
      setAlertData(aData.data);
      const flowData = await axios.post(BASE_API_URL + "/getTotalOutFlow");
      setOutFlowData(flowData.data);
      console.log(flowData);
    }
    catch (e) {
      console.log(e)
    }
  }
  const [open, setOpen] = React.useState(false);
  const [opendma, setOpendma] = React.useState(false);
  const [fullWidth] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handledmaClickOpen = () => {
    setOpendma(true);
  };
  const handledmaClose = () => {
    setOpendma(false);
  };
  return (
    <React.Fragment>
      <Row>
        <Col md={6} xl={4} sm={12}>
          <Card className="card-social">
            <Card.Body>
              <CustomPieChart name="Gateways" data={dashboardData.totalZone} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={4} sm={12}>
        <Link style={{cursor:'pointer' , textDecoration:'none'}} onClick={handledmaClickOpen}>
          <Card className="card-social">
            <Card.Body>
              <ClientZone data={dashboardData.totalDma} />
            </Card.Body>
          </Card>
          </Link>
        </Col>
        <Col md={6} xl={4} sm={12}>
          <Link style={{cursor:'pointer' , textDecoration:'none'}} onClick={handleClickOpen}>
          <Card className="card-social">
            <Card.Body className="border-bottom">
              <ClientDma data={dashboardData.totalMeters} />
            </Card.Body>
          </Card>
          </Link>
        </Col>
        <Col md={6} xl={5}>
          <Alert data={alertData} />

        </Col>
        <Col md={6} xl={7}>
          <Card className="user-list">
            <Card.Body className="p-0">
              <div className="row">
                <div className="col-md-12">
                  <Overflow data={outFlowData} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

     <Card style={{padding:10, paddingTop:20, borderRadius:8}}>
     <Row>
        <Col md={9} sm={7} xs={7}>
          <span style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>
            <span className='iconContainergreen'>
              <Image src={customer} alt="customer" className='icon' />
            </span> Customer Segmentation </span><span><Image src={info} alt="info" className='icon' /></span>
          <span style={{ textAlign: 'end' }}></span>
        </Col>
        <Col md={3} sm={5} xs={5} style={{ textAlign: 'end' }}>
          <span style={{marginRight:20}}><Image src={refresh} alt="refresh" className='icon' /></span>
          <span><Image src={download} alt="download" className='icon' /></span>
        </Col>
      </Row>
      <CustomerTable />
     </Card>

      <Card style={{padding:10, paddingTop:20, borderRadius:8}}>
      <Row>
        <Col md={9} sm={7} xs={7}>
          <span style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>
            <span className='iconContainer'>
              <Image src={zone} alt="zone" className='icon' />
            </span> Zone Segmentation </span><span><Image src={info} alt="gateway" /></span>
          <span style={{ textAlign: 'end' }}></span>
        </Col>
        <Col md={3} sm={5} xs={5} style={{ textAlign: 'end' }}>
          <span style={{marginRight:20}}><Image src={refresh} alt="refresh" className='icon' /></span>
          <span><Image src={download} alt="download" className='icon' /></span>
        </Col>
      </Row>
      <CustomerTable />
      </Card>


      {/* ------------------------Dma--------------------------------------- */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={fullWidth}
        className='clientpopup'
      >

        <Row container style={{ backgroundColor: '#000' }}>
          <Col md={10} sm={12} xs={10}>
            <DialogTitle style={{ color: '#fff' }} sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Consumption Details
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
        <DmaTable />
      </BootstrapDialog>

      {/* ------------------------zone--------------------------------------- */}
      <BootstrapDialog
        onClose={handledmaClose}
        aria-labelledby="customized-dialog-title"
        open={opendma}
        fullWidth={fullWidth}
      >

        <Row container style={{ backgroundColor: '#000' }}>
          <Col md={10} sm={12} xs={10}>
            <DialogTitle style={{ color: '#fff' }} sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Consumption Details
            </DialogTitle>
          </Col>
          <Col md={1} sm={1} xs={1}>
            <IconButton
              aria-label="close"
              onClick={handledmaClose}
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
        <ZoneTable />
      </BootstrapDialog>
      
    </React.Fragment>
  );
};

export default Client;

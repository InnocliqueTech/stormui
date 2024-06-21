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
// import CustomPieChart from '../dashboard/CustomPieChart';
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
import Totalcounsumption from '../../src/views/dashboard/Totalcounsumption';
import over from '../../assets/images/symbols_water.svg';
import UpArrow from '../../assets/images/UpArrow.png';
import DownArrow from '../../assets/images/DownArrow.png'


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
        <Col md={6} xl={6} sm={12}>
          <Card className="card-social">
            <Card.Body>
              <Col md={8} sm={8} xs={8} className='d-flex'>
            <Col md={1} sm={1} xs={1} className='iconContainer' style={{ backgroundColor: '#F6C574' }}>
          <Image src={over} alt="over" className='icon' />
        </Col>
                <div className="alerttext ms-2">
                  Total Out flow{' '}
                  <span>
                  </span>{' '}
                </div>
              </Col>
              <Row>
                <Col md={4} sm={1} xs={1}>
                  <div className='client-flow' style={{marginTop:'40px'}}>
                      <div className='client-flow-box' style={{marginBottom:'32px'}}>
                        <div className='d-flex mb-3'>
                          <div className='client-flow-orange me-2'></div>
                          <h4 style={{fontSize:14,color:'#495057', fontWeight:'600'}}>In Flow</h4>
                        </div>
                        <h2 style={{fontSize:24, fontWeight:700, marginBottom:'16px'}}>5603.4</h2>
                        <div className='client-flow-stock d-flex'>
                          <div style={{width:32, height:23, borderRadius:4, background:'#DEF7E4', color:'#25A244', textAlign:'center', marginRight:'10px'}}>7%</div>
                          <img src={UpArrow} style={{width:'12px', height:'15px', marginRight:'10px', marginTop:'3px'}}  alt="uparrow" />
                          <span  style={{fontSize:12, paddingTop:'3px'}}>last week</span>
                        </div>
                      </div>
                      <div className='client-flow-box'>
                        <div className='d-flex mb-3'>
                          <div className='client-flow-orange client-flow-blue me-2'></div>
                          <h4 style={{fontSize:14,color:'#495057', fontWeight:'600'}}>Consumption</h4>
                        </div>
                        <h2 style={{fontSize:24, fontWeight:700, marginBottom:'16px'}}>5203.4</h2>
                        <div className='client-flow-stock d-flex'>
                          <div style={{width:32, height:23, borderRadius:4, background:'#FFE8EC', color:'#DE092F', textAlign:'center', marginRight:'10px'}}>7%</div>
                          <img src={DownArrow} style={{width:'12px', height:'15px', marginRight:'10px', marginTop:'3px'}}  alt="uparrow" />
                          <span  style={{fontSize:12, paddingTop:'3px'}}>last week</span>
                        </div>
                      </div>
                  </div>
                </Col>
                <Col md={8} sm={8} xs={1} >
                  <Totalcounsumption data={outFlowData} />
                </Col>
              </Row>
              
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={3} sm={12}>
        <Link style={{cursor:'pointer' , textDecoration:'none'}} onClick={handledmaClickOpen}>
          <Card className="card-social">
            <Card.Body>
              <ClientZone data={dashboardData.totalDma} />
            </Card.Body>
          </Card>
          </Link>
        </Col>
        <Col md={6} xl={3} sm={12}>
          <Link style={{cursor:'pointer' , textDecoration:'none'}} onClick={handleClickOpen}>
          <Card className="card-social">
            <Card.Body className="" >
              <ClientDma data={dashboardData.totalMeters} />
            </Card.Body>
          </Card>
          </Link>
        </Col>
        <Col md={6} xl={5}>
          <Alert data={alertData} />
        </Col>
        <Col md={6} xl={7}>
          <Card className="card-social">
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

      <Card className='client-customer'>
        <Row>
          <Col md={9} sm={7} xs={7} className='d-flex'>
            <span style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }} className='d-flex align-items-center'>
              <span className='iconContainergreen p-0 d-flex align-items-center justify-content-center me-2' style={{ width: "48px", height: '48px' }}>
                <Image src={customer} alt="customer" className='icon' />
              </span> Consumption By Zone </span><span style={{ padding: '13px' }}><Image src={info} alt="info" className='icon' /></span>
            <span className='d-flex' style={{ textAlign: 'end' }}></span>
          </Col>
          <Col md={3} sm={5} xs={5} style={{ textAlign: 'end' }}>
            <span style={{ marginRight: 20 }}><Image src={refresh} alt="refresh" className='icon' /></span>
            <span><Image src={download} alt="download" className='icon' /></span>
          </Col>
        </Row>

          <div className='client-zone-table mt-4'>
            <table className="table">
              <thead>
                <tr>
                  <td style={{textAlign:'left'}}>Zones</td>
                  <td>Day1</td>
                  <td>Day2</td>
                  <td>Day3</td>
                  <td>Day4</td>
                  <td>Day5</td>
                  <td>Day6</td>
                  <td>Day7</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Zone 1</th>
                  <td className='bg-blue3'>100%</td>
                  <td className='bg-blue1'>27%</td>
                  <td className='bg-blue1'>18%</td>
                  <td className='bg-blue3'>100%</td>
                  <td className='bg-blue3'>100%</td>
                  <td className='bg-blue2'>69%</td>
                  <td className='bg-blue2'>73%</td>
                </tr>
                <tr>
                  <th>Zone 2</th>
                  <td className='bg-blue3'>58%</td>
                  <td className='bg-blue3'>68%</td>
                  <td className='bg-blue2'>34%</td>
                  <td className='bg-blue4'>123%</td>
                  <td className='bg-blue3'>88%</td>
                  <td className='bg-blue3'>100%</td>
                  <td className='bg-blue1'>29%</td>
                </tr>
                <tr>
                  <th>Zone 3</th>
                  <td className='bg-blue4'>123%</td>
                  <td className='bg-blue3'>100%</td>
                  <td className='bg-blue5'>54%</td>
                  <td className='bg-blue3'>100%</td>
                  <td className='bg-blue3'>77%</td>
                  <td className='bg-blue3'>100%</td>
                  <td className='bg-blue5'>64%</td>
                </tr>
                <tr>
                  <th>Zone 4</th>
                  <td className='bg-blue3'>100%</td>
                  <td className='bg-blue3'>100%</td>
                  <td className='bg-blue1'>25%</td>
                  <td className='bg-blue3'>100%</td>
                  <td className='bg-blue5'>100%</td>
                  <td className='bg-blue2'>38%</td>
                  <td className='bg-blue3'>100%</td>
                </tr>
                <tr>
                  <th>Zone 5</th>
                  <td className='bg-blue1'>48%</td>
                  <td className='bg-blue2'>20%</td>
                  <td className='bg-blue5'>100%</td>
                  <td className='bg-blue5'>56%</td>
                  <td className='bg-blue5'>89%</td>
                  <td className='bg-blue5'>100%</td>
                  <td className='bg-blue5'>100%</td>
                </tr>
                <tr>
                  <th>Zone 6</th>
                  <td className='bg-blue1'>42%</td>
                  <td className='bg-blue4'>123%</td>
                  <td className='bg-blue1'>38%</td>
                  <td className='bg-blue3'>100%</td>
                  <td className='bg-blue1'>43%</td>
                  <td className='bg-blue5'>100%</td>
                  <td className='bg-blue5'>100%</td>
                </tr>
                <tr>
                  <th>Zone 7</th>
                  <td className='bg-blue1'>28%</td>
                  <td className='bg-blue1'>38%</td>
                  <td className='bg-blue1'>38%</td>
                  <td className='bg-blue3'>100%</td>
                  <td className='bg-blue5'>87%</td>
                  <td className='bg-blue4'>123%</td>
                  <td className='bg-blue1'>43%</td>
                </tr>
                <tr>
                  <th>Zone 8</th>
                  <td className='bg-blue1'>38%</td>
                  <td className='bg-blue1'>24%</td>
                  <td className='bg-blue5'>100%</td>
                  <td className='bg-blue3'>100%</td>
                  <td className='bg-blue5'>72%</td>
                  <td className='bg-blue1'>46%</td>
                  <td className='bg-blue4'>123%</td>
                </tr>

                <tr>
                  <td colSpan={7} style={{textAlign:'left'}}>Show more</td>
                </tr>

                <tr>
                  <th>Average/Total</th>
                  <td className='bg-blue1'>38%</td>
                  <td className='bg-blue1'>24%</td>
                  <td className='bg-blue5'>100%</td>
                  <td className='bg-blue5'>100%</td>
                  <td className='bg-blue5'>72%</td>
                  <td className='bg-blue1'>46%</td>
                  <td className='bg-blue4'>123%</td>
                </tr>

              </tbody>
            </table>
          </div>


      </Card>

     <Card className='client-customer'>
     <Row>
        <Col md={9} sm={7} xs={7} className='d-flex'> 
          <span style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }} className='d-flex align-items-center'>
            <span className='iconContainergreen p-0 d-flex align-items-center justify-content-center me-2' style={{width:"48px", height:'48px'}}>
              <Image src={customer} alt="customer" className='icon' />
            </span> Customer Segmentation </span><span style={{padding:'13px'}}><Image src={info} alt="info" className='icon' /></span>
          <span className='d-flex' style={{ textAlign: 'end' }}></span>
        </Col>
        <Col md={3} sm={5} xs={5} style={{ textAlign: 'end' }}>
          <span style={{marginRight:20}}><Image src={refresh} alt="refresh" className='icon' /></span>
          <span><Image src={download} alt="download" className='icon' /></span>
        </Col>
      </Row>
      <CustomerTable />
     </Card>

      <Card className='client-customer'>
        <Row>
          <Col md={9} sm={7} xs={7} className='d-flex'>
            <span style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }} className='d-flex align-items-center'>
              <span className='iconContainer p-0 d-flex align-items-center justify-content-center me-2' style={{width:"48px", height:'48px'}}>
                <Image src={zone} alt="zone" className='icon' />
              </span> Zone Segmentation </span><span style={{padding:'13px'}}><Image src={info} alt="gateway" /></span>
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

<Row container >
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

<Card className='client-customer'>
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
    </Card>
        
      </BootstrapDialog>
      
    </React.Fragment>
  );
};

export default Client;

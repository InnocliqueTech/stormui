import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Image } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import TotalDma from '../dashboard/TotalDma';
import TotalMeters from '../dashboard/TotalMeters';
import axios from 'axios';
import { BASE_API_URL, BASE_API_URL1 } from '../../config/constant';
import "../dashboard/dashboard.scss";
import Alert from '../dashboard/Alert';
import CustomPieChart from '../dashboard/CustomPieChart';
import fluent from '../../assets/images/fluent_water.svg';
import { Download, Refresh, ReportProblemOutlined } from '@mui/icons-material';
import GatewayTable from './GatewayTable';
import DMAFlowChart from '../dashboard/DmaFlowChart';


const Gateway = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [alertData, setAlertData] = useState({});
  const [outFlowData, setOutFlowData] = useState({});
  useEffect(()=>{
    getDashboardData();
  }, [])
  const getDashboardData = async() => {
    try {
      const response = await axios.post(BASE_API_URL1 + "dashboard/getAllDashboardValues", {
        clientId: 1
      });
      setDashboardData(response.data)
      const aData = await axios.post(BASE_API_URL + "/getAlerts");
      setAlertData(aData.data);
      const flowData = await axios.post(BASE_API_URL + "/getTotalOutFlow");
      setOutFlowData(flowData.data);
      console.log(flowData);
    }
    catch(e){
      console.log(e)
    }
  }
  return (
    <React.Fragment>
      <Row>
        <Col md={6} xl={4} sm={12}>
          <Card className="card-social">
            <Card.Body className="">
              <CustomPieChart name="Gateways" data={dashboardData.totalZone} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={4} sm={12}>
          <Card className="card-social">
            <Card.Body className="">
              <TotalDma data={dashboardData.totalDma} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={4} sm={12}>
          <Card className="card-social">
            <Card.Body className="">
              <TotalMeters data={dashboardData.totalMeters} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={5}>
          <Alert data={alertData} />
          
        </Col>
        <Col md={6} xl={7}>
          <Card className="card-social">
            <Card.Body className="p-0">
              <div className="row">
                <div className="col-md-12">
                  <DMAFlowChart data={outFlowData} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Card className='client-customer'>
      <Row>
            <Col md={9} sm={7} xs={7} className='d-flex'>
                <span style={{ fontSize: 20, fontWeight: 'bold', color:'rgba(33, 33, 33, 1)' }} className='d-flex align-items-center'>
                    <span className='iconContainer  p-0 d-flex align-items-center justify-content-center me-2' style={{width:"48px", height:'48px'}}> 
                    <Image src={fluent} alt="fluent" className='icon' style={{ color: '#95ACFF' }} />
                    </span> Gateway List </span>
                    <span style={{ textAlign: 'end' }}></span>
            </Col>
            <Col md={3} sm={5} xs={5} className='d-flex align-items-center justify-content-end' style={{ textAlign:'end' }}>
            <Refresh style={{marginRight:10, color:'#000'}} />
          <Download  style={{marginRight:5, color:'#000'}}/>
          <span style={{backgroundColor:'#FEF0F4', color:'#DE315E', padding:'10px 15px',borderRadius:'8px',alignItems:'center',display:'flex'}}>5 &nbsp; <ReportProblemOutlined  style={{height:20, width:20}}/></span>
            </Col>
        </Row>
      <GatewayTable />
      </Card>
      
    </React.Fragment>
  );
};

export default Gateway;

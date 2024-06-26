import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Image } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import TotalDma from '../dashboard/TotalDma';
import TotalMeters from '../dashboard/TotalMeters';
import Overflow from '../dashboard/Overflow';
import axios from 'axios';
import { BASE_API_URL } from '../../config/constant';
import "../dashboard/dashboard.scss";
import Alert from '../dashboard/Alert';
import CustomPieChart from '../dashboard/CustomPieChart';
import fluent from '../../assets/images/fluent_water.svg';
import { Download, Refresh, ReportProblemOutlined } from '@mui/icons-material';
import GatewayTable from './GatewayTable';


const Gateway = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [alertData, setAlertData] = useState({});
  const [outFlowData, setOutFlowData] = useState({});
  useEffect(()=>{
    getDashboardData();
  }, [])
  const getDashboardData = async() => {
    try {
      const response = await axios.post(BASE_API_URL + "/getTotalDashboards");
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
            <Card.Body className="border-bottom">
              <CustomPieChart name="Gateways" data={dashboardData.totalZone} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={4} sm={12}>
          <Card className="card-social">
            <Card.Body className="border-bottom">
              <TotalDma data={dashboardData.totalDma} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={4} sm={12}>
          <Card className="card-social">
            <Card.Body className="border-bottom">
              <TotalMeters data={dashboardData.totalMeters} />
            </Card.Body>
          </Card>
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
        
      <Card style={{padding:10, paddingTop:40, borderRadius:10}}>
      <Row>
            <Col md={9} sm={7} xs={7}>
                <span style={{ fontSize: 20, fontWeight: 'bold', color:'rgba(33, 33, 33, 1)' }}>
                    <span className='iconContainer'> 
                    <Image src={fluent} alt="fluent" className='icon' style={{ color: '#95ACFF' }} />
                    </span> Gateway List </span>
                    <span style={{ textAlign: 'end' }}></span>
            </Col>
            <Col md={3} sm={5} xs={5} style={{ textAlign:'end' }}>
            <Refresh style={{marginRight:10, color:'#000'}} />
          <Download  style={{marginRight:5, color:'#000'}}/>
          <span style={{backgroundColor:'#FEF0F4', color:'#DE315E', padding:10}}>5 <ReportProblemOutlined  style={{height:20, width:20}}/></span>
            </Col>
        </Row>
      <GatewayTable />
      </Card>
      </Row>
      
    </React.Fragment>
  );
};

export default Gateway;

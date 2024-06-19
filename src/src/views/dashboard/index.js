import React, { useEffect, useState } from 'react';
import { Row, Col, Card} from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import CustomPieChart from './CustomPieChart';
import TotalDma from './TotalDma';
import TotalMeters from './TotalMeters';
import Overflow from './Overflow';
import axios from 'axios';
import { BASE_API_URL } from '../../config/constant';
import "./dashboard.scss";
import Alert from './Alert';


const DashDefault = () => {
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
              <CustomPieChart name="Zones" data={dashboardData.totalZone} />
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
      </Row>
    </React.Fragment>
  );
};

export default DashDefault;

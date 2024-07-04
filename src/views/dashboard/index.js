import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import CustomPieChart from './CustomPieChart';
import TotalDma from './TotalDma';
import TotalMeters from './TotalMeters';
import Overflow from './Overflow';
import axios from 'axios';
import {  BASE_API_URL1 } from '../../config/constant';
import "./dashboard.scss";
// import Alert from './Alert';
import { ClientsContext } from './context';
// import DMAFlowChart from './DmaFlowChart';

const DashDefault = () => {
  const [dashboardData, setDashboardData] = useState({});
  // const [alertData, setAlertData] = useState({});
  const [outFlowData, setOutFlowData] = useState({});
  const { clients, selectedClient } = useContext(ClientsContext);
console.log(clients, "the check")
  useEffect(() => {
    if (selectedClient) {
      getDashboardData();
    }
  }, [selectedClient]);

  
  const getDashboardData = async () => {
    try {
      const response = await axios.post(BASE_API_URL1 + 'dashboard/getAllDashboardValues', {
        clientId: selectedClient
      });
      const parsedData = parseDashboardData(response.data);
      setDashboardData(parsedData);

      // const aData = await axios.post(BASE_API_URL + "/getAlerts");
      // setAlertData(aData.data);

      const flowData = await axios.post(BASE_API_URL + "/getTotalOutFlow");
      setOutFlowData(flowData.data);
    } catch (e) {
      console.log(e);
    }
  }

  const parseNumber = (value) => {
    const number = Number(value);
    return isNaN(number) ? 0 : number;
  }

  const parseDashboardData = (data) => {
    return {
      totalZone: {
        activeZones: parseNumber(data.totalZone?.activeZones),
        inactiveZones: parseNumber(data.totalZone?.inactiveZones),
        totalCount: parseNumber(data.totalZone?.totalCount),
      },
      totalDma: {
        activeDma: parseNumber(data.totalDma?.activeDma),
        inactiveDma: parseNumber(data.totalDma?.inactiveDma),
        faultyDma: parseNumber(data.totalDma?.faultyDma),
        totalCount: parseNumber(data.totalDma?.totalCount),
      },
      totalMeters: {
        activeMeters: parseNumber(data.totalMeters?.activeMeters),
        inactiveMeters: parseNumber(data.totalMeters?.inactiveMeters),
        faultyMeters: parseNumber(data.totalMeters?.faultyMeters),
        totalCount: parseNumber(data.totalMeters?.totalCount),
      },
      totalGateway: {
        activeGateways: parseNumber(data.totalGateway?.activeGateways), 
        inactiveGateways: parseNumber(data.totalGateway?.inactiveGateways),
        totalCount: parseNumber(data.totalGateway?.totalCount),
      }
    };
  }

  return (
    <React.Fragment>
      <Row>
        <Col md={6} xl={4} sm={12}>
          <Card className="card-social">
            <Card.Body>
              <CustomPieChart name="Zones" data={dashboardData.totalZone} />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} xl={4} sm={12}>
          <Card className="card-social">
            <Card.Body>
              <TotalDma data={dashboardData.totalDma} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={4} sm={12}>
          <Card className="card-social">
            <Card.Body>
              <TotalMeters data={dashboardData.totalMeters} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={7}>
          <Card className="card-social">
            <Card.Body className="p-0">
              <Row>
                <Col md={12}>
                  <Overflow data={outFlowData} />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={5}>
              {/* <DMAFlowChart data={dashboardData.totalDma} /> */}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default DashDefault;

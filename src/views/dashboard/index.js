import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import CustomPieChart from './CustomPieChart';
import TotalDma from './TotalDma';
import TotalMeters from './TotalMeters';
import Overflow from './Overflow';
import axios from 'axios';
import { BASE_API_URL1 } from '../../config/constant';
import './dashboard.scss';
// import Alert from './Alert';
import { ClientsContext } from './context';
import { useStateContext } from '../../contexts/MainContext';
import DMAFlowChart from './DmaFlowChart';
import { useNavigate } from 'react-router';
// import DMAFlowChart from './DmaFlowChart';

const DashDefault = () => {
  const navigate = useNavigate()

  const { presentDate, toDate } = useStateContext();
  const [dashboardData, setDashboardData] = useState({});
  // const [alertData, setAlertData] = useState({});
  const [outFlowData, setOutFlowData] = useState({});
  // const { clients, selectedClient } = useContext(ClientsContext);
  const { clients, selectedClient, selectedZone } = useContext(ClientsContext);

  console.log(clients, 'the check');
  useEffect(() => {
    if (selectedClient) {
      getDashboardData();
    }
  }, [selectedClient, selectedZone, presentDate, toDate]);



  // Function to fetch and process dashboard data
  const getDashboardData = async () => {
    try {
      // Fetching overall dashboard values based on the selected client
      const response = await axios.post(BASE_API_URL1 + 'dashboard/getAllDashboardValues', {
        clientId: selectedClient // Passing the selected client ID as part of the request body
      });

      // Parsing the retrieved dashboard data into a structured format
      const parsedData = parseDashboardData(response.data);
      setDashboardData(parsedData); // Updating state with the parsed dashboard data

      // Fetching DMA outflow data specific to the selected client and zone
      const flowData = await axios.post(BASE_API_URL1 + 'dma/getDMAOutFlowInGateWayDashBoard', {
        clientId: selectedClient, // Client ID for filtering
        zoneId: selectedZone, // Zone ID for filtering
        fromDate: presentDate, // Starting date for the data range
        toDate: toDate // Ending date for the data range
      });

      // Updating state with the DMA outflow data
      setOutFlowData(flowData.data);
    } catch (e) {
      // Logging errors in case of API failures
      console.log(e);
    }
  };


// Utility function to parse a value into a number
const parseNumber = (value) => {
  const number = Number(value); // Attempt to convert the value into a number
  return isNaN(number) ? 0 : number; // If the value is not a number (NaN), return 0; otherwise, return the number
};

// Function to parse and structure dashboard data
const parseDashboardData = (data) => {
  return {
    totalZone: {
      activeZones: parseNumber(data.totalZone?.activeZones), // Convert active zones to a number; default to 0 if not valid
      inactiveZones: parseNumber(data.totalZone?.inactiveZones), // Convert inactive zones to a number; default to 0 if not valid
      totalCount: parseNumber(data.totalZone?.totalCount) // Total count of zones; default to 0 if not valid
    },
    totalDma: {
      activeDma: parseNumber(data.totalDma?.activeDma), // Convert active DMA count to a number; default to 0 if not valid
      inactiveDma: parseNumber(data.totalDma?.inactiveDma), // Convert inactive DMA count to a number; default to 0 if not valid
      faultyDma: parseNumber(data.totalDma?.faultyDma), // Convert faulty DMA count to a number; default to 0 if not valid
      totalCount: parseNumber(data.totalDma?.totalCount) // Total DMA count; default to 0 if not valid
    },
    totalMeters: {
      activeMeters: parseNumber(data.totalMeters?.activeMeters), // Convert active meter count to a number; default to 0 if not valid
      inactiveMeters: parseNumber(data.totalMeters?.inactiveMeters), // Convert inactive meter count to a number; default to 0 if not valid
      faultyMeters: parseNumber(data.totalMeters?.faultyMeters), // Convert faulty meter count to a number; default to 0 if not valid
      totalCount: parseNumber(data.totalMeters?.totalCount) // Total meter count; default to 0 if not valid
    },
    totalGateway: {
      activeGateways: parseNumber(data.totalGateway?.activeGateways), // Convert active gateway count to a number; default to 0 if not valid
      inactiveGateways: parseNumber(data.totalGateway?.inactiveGateways), // Convert inactive gateway count to a number; default to 0 if not valid
      totalCount: parseNumber(data.totalGateway?.totalCount) // Total gateway count; default to 0 if not valid
    }
  };
};
  console.log('dashboard.totaldma', dashboardData.totalDma);
  return (
    <React.Fragment>
      <Row style={{ marginTop: "14px" }}>
        <Col md={6} xl={4} sm={12}>
          <Card className="card-social">
            <Card.Body
              onClick={() => {

                const dataToSend = { id: 1 };

                navigate("/app/client", { state: dataToSend })
              }}
              style={{ cursor: "pointer" }}


            >
              <CustomPieChart name="Zones" data={dashboardData.totalZone} />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} xl={4} sm={12}>
          <Card className="card-social">
            <Card.Body

              onClick={() => {

                const dataToSend = { id: 2 };

                navigate("/app/client", { state: dataToSend })
              }}
              style={{ cursor: "pointer" }}

            >

              <TotalDma data={dashboardData.totalDma} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={4} sm={12}>
          <Card className="card-social">
            <Card.Body
              onClick={() => {

                const dataToSend = { id: 3 };

                navigate("/app/client", { state: dataToSend })
              }}
              style={{ cursor: "pointer" }}
            >
              <TotalMeters data={dashboardData.totalMeters} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={6}>
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
        <Col md={6} xl={6}>
          <Card className="card-social">
            <Card.Body className="p-0">
              <Row>
                <Col md={12}>
                  <DMAFlowChart data={outFlowData} />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default DashDefault;

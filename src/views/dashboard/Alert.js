import React from 'react';

import { Row, Col, Card, Image } from 'react-bootstrap';
// import { format, parseISO } from 'date-fns';
import alert from '../../assets/images/alert.svg';
import meter from '../../assets/images/Meter.svg';
import gateway from '../../assets/images/Gateway.svg';
import info from '../../assets/images/i_icons.svg';
// import { FaPlus } from 'react-icons/fa';
import './dashboard.scss';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { ClientsContext } from '../dashboard/context';

const Alert = ({ data }) => {
  console.log(data.clientAlerts)
  // console.log(data.clientAlerts.Gateway)
  // const { selectedClient } = useContext(ClientsContext);
  // const [expandedIndex, setExpandedIndex] = useState(null);
  // const [alertData, setAlertData] = useState(null);
  // const [loadingIndex, setLoadingIndex] = useState(null);
  // const [error, setError] = useState('');
  // let filteredAlertData = [];

  // useEffect(() => {

  //   if (data && data.totalOutFlow) {
  //     let d = [];
  //     data.totalOutFlow.forEach((flow) => {
  //       d.push(flow.count);
  //     });
  //     setData([
  //       {
  //         name: 'Total Outflow',
  //         data: d
  //       }
  //     ]);
  //   }
  // }, [data]);

  // if (data.alerts) {
  //   filteredAlertData = data.alerts
  //     .filter((item) => item.alertName !== 'Line Leakage')
  //     .map((item) => {
  //       let newAlertName = item.alertName; // Default to the current alertName

  //       // Add your conditional logic here to assign new alert names
  //       if (item.alertName === 'Gateway Failure') {
  //         newAlertName = 'Gateway Communication Failure';
  //       } else if (item.alertName === 'Meter Theft') {
  //         newAlertName = 'Meter Communication Failure';
  //       }
  //       return {
  //         ...item,
  //         alertName: newAlertName
  //       };
  //     });
  // }

  // function formatTimestamp(timestamp) {
  //   // Parse the ISO string into a Date object
  //   const date = parseISO(timestamp);

  //   // Format the date into the desired format
  //   const formattedDate = format(date, 'yyyy-MM-dd HH:mm:ss');

  //   return formattedDate;
  // }

  // const handleIconClick = async (index) => {
  //   // debugger;
  //   if (expandedIndex === index) {
  //     setExpandedIndex(null); // Close the currently open alert
  //     setAlertData(null); // Clear the alert data when closing
  //   } else {
  //     setExpandedIndex(index); // Open the selected alert
  //     setLoadingIndex(index); // Set the loading state for the current alert

  //     try {
  //       const response = await fetch('http://49.207.11.223:3307/clients/getClientAlerts', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({ clientId: selectedClient })
  //       });

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       const contentType = response.headers.get('Content-Type');
  //       if (contentType && contentType.includes('application/json')) {
  //         const data = await response.json();
  //         setAlertData(data.clientAlerts); // Store the new alert data directly
  //         setError('');
  //       } else {
  //         throw new Error('Expected JSON response');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching client alerts:', error);
  //       setError(error.message);
  //     } finally {
  //       setLoadingIndex(null);
  //     }
  //   }
  // };


  return (
    <Card className='p-4' style={{ borderRadius: "10px" }}>
      <Row className="mb-2 justify-content-start">
        <Col md={1} sm={1} xs={1} className="alertContainer">
          <Image src={alert} alt="alert" className="alertIcon" />
        </Col>
        <Col md={3} sm={4} xs={5}>
          <div className="alerttext">
            Alert
            <span>
              <Image src={info} alt="gateway" className="infoIcon" />
            </span>{' '}
          </div>
        </Col>
        <Col md={12} className='mt-4'>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              style={{ border: "transparent", backgroundColor: "#f7f7f7" }}
            >
              <span>
                <Image src={gateway} alt="gateway" className="gateway" />
              </span>
              <span style={{ marginLeft: "10px", fontWeight: "600" }}>Gateway Communication Failure</span>

            </AccordionSummary>
            <AccordionDetails style={{ maxHeight: '100px', overflowY: 'auto', backgroundColor: "#f7f7f7" }}>
              {data && data.clientAlerts && data.clientAlerts.Gateway && data.clientAlerts.Gateway.length > 0 ?
                data.clientAlerts.Gateway.map((gWay) => (
                  <Row key={gWay.gwid}>
                    <Col md={6}>{gWay.gwid}</Col>
                    <Col md={6}>{gWay.CreatedAt}</Col>
                  </Row>
                ))

                : 'no data'}
            </AccordionDetails>
          </Accordion>
        </Col>
        <Col md={12} className='mt-3'>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              style={{ border: "transparent", backgroundColor: "#f7f7f7" }}
            >
              <span>
                <Image src={meter} alt="gateway" className="meter" />
              </span>
              <span style={{ marginLeft: "10px", fontWeight: "600" }}> Meter Communication</span>

            </AccordionSummary>
            <AccordionDetails style={{ maxHeight: '100px', overflowY: 'auto', backgroundColor: "#f7f7f7" }}>
              {data && data.clientAlerts && data.clientAlerts.Meter && data.clientAlerts.Meter.length > 0 ?
                data.clientAlerts.Meter.map((meter) => (
                  <Row key={meter.gwid}>
                    <Col md={6}>{meter.gwid}</Col>
                    <Col md={6}>{meter.CreatedAt}</Col>
                  </Row>
                ))

                : 'no data'}
            </AccordionDetails>
          </Accordion>
        </Col>


      </Row>
      <div style={{ display: "flex", justifyContent: "center", gap:"5px", textAlign:"center", marginTop:"85px" }}>
        <div style={{ backgroundColor: '#9747ff', height: 15, width: 15 }}></div>
        <div>Gateway</div>
        <div style={{ backgroundColor: '#fca311', height: 15, width: 15, marginLeft:"10px" }}></div>
        <div>Meter</div>
      </div>
      {/* <div>
        <div>
          <div>
            <div style={{ backgroundColor: '#9747ff', height: 15, width: 15 }}>
            </div>Gateway</div>
        </div>
        <div>
          <div style={{ backgroundColor: '#fca311', height: 15, width: 15 }}>
          </div>Meter</div>
      </div> */}

    </Card>
  );
};

export default Alert;

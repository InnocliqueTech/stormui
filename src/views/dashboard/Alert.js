import React, { useEffect, useState, useContext } from 'react';
import { Row, Col, Card, Image } from 'react-bootstrap';
import { format, parseISO } from 'date-fns';
import alert from '../../assets/images/alert.svg';
import meter from '../../assets/images/Meter.svg';
import gateway from '../../assets/images/Gateway.svg';
import info from '../../assets/images/i_icons.svg';
import { FaPlus } from 'react-icons/fa';
import './dashboard.scss';
import { ClientsContext } from '../dashboard/context';
const Alert = ({ data }) => {
  const { selectedClient } = useContext(ClientsContext);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [alertData, setAlertData] = useState(null);
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [error, setError] = useState('');
  let filteredAlertData = [];

  useEffect(() => {
    if (data && data.totalOutFlow) {
      let d = [];
      data.totalOutFlow.forEach((flow) => {
        d.push(flow.count);
      });
      setData([
        {
          name: 'Total Outflow',
          data: d
        }
      ]);
    }
  }, [data]);

  if (data.alerts) {
    filteredAlertData = data.alerts
      .filter((item) => item.alertName !== 'Line Leakage')
      .map((item) => {
        let newAlertName = item.alertName; // Default to the current alertName

        // Add your conditional logic here to assign new alert names
        if (item.alertName === 'Gateway Failure') {
          newAlertName = 'Gateway Communication Failure';
        } else if (item.alertName === 'Meter Theft') {
          newAlertName = 'Meter Communication Failure';
        }
        return {
          ...item,
          alertName: newAlertName
        };
      });
  }

  function formatTimestamp(timestamp) {
    // Parse the ISO string into a Date object
    const date = parseISO(timestamp);

    // Format the date into the desired format
    const formattedDate = format(date, 'yyyy-MM-dd HH:mm:ss');

    return formattedDate;
  }

  const handleIconClick = async (index) => {
    // debugger;
    if (expandedIndex === index) {
      setExpandedIndex(null); // Close the currently open alert
      setAlertData(null); // Clear the alert data when closing
    } else {
      setExpandedIndex(index); // Open the selected alert
      setLoadingIndex(index); // Set the loading state for the current alert

      try {
        const response = await fetch('http://49.207.11.223:3307/clients/getClientAlerts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ clientId: selectedClient })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setAlertData(data.clientAlerts); // Store the new alert data directly
          setError('');
        } else {
          throw new Error('Expected JSON response');
        }
      } catch (error) {
        console.error('Error fetching client alerts:', error);
        setError(error.message);
      } finally {
        setLoadingIndex(null);
      }
    }
  };

  console.log(alertData, filteredAlertData, 'alerts data');
  return (
    <Card className="card-social" style={{ minHeight: '320px', borderRadius: 5 }}>
      <Card.Body style={{ padding: '15px !important' }}>
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
        </Row>
        <div className="alert-scroll">
          {filteredAlertData &&
            filteredAlertData.map((alert, index) => {
              const isExpanded = expandedIndex === index;
              return (
                <Row key={index} style={{ borderBottom: '1px solid #ccc', paddingBottom: 5, marginTop: 10 }}>
                  <Col md={1} sm={1} xs={1}>
                    {index === 1 ? (
                      <Image src={meter} alt="gateway" className="align-items-center float-start mt-2" />
                    ) : (
                      <Image src={gateway} alt="gateway" className="align-items-center float-start mt-2" />
                    )}
                  </Col>
                  <Col className="alertTitle" md={6} xs={6} sm={6}>
                    <div className="alertheading">
                      {alert.alertName}
                      <FaPlus onClick={() => handleIconClick(index)} style={{ cursor: 'pointer', marginLeft: '10px' }} />
                    </div>

                    {isExpanded && (
                      <>
                        {loadingIndex === index && <div>Loading...</div>}
                        {loadingIndex !== index && error && <div className="error-message">{error}</div>}
                        {loadingIndex !== index && !error && alertData && (
                          <>
                            {alert.alertName === 'Gateway Communication Failure' && alertData.Gateway && alertData.Gateway.length > 0 && (
                              <div style={{ width: '100%' }}>
                                {alertData.Gateway.map((gateway) => {
                                  let { gwid, CreatedAt } = gateway;
                                  return (
                                    <div key={gwid} className="alert-card">
                                      <span>{gwid}</span>
                                      <span>{formatTimestamp(CreatedAt)}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}

                            {alert.alertName === 'Meter Communication Failure' && alertData.Meter && alertData.Meter.length > 0 && (
                              <div>
                                {alertData.Meter.map((gateway) => {
                                  let { gwid, CreatedAt } = gateway;
                                  return (
                                    <div key={gwid} className="alert-card">
                                      <span>{gwid}</span>
                                      <span>{formatTimestamp(CreatedAt)}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}

                            {!alertData.Gateway && !alertData.Meter && <div>No alerts available.</div>}
                          </>
                        )}
                      </>
                    )}
                  </Col>
                  <Col md={4} sm={4} xs={4}>
                    <h6 className="align-items-center float-end alertsubheading mt-3">{alert.alertTime}</h6>
                  </Col>
                </Row>
              );
            })}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginTop: 10, paddingBottom: 17 }}>
          <div style={{ backgroundColor: '#F66060', width: 12, height: 12 }}></div>
          <div>{data.alertsCount && data.alertsCount.highAlert.label}</div>
          <div style={{ backgroundColor: '#FCA311', width: 12, height: 12 }}></div>
          <div>{data.alertsCount && data.alertsCount.mediumAlert.label}</div>
          <div style={{ backgroundColor: '#1976D2', width: 12, height: 12 }}></div>
          <div>{data.alertsCount && data.alertsCount.lowAlert.label}</div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Alert;

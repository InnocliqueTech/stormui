import React, { useEffect } from 'react';
import { Row, Col, Card, Image } from 'react-bootstrap';
import alert from '../../assets/images/alert.svg';
import meter from '../../assets/images/Meter.svg';
import info from '../../assets/images/i_icons.svg';
import "./dashboard.scss";

const Alert = ({data}) => {
    // const [data, setData] = useState({});
    useEffect(()=>{
        console.log(data.totalOutFlow)
        if(data && data.totalOutFlow) {
          let d = [];
          data.totalOutFlow.forEach((flow) => {
            d.push(flow.count)
          });
          setData([{
            name: "Total Outflow",
            data: d
          }]);
        }
      }, [data])
      return (
    <Card style={{ minHeight: '320px', borderRadius: 5 }}>
        <Card.Body>
            <Row className="mb-2">
                <Col md={1} sm={1} xs={1} className="alertContainer">
                    <Image src={alert} alt="alert" className="alertIcon" />
                </Col>
                <Col md={3} sm={4} xs={5}>
                    <div className="alerttext">
                        Alert
                        <span>
                            <Image src={info} alt="gateway" className='infoIcon' />
                        </span>{' '}
                    </div>
                </Col>
                <Col md={8} sm={6} xs={12} lg={7} style={{ display: 'flex', alignItems: 'flex-end', gap: 0, justifyContent: 'end', mt: 2 }}>

                    <div style={{ backgroundColor: '#F66060', width: 40, height: 30 }}>
                        <h6 style={{ color: 'white', fontFamily: 'intel', textAlign: 'center', marginTop: 8 }}>({data.alertsCount && data.alertsCount.highAlert.count})</h6>
                    </div>
                    <div style={{ backgroundColor: '#FCA311', width: 70, height: 30 }}>
                        <h6 style={{ color: 'white', fontFamily: 'intel', textAlign: 'center', marginTop: 8 }}>({data.alertsCount && data.alertsCount.mediumAlert.count})</h6>
                    </div>

                    <div style={{ backgroundColor: '#1976D2', width: 30, height: 30 }}>
                        <h6 style={{ color: 'white', fontFamily: 'intel', textAlign: 'center', marginTop: 8 }}>({data.alertsCount && data.alertsCount.lowAlert.count})</h6>
                    </div>
                </Col>
            </Row>
            {data.alerts && data.alerts.map((alert, index) => {
                return (
                    <Row key={index} style={{ borderBottom: '1px solid #ccc', paddingBottom: 5, marginTop: 10 }}>
                        <Col md={1} sm={1} xs={1}>
                            <Image src={meter} alt="gateway" className="align-items-center float-start mt-2" />
                        </Col>
                        <Col className='alertTitle' md={6} xs={6} sm={6}>
                            <div className="alertheading">{alert.alertName}</div>
                            <div className="alertsubheading">{alert.alertDescription}</div>
                        </Col>
                        <Col md={4} sm={4} xs={4}>
                            <h6 className="align-items-center float-end alertsubheading mt-3">{alert.alertTime}</h6>
                        </Col>
                    </Row>
                )
            })}

            {/* <Row style={{ borderBottom: '1px solid #ccc', paddingBottom: 5, marginTop: 10 }}>
                <Col md={1} sm={1} xs={1}>
                  <Image src={gateway} alt="gateway" className="align-items-center float-start mt-2" />
                </Col>
                <Col md={6} xs={6} sm={6}>
                  <div className="alertheading">Heading</div>
                  <div className="alertsubheading">Subheading</div>
                </Col>
                <Col md={4} sm={4} xs={4}>
                  <h6 className="align-items-center float-end alertsubheading mt-3">11:32 am</h6>
                </Col>
              </Row>

              <Row style={{ borderBottom: '1px solid #ccc', paddingBottom: 5, marginTop: 10 }}>
                <Col md={1} sm={1} xs={1}>
                  <Image src={gateway} alt="gateway" className="align-items-center float-start mt-2" />
                </Col>
                <Col md={6} xs={6} sm={6}>
                  <div className="alertheading">Heading1</div>
                  <div className="alertsubheading">Subheading</div>
                </Col>
                <Col md={4} sm={4} xs={4}>
                  <h6 className="align-items-center float-end alertsubheading mt-3">11:32 am</h6>
                </Col>
              </Row> */}

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginTop: 10 }}>
                <div style={{ backgroundColor: '#F66060', width: 15, height: 15 }}></div>
                <div>{data.alertsCount && data.alertsCount.highAlert.label}</div>
                <div style={{ backgroundColor: '#FCA311', width: 15, height: 15 }}></div>
                <div>{data.alertsCount && data.alertsCount.mediumAlert.label}</div>
                <div style={{ backgroundColor: '#1976D2', width: 15, height: 15 }}></div>
                <div>{data.alertsCount && data.alertsCount.lowAlert.label}</div>
            </div>
        </Card.Body>
    </Card>
      );
};

export default Alert;
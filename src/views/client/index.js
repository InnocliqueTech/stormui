import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Card, Image, Table, OverlayTrigger, Spinner } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_API_URL1 } from '../../config/constant';
import '../dashboard/dashboard.scss';
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
import info from '../../assets/images/info.svg';
import CustomerTable from './CustomerTable';
import ClientZone from './ClientZone';
import ClientDma from './ClientDma';
import { Link } from '@mui/material';
import DmaTable from './dmatable';
import ZoneTable from './Zonetable';
import Totalcounsumption from '../../src/views/dashboard/Totalcounsumption';
import over from '../../assets/images/symbols_water.svg';
// import UpArrow from '../../assets/images/UpArrow.png';
// import DownArrow from '../../assets/images/DownArrow.png';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import ZoneSegmenation from './zoneSegmenation';
import { useStateContext } from '../../contexts/MainContext';
import Overflowks from './OutFlowks';
import { ClientsContext } from '../dashboard/context';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

// const HtmlTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(() => ({
//   [`& .${tooltipClasses.tooltip}`]: {
//     backgroundColor: '#fff',
//     color: '#212121',
//     maxWidth: 220,
//     borderRadius: 8,
//     border: '1px solid #dadde9',
//     height: 'auto',
//     width: '220px',
//     padding: 12
//   }
// }));

const Client = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [alertData, setAlertData] = useState({});
  const [outFlowData, setOutFlowData] = useState({});
  const { presentDate, toDate } = useStateContext();
  // const { clients } = useContext(ClientsContext);
  const { selectedClient, selectedZone } = useContext(ClientsContext);
  const [dmaData, setDmaData] = useState({});
  const [dayDashBoardData, setDayDashBoardData] = useState({});
  const [loading, setLoading] = useState(true);
  // const [supplyByZoneData, setSupplyByZoneData] = useState([]);

  //For Supply By zone Graph
  // const [zoneNames, setZoneNames] = useState([]);
  // const [dates, setDates] = useState([]);


  // zone wise supply
  useEffect(() => {
    const fetchDashboardData = async () => {
      const requestBody = {
        clientId: 1,
        zoneId: 0,
        fromDate: "2024-06-01",
        toDate: "2024-06-27"
      }
      // const requestBody = {
      //   clientId: selectedClient,
      //   zoneId: selectedZone || 0,
      //   fromDate: presentDate,
      //   toDate: toDate
      // }
      console.log(requestBody)
      try {
        const response = await axios.post(`${BASE_API_URL1}zones/getZoneWiseConsumptionInClientDashboard`, requestBody);
        console.log(response)
        setDashboardData(response.data);
        console.log(dashboardData)
      } catch (e) {
        console.log(e);
      }
    };

    fetchDashboardData();
  }, [presentDate, toDate]);



  // getDayWiseZoneConsumptionInClientDashboard

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const requestBody = {
          clientId: selectedClient,
          zoneId: selectedZone || 0,
          fromDate: presentDate,
          toDate: toDate
        }
        // const requestBody = {
        //   clientId: 1,
        //   zoneId: 0,
        //   fromDate: "2024-06-01",
        //   toDate: "2024-06-30"
        // }

        console.log(requestBody)
        const response = await axios.post(`${BASE_API_URL1}zones/getDayWiseZoneConsumptionInClientDashboard`, requestBody);
        console.log(response)
        setDayDashBoardData(response.data);
        // setSupplyByZoneData(response.data);
        // let dates = Object.keys(response.data);
        // setDates(dates);
        // console.log(Object.values(response.data), 'values');
        // let filteredData = Object.values(response.data).map((item) => {
        //   return item.zoneDetails.map((item) => {
        //     return item.zoneName;
        //   });
        // });
        // setZoneNames(filteredData);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [presentDate, toDate]);

  // console.log(supplyByZoneData, { zoneNames }, { dates });

  const renderTooltip = (props, inflow, consumption, total, date) => (
    <Tooltip className='card bg-white p-3' id="button-tooltip" {...props} >
      <div className="d-flex pb-1 mb-2" style={{ borderBottom: '1px solid #ddd' }}>
        <span className="col-md-6" style={{ fontSize: 14, color: '#212121' }}>
          {date}
        </span>
        <b style={{ fontSize: 14, color: '#0D47A1' }} className="col-md-6 text-end">
          {total}%
        </b>
      </div>
      <div className="d-flex pb-1 mb-2">
        <span className="col-md-6" style={{ fontSize: 14, color: '#717171' }}>
          In Flow
        </span>
        <b style={{ fontSize: 14, color: '#212121' }} className="col-md-6 text-end">
          {inflow ? inflow : '-'}
        </b>
      </div>
      <div className="d-flex pb-1 mb-2">
        <span className="col-md-6" style={{ fontSize: 14, color: '#717171' }}>
          Consumption
        </span>
        <b style={{ fontSize: 14, color: '#212121' }} className="col-md-6 text-end">
          {consumption ? consumption : '-'}
        </b>
      </div>
    </Tooltip>
  );
  const getBackgroundColor = (total) => {
    if (total < 30) {
      return '#e3f2fd';
    } else if (total >= 30 && total <= 50) {
      return '#bbdefb';
    } else if (total > 50 && total <= 75) {
      return '#90e0ef';
    } else if (total > 75 && total < 100) {
      return '#00b4eb';
    } else if (total === 100) {
      return '#0d47a1';
    }
  };

  const getTextColor = (total) => {
    if (total > 50 || total === 100) {
      return 'white';
    } else {
      return 'black';
    }
  };
  const renderTableHeader = () => {
    const dates = Object.keys(dayDashBoardData);
    return (
      <thead>
        <tr>
          <td style={{ textAlign: 'left', color: "#adb5bd" }}>Zones</td>
          {dates.map((date, index) => (
            <td style={{ color: "#adb5bd" }} key={index}>{date}</td>
          ))}
        </tr>
      </thead>
    );
  };

  const renderTableBody = () => {
    const dates = Object.keys(dayDashBoardData);
    const zones = dates.length > 0 ? dayDashBoardData[dates[0]].zoneDetails : [];

    return (
      <tbody>
        {zones.map((zone, zoneIndex) => (
          <tr key={zone.zoneId}>
            <th>{zone.zoneName}</th>
            {dates.map((date, dateIndex) => {
              const zoneDetails = dayDashBoardData[date].zoneDetails.find(z => z.zoneId === zone.zoneId);
              const backgroundColor = getBackgroundColor(zoneDetails.total);
              const color = getTextColor(zoneDetails.total);
              return (
                <td key={dateIndex} style={{ backgroundColor, color: color }}>
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={(props) => renderTooltip(props, zoneDetails.inflow, zoneDetails.consumption, zoneDetails.total, date)}
                  >
                    <Button variant="link">
                      {zoneDetails.total}%
                    </Button>
                  </OverlayTrigger>
                </td>
              );
            })}
          </tr>
        ))}
        <tr>
          <th>Average</th>
          {dates.map((date, dateIndex) => {
            const average = dayDashBoardData[date].average;
            const backgroundColor = getBackgroundColor(average);
            const textColor = getTextColor(average);
            return (
              <td key={dateIndex} style={{ backgroundColor, color: textColor }}>
                {average}%
              </td>
            );
          })}
        </tr>
      </tbody>
    );
  };
  const renderLegend = () => {
    return (
      <div style={{ marginTop: '40px', display: "flex", justifyContent: "center" }}>
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
          <div style={{ backgroundColor: '#e3f2fd', width: '20px', height: '20px', marginRight: '10px' }}></div>
          <span>{'<30%'}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
          <div style={{ backgroundColor: '#bbdefb', width: '20px', height: '20px', marginRight: '10px' }}></div>
          <span>{'30%-50%'}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
          <div style={{ backgroundColor: '#90e0ef', width: '20px', height: '20px', marginRight: '10px' }}></div>
          <span>{'50%-75%'}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
          <div style={{ backgroundColor: '#00b4eb', width: '20px', height: '20px', marginRight: '10px' }}></div>
          <span>{'75%-100%'}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#0d47a1', width: '20px', height: '20px', marginRight: '10px' }}></div>
          <span>{'100%'}</span>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const fetchAlertData = async () => {
      try {
        // const response = await axios.post(`${BASE_API_URL1}clients/getClientAlerts`, {
        //   clientId: clients[0]?.clientId
        // });

        // const aData = await axios.post(BASE_API_URL + '/getAlerts');
        // setAlertData(aData.data);

        const requestBody = {
          clientId: selectedClient
        }
        console.log(requestBody);
        const response = await axios.post('http://49.207.11.223:3307/clients/getClientAlerts', requestBody);
        console.log(response)
        setAlertData(response.data)
        console.log(alertData)
      } catch (e) {
        console.log(e);
      }
    };

    fetchAlertData();
  }, []);

  // out flow data
  useEffect(() => {
    const fetchOutFlowData = async () => {

      try {

        const requestBody = {
          clientId: selectedClient,
          zoneId: selectedZone || 0,
          fromDate: presentDate,
          toDate: toDate
        }
        const response = await axios.post(`${BASE_API_URL1}dashboard/getTotalConsumptionInClientDashboard`, requestBody);
        setOutFlowData(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchOutFlowData();
  }, [presentDate, toDate]);


  // getDMAWiseConsumptionInClientDashboard

  useEffect(() => {
    const fetchDmaData = async () => {
      const requestBody = {
        clientId: selectedClient,
        zoneId: selectedZone,
        fromDate: presentDate,
        toDate: toDate
      }

      // const requestBody = {
      //   clientId: selectedClient,
      //   zoneId: 0,
      //   fromDate: "2024-06-01",
      //   toDate: "2024-06-27"
      // }
      console.log(requestBody)
      try {
        const response = await axios.post(`${BASE_API_URL1}dma/getDMAWiseConsumptionInClientDashboard`, requestBody);
        console.log(response)
        setDmaData(response.data);
        console.log(response.data);
        console.log(dmaData)
      } catch (e) {
        console.log(e);
      }
    };

    fetchDmaData();
  }, [presentDate, toDate]);

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
  // const formatNumber = (number) => {
  //   return new Intl.NumberFormat('en-US', {
  //     notation: "compact",
  //     compactDisplay: "short"
  //   }).format(number);
  // };

  return (
    <React.Fragment>
      <Row>
        <Col md={6} xl={6} sm={12}>
          <Card className="card-social">
            <Card.Body>
              <Col md={8} sm={8} xs={8} style={{display: 'inline-flex', }}>
                <Col md={1} sm={1} xs={1} className="iconContainer" style={{ backgroundColor: '#F6C574'}}>
                  <Image src={over} alt="over" className="icon"/>
                </Col>
                <div className="alerttext ms-2">
                  Total Out flow 1<span></span>{' '}
                </div>
                <span style={{marginTop:"10px"}}>
                  <Image src={info} alt="info" />
                </span>
              </Col>
              <Row>
                <Col md={4} sm={1} xs={1}>
                  <div className="client-flow" style={{ marginTop: '40px' }}>
                    <div className="client-flow-box" style={{ marginBottom: '32px' }}>
                      <div className="d-flex mb-3">
                        <div className="client-flow-orange me-2"></div>
                        <h4 style={{ fontSize: 14, color: '#495057', fontWeight: '600' }}>In Flow</h4>
                      </div>
                      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: '16px' }}>
                        {' '}
                        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: '16px' }}>
                          {outFlowData && outFlowData.inFlowDetails && outFlowData.inFlowDetails.count}
                        </h2>
                      </h2>
                      {/* <div className="client-flow-stock d-flex">
                        <div
                          style={{
                            width: 32,
                            height: 23,
                            borderRadius: 4,
                            background: '#DEF7E4',
                            color: '#25A244',
                            textAlign: 'center',
                            marginRight: '10px'
                          }}
                        >
                          {outFlowData?.inFlowDetails?.lastWeekPercentage}
                        </div>
                        <img src={UpArrow} style={{ width: '12px', height: '15px', marginRight: '10px', marginTop: '3px' }} alt="uparrow" />
                        <span style={{ fontSize: 12, paddingTop: '3px' }}>last week</span>
                      </div> */}
                    </div>
                    <div className="client-flow-box">
                      <div className="d-flex mb-3">
                        <div className="client-flow-orange client-flow-blue me-2"></div>
                        <h4 style={{ fontSize: 14, color: '#495057', fontWeight: '600' }}>Consumption</h4>
                      </div>
                      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: '16px' }}>
                        {outFlowData && outFlowData.consumptionDetails && outFlowData.consumptionDetails.count}
                      </h2>
                      {/* <div className="client-flow-stock d-flex">
                        <div
                          style={{
                            width: 32,
                            height: 23,
                            borderRadius: 4,
                            background: '#FFE8EC',
                            color: '#DE092F',
                            textAlign: 'center',
                            marginRight: '10px'
                          }}
                        >
                          {outFlowData?.consumptionDetails?.lastWeekPercentage}
                        </div>
                        <img
                          src={DownArrow}
                          style={{ width: '12px', height: '15px', marginRight: '10px', marginTop: '3px' }}
                          alt="uparrow"
                        />
                        <span style={{ fontSize: 12, paddingTop: '3px' }}>last week</span>
                      </div> */}
                    </div>
                  </div>
                </Col>
                <Col md={8} sm={8} xs={1}>
                  <Totalcounsumption data={outFlowData} />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={3} sm={12}>
          <Link style={{ cursor: 'pointer', textDecoration: 'none' }} onClick={handledmaClickOpen}>
            <Card className="card-social">
              <Card.Body>
                {/* <ClientZone data={dashboardData.totalConsumption} /> */}
                <ClientZone data={dashboardData} />
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={6} xl={3} sm={12}>
          <Link style={{ cursor: 'pointer', textDecoration: 'none' }} onClick={handleClickOpen}>
            <Card className="card-social">
              <Card.Body className="">
                <ClientDma dmaData={dmaData} />
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
                  <Overflowks data={outFlowData} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="client-customer">
        <Row>
          <Col md={9} sm={7} xs={7} className="d-flex">
            <span style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }} className="d-flex align-items-center">
              <span
                className="iconContainergreen p-0 d-flex align-items-center justify-content-center me-2"
                style={{ width: '48px', height: '48px' }}
              >
                <Image src={customer} alt="customer" className="icon" />
              </span>{' '}
              Supply By Zone
            </span>
            <span style={{ padding: '13px' }}>
              <Image src={info} alt="info" className="icon" />
            </span>
            <span className="d-flex" style={{ textAlign: 'end' }}></span>
          </Col>
          <Col md={3} sm={5} xs={5} style={{ textAlign: 'end' }}>
            <span style={{ marginRight: 20 }}>
              <Image src={refresh} alt="refresh" className="icon" />
            </span>
            <span>
              <Image src={download} alt="download" className="icon" />
            </span>
          </Col>
        </Row>

        <div className="client-zone-table mt-4">
          {/* <table className="table">
            <thead>
              <tr>
                <td style={{ textAlign: 'left' }}>Zones</td>
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
                <td className="bg-blue3">
                  <HtmlTooltip
                    title={
                      <React.Fragment>
                        <div className="d-flex pb-1 mb-2" style={{ borderBottom: '1px solid #ddd' }}>
                          <span className="col-md-6" style={{ fontSize: 14, color: '#212121' }}>
                            Day1
                          </span>
                          <b style={{ fontSize: 14, color: '#0D47A1' }} className="col-md-6 text-end">
                            100%
                          </b>
                        </div>
                        <div className="d-flex pb-1 mb-2">
                          <span className="col-md-6" style={{ fontSize: 14, color: '#717171' }}>
                            In Flow
                          </span>
                          <b style={{ fontSize: 14, color: '#212121' }} className="col-md-6 text-end">
                            5603.4
                          </b>
                        </div>
                        <div className="d-flex pb-1 mb-2">
                          <span className="col-md-6" style={{ fontSize: 14, color: '#717171' }}>
                            Consumption
                          </span>
                          <b style={{ fontSize: 14, color: '#212121' }} className="col-md-6 text-end">
                            5603.4
                          </b>
                        </div>
                      </React.Fragment>
                    }
                  >
                    <Button style={{ color: 'white', padding: 0 }}>100%</Button>
                  </HtmlTooltip>
                </td>
                <td className="bg-blue1">27%</td>
                <td className="bg-blue1">18%</td>
                <td className="bg-blue3">100%</td>
                <td className="bg-blue3">100%</td>
                <td className="bg-blue2">69%</td>
                <td className="bg-blue2">73%</td>
              </tr>
              <tr>
                <th>Zone 2</th>
                <td className="bg-blue3">58%</td>
                <td className="bg-blue3">68%</td>
                <td className="bg-blue2">34%</td>
                <td className="bg-blue4">123%</td>
                <td className="bg-blue3">88%</td>
                <td className="bg-blue3">100%</td>
                <td className="bg-blue1">29%</td>
              </tr>
              <tr>
                <th>Zone 3</th>
                <td className="bg-blue4">123%</td>
                <td className="bg-blue3">100%</td>
                <td className="bg-blue5">54%</td>
                <td className="bg-blue3">100%</td>
                <td className="bg-blue3">77%</td>
                <td className="bg-blue3">100%</td>
                <td className="bg-blue5">64%</td>
              </tr>
              <tr>
                <th>Zone 4</th>
                <td className="bg-blue3">100%</td>
                <td className="bg-blue3">100%</td>
                <td className="bg-blue1">25%</td>
                <td className="bg-blue3">100%</td>
                <td className="bg-blue5">100%</td>
                <td className="bg-blue2">38%</td>
                <td className="bg-blue3">100%</td>
              </tr>
              <tr>
                <th>Zone 5</th>
                <td className="bg-blue1">48%</td>
                <td className="bg-blue2">20%</td>
                <td className="bg-blue5">100%</td>
                <td className="bg-blue5">56%</td>
                <td className="bg-blue5">89%</td>
                <td className="bg-blue5">100%</td>
                <td className="bg-blue5">100%</td>
              </tr>
              <tr>
                <th>Zone 6</th>
                <td className="bg-blue1">42%</td>
                <td className="bg-blue4">123%</td>
                <td className="bg-blue1">38%</td>
                <td className="bg-blue3">100%</td>
                <td className="bg-blue1">43%</td>
                <td className="bg-blue5">100%</td>
                <td className="bg-blue5">100%</td>
              </tr>
              <tr>
                <th>Zone 7</th>
                <td className="bg-blue1">28%</td>
                <td className="bg-blue1">38%</td>
                <td className="bg-blue1">38%</td>
                <td className="bg-blue3">100%</td>
                <td className="bg-blue5">87%</td>
                <td className="bg-blue4">123%</td>
                <td className="bg-blue1">43%</td>
              </tr>
              <tr>
                <th>Zone 8</th>
                <td className="bg-blue1">38%</td>
                <td className="bg-blue1">24%</td>
                <td className="bg-blue5">100%</td>
                <td className="bg-blue3">100%</td>
                <td className="bg-blue5">72%</td>
                <td className="bg-blue1">46%</td>
                <td className="bg-blue4">123%</td>
              </tr>

              <tr>
                <td colSpan={7} style={{ textAlign: 'left' }}>
                  Show more
                </td>
              </tr>

              <tr>
                <th>Average/Total</th>
                <td className="bg-blue1">38%</td>
                <td className="bg-blue1">24%</td>
                <td className="bg-blue5">100%</td>
                <td className="bg-blue5">100%</td>
                <td className="bg-blue5">72%</td>
                <td className="bg-blue1">46%</td>
                <td className="bg-blue4">123%</td>
              </tr>
            </tbody>
          </table> */}
          {loading ? ( // Show spinner if loading
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <div>
              <Table>
                {renderTableHeader()}
                {renderTableBody()}
              </Table>
              {renderLegend()}
            </div>
          )}
        </div>
      </Card>

      <Card className="client-customer">
        <Row>
          <Col md={9} sm={7} xs={7} className="d-flex">
            <span style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }} className="d-flex align-items-center">
              <span
                className="iconContainergreen p-0 d-flex align-items-center justify-content-center me-2"
                style={{ width: '48px', height: '48px' }}
              >
                <Image src={customer} alt="customer" className="icon" />
              </span>{' '}
              Customer Segmentation{' '}
            </span>
            <span style={{ padding: '13px' }}>
              <Image src={info} alt="info" className="icon" />
            </span>

            <span className="d-flex" style={{ textAlign: 'end' }}></span>
          </Col>
          <Col md={3} sm={5} xs={5} style={{ textAlign: 'end' }}>
            <span style={{ marginRight: 20 }}>
              <Image src={refresh} alt="refresh" className="icon" />
            </span>
            <span>
              <Image src={download} alt="download" className="icon" />
            </span>
          </Col>
        </Row>
        <CustomerTable />
      </Card>

      <Card className="client-customer">
        <Row>
          <Col md={9} sm={7} xs={7} className="d-flex">
            <span style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }} className="d-flex align-items-center">
              <span
                className="iconContainer p-0 d-flex align-items-center justify-content-center me-2"
                style={{ width: '48px', height: '48px' }}
              >
                <Image src={zone} alt="zone" className="icon" />
              </span>{' '}
              Zone Segmentation{' '}
            </span>
            <span style={{ padding: '13px' }}>
              <Image src={info} alt="gateway" />
            </span>
            <span style={{ textAlign: 'end' }}></span>
          </Col>
          <Col md={3} sm={5} xs={5} style={{ textAlign: 'end' }}>
            <span style={{ marginRight: 20 }}>
              <Image src={refresh} alt="refresh" className="icon" />
            </span>
            <span>
              <Image src={download} alt="download" className="icon" />
            </span>
          </Col>
        </Row>
        <ZoneSegmenation />
      </Card>

      {/* ------------------------Dma--------------------------------------- */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="md" // Options: 'xs', 'sm', 'md', 'lg', 'xl'
        fullWidth
      >
        <Card>
          <Row container style={{ backgroundColor: '#000' }}>
            <Col md={10} sm={12} xs={10}>
              <DialogTitle style={{ color: '#fff' }} sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Supply Details
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
                  color: (theme) => theme.palette.grey[500]
                }}
              >
                <CloseIcon />
              </IconButton>
            </Col>
          </Row>
          <DmaTable dmaData={dmaData} />
        </Card>
      </BootstrapDialog>

      {/* ------------------------zone--------------------------------------- */}
      <BootstrapDialog
        onClose={handledmaClose}
        aria-labelledby="customized-dialog-title"
        open={opendma}
        maxWidth="md" // Options: 'xs', 'sm', 'md', 'lg', 'xl'
        fullWidth
      >
        <Card>
          <Row container style={{ backgroundColor: '#000' }}>
            <Col md={10} sm={12} xs={10}>
              <DialogTitle style={{ color: '#fff' }} sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Supply Details
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
                  color: (theme) => theme.palette.grey[500]
                }}
              >
                <CloseIcon />
              </IconButton>
            </Col>
          </Row>
          <ZoneTable dashboardData={dashboardData} />
        </Card>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default Client;

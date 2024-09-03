import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Card, Image, Table, OverlayTrigger, Spinner } from 'react-bootstrap';
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
// import refresh from '../../assets/images/refresh.svg';
// import download from '../../assets/images/download.svg';
import info from '../../assets/images/info.svg';
import CustomerTable from './CustomerTable';
import ClientZone from './ClientZone';
import ClientDma from './ClientDma';
// import { Link } from '@mui/material';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import DmaTable from './dmatable';
import ZoneTable from './Zonetable';
// import Totalcounsumption from '../../src/views/dashboard/Totalcounsumption';
import TotalOtFloow from './TotalOtFloow';
import over from '../../assets/images/symbols_water.svg';
// import UpArrow from '../../assets/images/UpArrow.png';
// import DownArrow from '../../assets/images/DownArrow.png';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import NewDatePicker from '../../layouts/AdminLayout/Breadcrumb/NewDatePicker';
import ZoneSegmenation from './zoneSegmenation';
import { useStateContext } from '../../contexts/MainContext';
import Overflowks from './OutFlowks';
import { ClientsContext } from '../dashboard/context';
import { format, subDays } from 'date-fns';
import DateRangeIcon from '@mui/icons-material/DateRange';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ZoneList from './ZoneList';
import DmaList from './DmaList';
import MeterList from './MeterList';
import GatewayList from '../gateway/GatewayPage';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


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
  const { presentDate, toDate, onDateChange, selectedDate, setSelectedDate, isDatePickerOpen, toggleDatePicker }
    = useStateContext();


  // const { clients } = useContext(ClientsContext);
  const { selectedClient, zones, selectedZone, setSelectedZone, dmas, selectedDma, setSelectedDma, gateways, selectedGateway, setSelectedGateway, status, selectedStatus, setSelectedStatus } = useContext(ClientsContext);
  const [dmaData, setDmaData] = useState({});
  const [dayDashBoardData, setDayDashBoardData] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // setSelectedStatuselectedZone
  // const [supplyByZoneData, setSupplyByZoneData] = useState([]);
  // const { onDateChange, selectedDate, setSelectedDate, isDatePickerOpen, toggleDatePicker } = useStateContext();

  //For Supply By zone Graph
  // const [zoneNames, setZoneNames] = useState([]);
  // const [dates, setDates] = useState([]);
  const [isId, setIsId] = useState(false)
  const [dashboardTab, setDashboardTab] = useState(false)



  const location = useLocation();
  const { id } = location.state || {};

  const handleFilterIconClick = () => {
    // navigate('/app/meterlist');
    setIsDialogOpen(true);

  };


  useEffect(() => {
    console.log(id)
    if (id) {
      setValue(id)
      setIsId(true)
      setDashboardTab(false)
    } else {
      setIsId(false)
      setDashboardTab(true)
      console.log(dashboardTab)
    }
  }, [id])

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
        {zones.map((zone) => (
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


  // const today = format(new Date(), 'yyyy-MM-dd');
  // const [presentDate, setPresentDate] = useState(format(subDays(new Date(today), 7), 'yyyy-MM-dd'));
  // const [toDate, setToDate] = useState(today);
  const today = format(new Date(), 'yyyy-MM-dd');
  const fromdate = format(subDays(new Date(today), 6), 'yyyy-MM-dd')
  const todayDate = today
  // out flow data
  useEffect(() => {
    const fetchOutFlowData = async () => {

      try {

        const requestBody = {
          clientId: selectedClient,
          zoneId: selectedZone || 0,
          fromDate: fromdate,
          toDate: todayDate
        }
        const response = await axios.post(`${BASE_API_URL1}dashboard/getTotalConsumptionInClientDashboard`, requestBody);
        console.log(requestBody)
        console.log(response)
        setOutFlowData(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchOutFlowData();
  }, [presentDate, toDate]);
  console.log(outFlowData)

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
  // const [fullWidth] = React.useState(true);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    console.log('NEW', newValue)
    setValue(newValue);
  };



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
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 0, mt: 2 }}>{children}</Box>}
      </div>
    );
  }
  const handleDialogReset = () => {
    // setIsDialogOpen(false);
    setSelectedZone(0);
    setSelectedDma(0);
    setSelectedGateway(0);
    setSelectedStatus(0);
  };


  const handleDialogClose = () => {
    setIsDialogOpen(false);
    // navigate('/app/meterlist');
  };


  const handleDialogApply = () => {
    setIsDialogOpen(false);
    navigate('/app/meterlist');
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  // const formatNumber = (number) => {
  //   return new Intl.NumberFormat('en-US', {
  //     notation: "compact",
  //     compactDisplay: "short"
  //   }).format(number);
  // };

  return (
    <React.Fragment>

      <Box sx={{ width: '100%' }}>
        <Box >
          {/* <div className='row' style={{ paddingLeft: "12px", marginBottom:"25px" }}>
            <div className='col-md-5' style={{
              backgroundColor: "#eaeaeb", padding: "5px", borderRadius: "8px", display: "flex",
              justifyContent: "center"
            }}>


              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
                sx={{

                  '& .MuiTab-root': {
                    borderRadius: "8px",
                    color: '#212121',
                    fontSize: '15px',
                    fontWeight: 500,
                    textTransform: 'none',
                    fontFamily: "Inter !important"
                  },
                  '& .Mui-selected': {
                    backgroundColor: '#ffffff',
                    fontWeight: 600,
                    color: 'black !important',
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: '#eaeaeb'
                  },
                }}
              >
                {dashboardTab == true ? <Tab label="Dashboard" {...a11yProps(0)} /> : ''}
                {isId && (
                  <Tab
                    {...a11yProps(0)}
                    label={
                      <Link
                        to="/app/dashboard/default"
                        style={{ display: 'flex', alignItems: 'center', }}
                      >
                        <ArrowBackIcon style={{ color: "black" }} />
                      </Link>
                    }
                  />
                )}
                
                <Tab label="Zones" {...a11yProps(1)} />
                <Tab label="DMAs" {...a11yProps(2)} />
                <Tab label="Gateways" {...a11yProps(3)} />
                <Tab label="Meters" {...a11yProps(4)} />
              </Tabs>
            </div>
            <div className='col-md-2'></div>
            <div className='col-md-5'>
              {console.log('VALUE', value)}
              <div className="days-date-picker-outer-cls">
                {value == 0 ?

                  <div className='days-date-picker-inner-cls'>
                    {[
                      { day: '1D', add: 1 },
                      { day: '7D', add: 7 },
                      { day: '14D', add: 14 },
                      { day: '30D', add: 30 }
                    ].map((obj) => {
                      return (
                        <button
                          className={`days ${selectedDate === obj.day ? 'active' : ''}`}
                          onClick={() => {
                            setSelectedDate(obj.day);
                            onDateChange(obj.add);
                          }}
                          key={obj.day}
                        >
                          {obj.day}
                        </button>
                      );
                    })}

                    {isDatePickerOpen && (
                      <div className="date-picker">
                        <NewDatePicker />
                      </div>
                    )}
                    <button className="icon-button" onClick={toggleDatePicker}>
                      <DateRangeIcon />
                    </button>
                  </div>
                  : ""}

                {value == 2 || value == 3 || value == 4 ?
                  <div>
                    <div className="form-group selectcustom">
                      <select className="form-control" value={selectedZone} onChange={(e) => setSelectedZone(Number(e.target.value))}>
                        <option value={0}>All</option>
                        {zones.map((zone) => (
                          <option key={zone.zoneId} value={zone.zoneId}>
                            {zone.displayName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  : ""}

                {value == 3 || value == 4 ? <div style={{ marginLeft: "5px" }}>
                  <div className="form-group selectcustom">
                    <select className="form-control" value={selectedDma} onChange={(e) => setSelectedDma(Number(e.target.value))}>
                     
                      <option value={0}>All</option>
                      {dmas.map((dma) => (
                        <option key={dma.dmaId} value={dma.dmaId}>
                          {dma.displayName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div> : ""}


                {value == 4 ? <div style={{ marginLeft: "5px" }}>
                  <div className="form-group selectcustom">
                    <select className="form-control" value={selectedGateway} onChange={(e) => setSelectedGateway(Number(e.target.value))}>
            
                      <option value={0}>All</option>
                      {gateways.map((gateway) => (
                        <option key={gateway.id} value={gateway.id}>
                          {gateway.displayName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                  : ""}

                <div style={{ marginLeft: "10px" }}>
                  <div className="form-group selectcustom"
                    style={{ height: "47px", width: "47px", backgroundColor: "#eaeaeb", borderRadius: "8px" }}>
                    <FilterAltOutlinedIcon
                      style={{
                        color: '#6C757D',
                        position: "relative",
                        marginTop: "12px",
                        marginLeft: "12px",
                        cursor: "pointer"
                      }}
                      onClick={handleFilterIconClick} />
                  </div>

                  <Dialog open={isDialogOpen} onClose={handleDialogClose}>
                 
                    <DialogTitle>
                   
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h4 style={{ fontWeight: "600", margin: 0 }}>Filters</h4>
                        <IconButton onClick={handleDialogClose} style={{ padding: 0 }}>
                          <CloseIcon />
                        </IconButton>
                      </div>
                    </DialogTitle>
                    <DialogContent>
                      <div className='row'>
                        <div className='col-md-4'>
                          <div className="form-group selectcustom" style={{ width: "100%" }}>
                            <label>Select Status</label>
                            <select className="form-control" value={selectedStatus ? selectedStatus : 0}
                              onChange={(e) => setSelectedStatus(Number(e.target.value))}>

                              {status.map((st) => (
                                <option key={st.statusId} value={st.statusId}>
                                  {st.displayName}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className='col-md-4'>
                          <div className="form-group selectcustom" style={{ width: "100%" }}>
                            <label>Select Zone</label>
                            <select className="form-control" value={selectedZone ? selectedZone : 0}
                              onChange={(e) => setSelectedZone(Number(e.target.value))}>
                              
                              <option value={0}>All</option>
                              {zones.map((zone) => (
                                <option key={zone.zoneId} value={zone.zoneId}>
                                  {zone.displayName}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className='col-md-4'>
                          <div className="form-group selectcustom" style={{ width: "100%" }}>
                            <label>Select Dma</label>
                            <select className="form-control" value={selectedDma ? selectedDma : 0}
                              onChange={(e) => setSelectedDma(Number(e.target.value))}>
                         
                              <option value={0}>All</option>
                              {dmas.map((dma) => (
                                <option key={dma.dmaId} value={dma.dmaId}>
                                  {dma.displayName}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className='col-md-4 mt-3'>
                          <div className="form-group selectcustom" style={{ width: "100%" }}>
                            <label>Select Gateway</label>
                            <select className="form-control" value={selectedGateway ? selectedGateway : 0}
                              onChange={(e) => setSelectedGateway(Number(e.target.value))}>
                            
                              <option value={0}>All</option>
                              {gateways.map((gateway) => (
                                <option key={gateway.id} value={gateway.id}>
                                  {gateway.displayName}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                    <DialogActions style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: "20px" }}>
                      <Button
                        onClick={handleDialogReset}
                        color="primary"
                        variant="outlined"
                        style={{ flex: 1, marginRight: '4px', borderColor: "#00b4eb" }}
                      >
                        Reset
                      </Button>
                      <Button
                        onClick={handleDialogApply}
                 
                        variant="contained"
                        style={{ flex: 1, marginLeft: '4px', backgroundColor: "#00b4eb" }}
                      >
                        Apply
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>

              </div>

            </div>

          </div> */}
          <div style={{ paddingLeft: "12px", marginBottom: "25px", display:"flex" }}>
            <div style={{
              backgroundColor: "#eaeaeb", padding: "5px", borderRadius: "8px", display: "flex",
              justifyContent: "center", width:"45%"
            }}>


              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
                sx={{

                  '& .MuiTab-root': {
                    borderRadius: "8px",
                    color: '#212121',
                    fontSize: '15px',
                    fontWeight: 500,
                    textTransform: 'none',
                    fontFamily: "Inter !important"
                  },
                  '& .Mui-selected': {
                    backgroundColor: '#ffffff',
                    fontWeight: 600,
                    color: 'black !important',
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: '#eaeaeb'
                  },
                }}
              >
                {dashboardTab == true ? <Tab label="Dashboard" {...a11yProps(0)} /> : ''}
                {isId && (
                  <Tab
                    {...a11yProps(0)}
                    label={
                      <Link
                        to="/app/dashboard/default"
                        style={{ display: 'flex', alignItems: 'center', }}
                      >
                        <ArrowBackIcon style={{ color: "black" }} />
                      </Link>
                    }
                  />
                )}

                <Tab label="Zones" {...a11yProps(1)} />
                <Tab label="DMAs" {...a11yProps(2)} />
                <Tab label="Gateways" {...a11yProps(3)} />
                <Tab label="Meters" {...a11yProps(4)} />
              </Tabs>
            </div>
            <div style={{width:"15%"}}></div>
            {/* <div className='col-md-2'></div> */}
            <div style={{width:"40%"}}>
              {console.log('VALUE', value)}
              <div className="days-date-picker-outer-cls">
                {value == 0 ?

                  <div className='days-date-picker-inner-cls'>
                    {[
                      { day: '1D', add: 1 },
                      { day: '7D', add: 7 },
                      { day: '14D', add: 14 },
                      { day: '30D', add: 30 }
                    ].map((obj) => {
                      return (
                        <button
                          className={`days ${selectedDate === obj.day ? 'active' : ''}`}
                          onClick={() => {
                            setSelectedDate(obj.day);
                            onDateChange(obj.add);
                          }}
                          key={obj.day}
                        >
                          {obj.day}
                        </button>
                      );
                    })}

                    {isDatePickerOpen && (
                      <div className="date-picker">
                        <NewDatePicker />
                      </div>
                    )}
                    <button className="icon-button" onClick={toggleDatePicker}>
                      <DateRangeIcon />
                    </button>
                  </div>
                  : ""}

                {value == 2 || value == 3 || value == 4 ?
                  <div>
                    <div className="form-group selectcustom">
                      <select className="form-control" value={selectedZone} onChange={(e) => setSelectedZone(Number(e.target.value))}>
                        <option value={0}>All</option>
                        {zones.map((zone) => (
                          <option key={zone.zoneId} value={zone.zoneId}>
                            {zone.displayName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  : ""}

                {value == 3 || value == 4 ? <div style={{ marginLeft: "5px" }}>
                  <div className="form-group selectcustom">
                    <select className="form-control" value={selectedDma} onChange={(e) => setSelectedDma(Number(e.target.value))}>

                      <option value={0}>All</option>
                      {dmas.map((dma) => (
                        <option key={dma.dmaId} value={dma.dmaId}>
                          {dma.displayName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div> : ""}


                {value == 4 ? <div style={{ marginLeft: "5px" }}>
                  <div className="form-group selectcustom">
                    <select className="form-control" value={selectedGateway} onChange={(e) => setSelectedGateway(Number(e.target.value))}>

                      <option value={0}>All</option>
                      {gateways.map((gateway) => (
                        <option key={gateway.id} value={gateway.id}>
                          {gateway.displayName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                  : ""}

                <div style={{ marginLeft: "10px" }}>
                  <div className="form-group selectcustom"
                    style={{ height: "47px", width: "47px", backgroundColor: "#eaeaeb", borderRadius: "8px" }}>
                    <FilterAltOutlinedIcon
                      style={{
                        color: '#6C757D',
                        position: "relative",
                        marginTop: "12px",
                        marginLeft: "12px",
                        cursor: "pointer"
                      }}
                      onClick={handleFilterIconClick} />
                  </div>

                  <Dialog open={isDialogOpen} onClose={handleDialogClose}>

                    <DialogTitle>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h4 style={{ fontWeight: "600", margin: 0 }}>Filters</h4>
                        <IconButton onClick={handleDialogClose} style={{ padding: 0 }}>
                          <CloseIcon />
                        </IconButton>
                      </div>
                    </DialogTitle>
                    <DialogContent>
                      <div className='row'>
                        <div className='col-md-4'>
                          <div className="form-group selectcustom" style={{ width: "100%" }}>
                            <label>Select Status</label>
                            <select className="form-control" value={selectedStatus ? selectedStatus : 0}
                              onChange={(e) => setSelectedStatus(Number(e.target.value))}>

                              {status.map((st) => (
                                <option key={st.statusId} value={st.statusId}>
                                  {st.displayName}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className='col-md-4'>
                          <div className="form-group selectcustom" style={{ width: "100%" }}>
                            <label>Select Zone</label>
                            <select className="form-control" value={selectedZone ? selectedZone : 0}
                              onChange={(e) => setSelectedZone(Number(e.target.value))}>

                              <option value={0}>All</option>
                              {zones.map((zone) => (
                                <option key={zone.zoneId} value={zone.zoneId}>
                                  {zone.displayName}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className='col-md-4'>
                          <div className="form-group selectcustom" style={{ width: "100%" }}>
                            <label>Select Dma</label>
                            <select className="form-control" value={selectedDma ? selectedDma : 0}
                              onChange={(e) => setSelectedDma(Number(e.target.value))}>

                              <option value={0}>All</option>
                              {dmas.map((dma) => (
                                <option key={dma.dmaId} value={dma.dmaId}>
                                  {dma.displayName}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className='col-md-4 mt-3'>
                          <div className="form-group selectcustom" style={{ width: "100%" }}>
                            <label>Select Gateway</label>
                            <select className="form-control" value={selectedGateway ? selectedGateway : 0}
                              onChange={(e) => setSelectedGateway(Number(e.target.value))}>

                              <option value={0}>All</option>
                              {gateways.map((gateway) => (
                                <option key={gateway.id} value={gateway.id}>
                                  {gateway.displayName}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                    <DialogActions style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: "20px" }}>
                      <Button
                        onClick={handleDialogReset}
                        color="primary"
                        variant="outlined"
                        style={{ flex: 1, marginRight: '4px', borderColor: "#00b4eb" }}
                      >
                        Reset
                      </Button>
                      <Button
                        onClick={handleDialogApply}

                        variant="contained"
                        style={{ flex: 1, marginLeft: '4px', backgroundColor: "#00b4eb" }}
                      >
                        Apply
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>

              </div>

            </div>

          </div>
        </Box>
        <CustomTabPanel value={value} index={0} >
          <Row>
            <Col md={6} xl={6} sm={12}>
              <Card className="card-social" style={{ minHeight: "333px", maxHeight: "333px" }}>
                <Card.Body>
                  <Col md={8} sm={8} xs={8} style={{ display: 'inline-flex', }}>
                    <Col md={1} sm={1} xs={1} className="iconContainer" style={{ backgroundColor: '#F6C574' }}>
                      <Image src={over} alt="over" className="icon" />
                    </Col>
                    <div className="alerttext ms-2">
                      Total Outflow<span></span>{' '}
                    </div>
                    <span style={{ marginTop: "10px" }}>
                      <Image src={info} alt="info" />
                    </span>
                  </Col>
                  <Row>
                    <Col md={3} sm={1} xs={1} style={{ paddingLeft: "17px", paddingRight: "0px" }}>
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
                    <Col md={9} sm={8} xs={1}>
                      <TotalOtFloow data={outFlowData} />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} xl={3} sm={12}>
              <Link style={{ cursor: 'pointer', textDecoration: 'none' }} onClick={handledmaClickOpen}>
                <Card className="card-social" style={{ minHeight: "333px", maxHeight: "333px" }}>
                  <Card.Body>
                    {/* <ClientZone data={dashboardData.totalConsumption} /> */}
                    <ClientZone data={dashboardData} />
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col md={6} xl={3} sm={12}>
              <Link style={{ cursor: 'pointer', textDecoration: 'none' }} onClick={handleClickOpen}>
                <Card className="card-social" style={{ minHeight: "333px", maxHeight: "333px" }}>
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
              <Card className="card-social" style={{ minHeight: "333px", maxHeight: "333px" }}>
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
            </Row>

            <div className="client-zone-table mt-4">
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
              {/* <Col md={3} sm={5} xs={5} style={{ textAlign: 'end' }}>
            <span style={{ marginRight: 20 }}>
              <Image src={refresh} alt="refresh" className="icon" />
            </span>
            <span>
              <Image src={download} alt="download" className="icon" />
            </span>
          </Col> */}
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
              {/* <Col md={3} sm={5} xs={5} style={{ textAlign: 'end' }}>
            <span style={{ marginRight: 20 }}>
              <Image src={refresh} alt="refresh" className="icon" />
            </span>
            <span>
              <Image src={download} alt="download" className="icon" />
            </span>
          </Col> */}
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
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <ZoneList />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <DmaList />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <GatewayList isTab={true} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <MeterList />
        </CustomTabPanel>
      </Box>


    </React.Fragment>
  );
};

export default Client;

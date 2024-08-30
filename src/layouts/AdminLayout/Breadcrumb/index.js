import React, { useState, useEffect, useContext } from 'react';
import './index.css';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { ClientsContext } from '../../../views/dashboard/context/index';
import navigation from '../../../menu-items';
import { BASE_API_URL1, BASE_TITLE } from '../../../config/constant';
import axios from 'axios';
import { useStateContext } from '../../../contexts/MainContext';
import { format, isValid, parseISO } from 'date-fns';
import DateRangeIcon from '@mui/icons-material/DateRange';
import NewDatePicker from './NewDatePicker';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const handleChange = (e, setValue) => {
  const { value } = e.target;
  setValue(value);
};

const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [main, setMain] = useState([]);
  const [item, setItem] = useState([]);
  const { selectedClient, zones, selectedZone, setSelectedZone, dmas, selectedDma, setSelectedDma, gateways, selectedGateway, setSelectedGateway, status, selectedStatus, setSelectedStatus } = useContext(ClientsContext);
  // const { selectedClient, setSelectedClient } = useContext(ClientsContext);
  const { onDateChange, selectedDate, setSelectedDate, isDatePickerOpen, toggleDatePicker } = useStateContext();
  // const [zones, setZones] = useState([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const [status, setStatus] = useState(0);

  const handleFilterIconClick = () => {
    // navigate('/app/meterlist');
    setIsDialogOpen(true);

  };

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
  // const handleApplyFilters = () => {
  //   // Redirect to meterlist with filters as query parameters
  //   const queryParams = new URLSearchParams({
  //     status: status.toString(),
  //     zone: selectedZone.toString(),
  //     dma: selectedDma.toString(),
  //     gateway: selectedGateway.toString()
  //   }).toString();

  //   navigate(`/app/meterlist?${queryParams}`);
  //   setIsDialogOpen(false);
  // };

  useEffect(() => {
    const fetchZones = async (clientId) => {
      try {
        const response = await axios.post(BASE_API_URL1 + 'zones/getAllZoneDetailsWithClientId', {
          clientId
        });
        setZones(response.data.zonesList);
      } catch (error) {
        console.error('Error fetching zones:', error);
      }
    };

    if (selectedClient) {
      fetchZones(selectedClient);
    }
  }, [selectedClient]);



  useEffect(() => {
    navigation.items.forEach((item, index) => {
      if (item.type && item.type === 'group') {
        getCollapse(item, index);
      }
    });
  }, [location.pathname]);

  const getCollapse = (item, index) => {
    if (item.children) {
      item.children.forEach((collapse) => {
        if (collapse.type && collapse.type === 'collapse') {
          getCollapse(collapse, index);
        } else if (collapse.type && collapse.type === 'item') {
          if (location.pathname === collapse.url) {
            setMain(item);
            setItem(collapse);
          }
        }
      });
    }
  };

  let mainContent;
  let breadcrumbContent = '';
  let title = '';

  if (main && main.type === 'collapse') {
    mainContent = (
      <ListGroup.Item as="li" className="breadcrumb-item">
        <Link to="#">{main.title}</Link>
      </ListGroup.Item>
    );
  }

  if (item && item.type === 'item') {
    title = item.title;

    if (title === 'Settings' || title === 'Home') {
      breadcrumbContent = null;
    } else {
      breadcrumbContent = (
        <div className="page-header">
          <div className="page-block">
            <div className="row align-items-center">
              <div className="col-md-12">
                <div className="page-header-title">
                  <h5 className="m-b-10">{mainContent}</h5>
                </div>
                <Row className="d-flex" style={{ marginTop: "15px", marginBottom: "10px" }}>
                  <Col
                    className="d-flex align-items-center"
                    style={{
                      padding: '0px 15px'
                    }}
                  >
                    <Col md={7} sm={12} xs={12}>
                      <div className="">
                        {title == 'Dashboard' && location.pathname !== '/app/dashboard/default' && (
                          <span >
                            {(location.pathname.startsWith('/app/client') || location.pathname.startsWith('/app/dmalist') || location.pathname.startsWith('/app/gatewaylist') || location.pathname.startsWith('/app/meterlist')) && (
                              <>
                                <Link className={location.pathname === '/app/client' ? 'tab active' : 'tab'} to="/app/dashboard/default">
                                  <ArrowBackIcon />
                                </Link>
                                <span style={{ background: "white", padding: "18px 6px 16px 6px", borderRadius: "8px" }}>
                                  <Link
                                    className={location.pathname.toLowerCase().includes('clientlist') ? 'tab active' : 'tab'}
                                    to="/app/clientlist"
                                  >
                                    Zone&apos;s
                                  </Link>
                                  <Link
                                    className={location.pathname.toLowerCase().includes('dmalist') ? 'tab active' : 'tab'}
                                    to="/app/dmalist"
                                  >
                                    DMA&apos;s
                                  </Link>
                                  <Link
                                    className={location.pathname.toLowerCase().includes('gatewaylist') ? 'tab active' : 'tab'}
                                    to="app/gatewaylist"
                                  >
                                    Gateway&apos;s
                                  </Link>
                                  <Link
                                    className={location.pathname.toLowerCase().includes('meterlist') ? 'tab active' : 'tab'}
                                    to="app/meterlist"
                                  >
                                    Meter&apos;s
                                  </Link>
                                </span>
                              </>
                            )}
                          </span>
                        )}
                        {location.pathname === '/app/dashboard/default' && (
                          <h3 style={{ fontWeight: '600' }}>Dashboard</h3>
                        )}

                        {location.pathname === '/app/gateway' && (
                          <h3 style={{ fontWeight: '600' }}>Gateways</h3>
                        )}
                        {title !== 'Dashboard' && title !== 'Gateway' && (
                          <span style={{ background: "white", padding: "18px 6px 16px 6px", borderRadius: "8px", display: 'none' }}>
                            {(
                              location.pathname.startsWith('/app/client') ||
                              location.pathname.startsWith('/app/dmalist') ||
                              location.pathname.startsWith('/app/gatewaylist') ||
                              location.pathname.startsWith('/app/meterlist')) && (
                                <>
                                  <Link className={location.pathname === '/app/client' ? 'tab active' : 'tab'} to="/app/client">
                                    Dashboard
                                  </Link>
                                  <Link
                                    className={location.pathname.toLowerCase().includes('clientlist') ? 'tab active' : 'tab'}
                                    to="/app/clientlist"
                                  >
                                    Zone&apos;s
                                  </Link>
                                  <Link
                                    className={location.pathname.toLowerCase().includes('dmalist') ? 'tab active' : 'tab'}
                                    to="/app/dmalist"
                                  >
                                    DMA&apos;s
                                  </Link>
                                  <Link
                                    className={location.pathname.toLowerCase().includes('gatewaylist') ? 'tab active' : 'tab'}
                                    to="app/gatewaylist"
                                  >
                                    Gateway&apos;s
                                  </Link>
                                  <Link
                                    className={location.pathname.toLowerCase().includes('meterlist') ? 'tab active' : 'tab'}
                                    to="app/meterlist"
                                  >
                                    Meter&apos;s
                                  </Link>
                                </>
                              )}
                          </span>
                        )}

                        {title == 'Gateway' && location.pathname !== '/app/gateway' && (
                          <span >
                            {(location.pathname.startsWith('/app/client') || location.pathname.startsWith('/app/dmalist') || location.pathname.startsWith('/app/gatewaylist') || location.pathname.startsWith('/app/meterlist')) && (
                              <>
                                <Link className={location.pathname === '/app/client' ? 'tab active' : 'tab'} to="/app/gateway">
                                  <ArrowBackIcon />
                                </Link>
                                <span style={{ background: "white", padding: "18px 6px 16px 6px", borderRadius: "8px" }}>
                                  <Link
                                    className={location.pathname.toLowerCase().includes('clientlist') ? 'tab active' : 'tab'}
                                    to="/app/clientlist"
                                  >
                                    Zone&apos;s
                                  </Link>
                                  <Link
                                    className={location.pathname.toLowerCase().includes('dmalist') ? 'tab active' : 'tab'}
                                    to="/app/dmalist"
                                  >
                                    DMA&apos;s
                                  </Link>
                                  <Link
                                    className={location.pathname.toLowerCase().includes('gatewaylist') ? 'tab active' : 'tab'}
                                    to="app/gatewaylist"
                                  >
                                    Gateway&apos;s
                                  </Link>
                                  <Link
                                    className={location.pathname.toLowerCase().includes('meterlist') ? 'tab active' : 'tab'}
                                    to="app/meterlist"
                                  >
                                    Meter&apos;s
                                  </Link>
                                </span>
                              </>
                            )}
                          </span>
                        )}
                      </div>
                    </Col>

                    <Col md={5} >
                      <div style={{ display: "flex", float: "right" }}>
                        <div>
                          {['/app/client', '/app/dashboard/default', "app/gatewaylist", "/app/clientlist", "/app/dmalist", "/app/gatewaylist", "/app/meterlist"].includes(location.pathname) && (
                            <section className="seconde-section">
                              {location.pathname !== '/app/dmalist' && location.pathname !== '/app/clientlist' && location.pathname !== '/app/dmalist' && location.pathname !== '/app/gatewaylist' && location.pathname !== '/app/meterlist' && location.pathname !== '/app/client' && (
                                <div className="days-date-picker">
                                  <div>
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
                                  </div>

                                  <div className="">
                                    <button className="icon-button" onClick={toggleDatePicker}>
                                      <DateRangeIcon />
                                    </button>
                                  </div>
                                </div>
                              )}

                              {location.pathname !== '/app/gateway' && location.pathname !== '/app/dashboard/default' && location.pathname !== '/app/client' && location.pathname !== '/app/clientlist' && (
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
                              )}
                              {location.pathname !== '/app/gateway' && location.pathname !== '/app/dashboard/default' && location.pathname !== '/app/client' && location.pathname !== '/app/clientlist' && location.pathname !== '/app/dmalist' && (
                                <div style={{ marginLeft: "5px" }}>
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
                                </div>
                              )}
                              {location.pathname !== '/app/gateway' && location.pathname !== '/app/dashboard/default' && location.pathname !== '/app/client' && location.pathname !== '/app/clientlist' && location.pathname !== '/app/dmalist' && location.pathname !== '/app/gatewaylist' && (
                                <div style={{ marginLeft: "5px" }}>
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
                              )}



                            </section>

                          )}
                        </div>
                        {location.pathname !== '/app/client' &&
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
                                {/* <h4 style={{ fontWeight: "600" }}>Filters</h4> */}
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
                                        {/* <option>Select Zone</option> */}
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
                                        {/* <option>DMA</option> */}
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
                                        {/* <option>Gateways</option> */}
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
                                  // color="primary"
                                  variant="contained"
                                  style={{ flex: 1, marginLeft: '4px', backgroundColor: "#00b4eb" }}
                                >
                                  Apply
                                </Button>
                              </DialogActions>
                            </Dialog>
                          </div>
                        }
                      </div>
                    </Col>




                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      );
    }

    document.title = title + BASE_TITLE;
  }

  return <React.Fragment>{breadcrumbContent}</React.Fragment>;
};

export default Breadcrumb;

export function Date_Input({ name, placeholder, value, readOnly, setValue }) {
  const dateValue = value ? parseISO(value) : null;
  const formattedDate = isValid(dateValue) ? format(new Date(dateValue), 'yyyy-MM-dd') : '';
  return (
    <>
      <div className="total-form">
        <div className="main_label">
          <label htmlFor={name}>{placeholder}</label>
        </div>
        <div className="main-input">
          <div className="input">
            <input
              type="date"
              id={name}
              name={name}
              placeholder={placeholder}
              value={formattedDate}
              onChange={(e) => handleChange(e, setValue)}
              readOnly={readOnly}
              className=" custom-date-input"
            />
          </div>
        </div>
      </div>
    </>
  );
}

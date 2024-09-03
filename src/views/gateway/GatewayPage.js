// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import './GatewayList.scss'
// import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
// import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
// import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
// import { Col, Row } from 'react-bootstrap';
import GatewayTable from './GatewayTable';
import activeGatway from '../../assets/images/activeGateways.svg';
import totalGateway from '../../assets/images/totalGatways.svg';
import inactive from '../../assets/images/inactiveGatways.svg';
import cans from '../../assets/images/cansCommunicated.svg';
import axios from 'axios';
import { useEffect, useContext, useState } from 'react';
import { ClientsContext } from '../dashboard/context';
import Spinner from 'react-bootstrap/Spinner';
import MeterList from '../client/MeterList';
// import { useStateContext } from '../../contexts/MainContext';
// import DateRangeIcon from '@mui/icons-material/DateRange';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
// import NewDatePicker from '../../layouts/AdminLayout/Breadcrumb/NewDatePicker';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



export default function GatewayList(props) {
  const navigate = useNavigate();
  const [gatewayCardData, setGatewayCardData] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { selectedClient, zones, selectedZone, setSelectedZone, dmas, selectedDma, setSelectedDma, gateways, selectedGateway, setSelectedGateway, status, selectedStatus, setSelectedStatus } = useContext(ClientsContext);
  const [loading, setLoading] = useState(true);
  const [isTab, setIsTab] = useState(false);

  const [gatewayIdClick, setGatewayIdClick] = useState(false);
  // const { onDateChange, selectedDate, setSelectedDate, isDatePickerOpen, toggleDatePicker }
  //   = useStateContext();




  useEffect(() => {
    if (props && props.isTab == true) setIsTab(true)
  }, [])


  useEffect(() => {

    fetchCardData()



  }, [selectedClient])

  const fetchCardData = async () => {
    try {
      const requestBody = {
        clientId: selectedClient
      }
      const response = await axios.post('http://49.207.11.223:3307/gateways/getGatewayCountsInGatewayDashboard', requestBody)
      console.log(response.data)
      const data = response.data
      console.log(data)
      setGatewayCardData([
        {
          type: 'Total Gateways',
          count: data.gatewayCount.totalGateways || '0',
          icon: totalGateway,
          bg: 'rgba(79, 187, 0, 0.15)'
        },
        {
          type: 'Active Gateways',
          count: data.gatewayCount.activeGateways || '0',
          icon: activeGatway,
          bg: '#FFF3E8'
        },
        {
          type: 'Inactive Gateways',
          count: data.gatewayCount.inactiveGateways || '0',
          icon: inactive,
          bg: '#FEF0F4'
        },
        {
          type: "Can's Communicated",
          count: data.gatewayCount.totalCansCommunicatedToday || '0',
          icon: cans,
          bg: '#E3F2FD'
        }
      ]);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  const onClickGateWay = () => {
    console.log('Gateway')
    setGatewayIdClick(true);
  }

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
    // navigate('/app/meterlist');
    const dataToSend = { id: 4 };
    navigate("/app/client", { state: dataToSend })
  };

  const ArrowBack = () => {
    console.log("click")
    setGatewayIdClick(false)
  }

  return (
    <>

      {!gatewayIdClick ?
        <section className='gateway-component'>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ fontWeight: '700' }}>Gateways</h3>
            </div>
            <div style={{ display: "flex" }}>
              {/* <div className="days-date-picker">
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
              </div> */}
              <div style={{ marginLeft: "10px", marginTop: "3px" }}>
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
                  {/* <DialogTitle>
                    <h4 style={{ fontWeight: "600" }}>Filters</h4>
                  </DialogTitle> */}
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
            </div>
          </div>

          {
            !isTab ?
              <div>
                {loading ? ( // Display spinner if loading is true
                  <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <Spinner animation="border" variant="primary" />
                  </div>
                ) : (
                  <div className='gateway-list mt-4'>
                    {gatewayCardData && gatewayCardData.map((item) => {
                      return (
                        <div key={item.type} className='gateway-card'>
                          <div className='type-icon'>
                            <img src={item.icon} alt={item.type} style={{ background: item.bg }} />
                            <span>{item.type}</span>
                          </div>
                          <div className='count' style={{ marginLeft: "10px" }}>
                            <span>{item.count}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              : ""}

          <div style={{ marginTop: "20px" }}>
            <GatewayTable onClickGateWay={onClickGateWay} gatewayIdClick={gatewayIdClick} />
          </div>
        </section>

        :
        <section className='gateway-component'>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
            <div style={{ display: "flex", textAlign: "center" }}>
              <ArrowBackIcon style={{ color: "black", marginRight: "20px" }} onClick={ArrowBack} />
              <h4 style={{ fontWeight: '600' }}>Meter's List</h4>
            </div>
            <div style={{ display: "flex" }}>
              <div className="form-group selectcustom" style={{ width: "100%" }}>
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
                  {/* <DialogTitle>
                    <h4 style={{ fontWeight: "600" }}>Filters</h4>
                  </DialogTitle> */}
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
            </div>
          </div>
          <MeterList />
        </section>}
    </>

  );
}

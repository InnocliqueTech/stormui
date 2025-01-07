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
import { BASE_API_URL1 } from '../../config/constant';
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
  const { selectedClient, zones, selectedZone, setSelectedZone, dmas, selectedDma, setSelectedDma, gateways, selectedGateway, setSelectedGateway, status, selectedStatus, setSelectedStatus,setSelectedClient } = useContext(ClientsContext);
  const [loading, setLoading] = useState(true);
  const [isTab, setIsTab] = useState(false);

  const [gatewayIdClick, setGatewayIdClick] = useState(false);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const [filteredmeterData, setFiteredMeterData] = useState([]);
  // const { onDateChange, selectedDate, setSelectedDate, isDatePickerOpen, toggleDatePicker }
  //   = useStateContext();




  useEffect(() => {
    if (props && props.isTab == true) setIsTab(true)
    handleClickRefresh(0,false)
  }, [])


  useEffect(() => {
    fetchCardData()
  }, [selectedClient])

// Function to fetch gateway card data and update the state for rendering
const fetchCardData = async () => {
  try {
    // Prepare the request body for the API call
    const requestBody = {
      clientId: selectedClient // Use the selected client ID for the API request
    };

    // Make a POST request to the API to fetch gateway counts
    const response = await axios.post('http://49.207.11.223:3307/gateways/getGatewayCountsInGatewayDashboard', requestBody);

    console.log(response.data); // Log the entire response data for debugging
    const data = response.data; // Extract the response data
    console.log(data); // Log the parsed data for additional debugging

    // Update the state with an array of card data for the dashboard
    setGatewayCardData([
      {
        type: 'Total Gateways', // Label for the card
        count: data.gatewayCount.totalGateways || '0', // Fetch total gateways or default to '0'
        icon: totalGateway, // Icon to represent the total gateways
        bg: 'rgba(79, 187, 0, 0.15)' // Background color for this card
      },
      {
        type: 'Active Gateways', // Label for the card
        count: data.gatewayCount.activeGateways || '0', // Fetch active gateways or default to '0'
        icon: activeGatway, // Icon to represent active gateways
        bg: '#FFF3E8' // Background color for this card
      },
      {
        type: 'Inactive Gateways', // Label for the card
        count: data.gatewayCount.inactiveGateways || '0', // Fetch inactive gateways or default to '0'
        icon: inactive, // Icon to represent inactive gateways
        bg: '#FEF0F4' // Background color for this card
      },
      {
        type: "Can's Communicated", // Label for the card
        count: data.gatewayCount.totalCansCommunicatedToday || '0', // Fetch CANs communicated today or default to '0'
        icon: cans, // Icon to represent communicated CANs
        bg: '#E3F2FD' // Background color for this card
      }
    ]);

    // Set loading to false once the data is successfully fetched and processed
    setLoading(false);
  } catch (error) {
    // Log any errors encountered during the API call or data processing
    setLoading(false);
    console.error(error);
  }
};

const handleGateWayChange = (e) =>{
  setSelectedGateway(Number(e.target.value))
  handleClickRefresh(Number(e.target.value))
}

const handleItemsPerPageChange = (e) => {
  setItemsPerPage(Number(e));
  setCurrentPage(1); 
  getDashboardData(1, e);
};

const handleClickRefresh = (gId,getData=true) => {
  setSelectedClient(1);
  setSelectedZone(0);
  setSelectedDma(0);
  setSelectedStatus(0);
  setCurrentPage(1);
  setSelectedGateway(0);
  let zId = 0;
  let dId = 0;
  
  let _gId = typeof gId !== "undefined" ? gId : selectedGateway || 0;
  if(getData) getDashboardData(1, itemsPerPage, zId, dId,_gId);
};

const handlePageChange = (newPage) => {
  setCurrentPage(newPage);
  console.log(newPage);
  getDashboardData(newPage, itemsPerPage);
};

const getDashboardData = async (currentPage, itemsPerPage, zoId, dmaId,gId) => {
  const startIndex = (currentPage - 1) / itemsPerPage;
  try {
    setLoading(true);
    const requestBody = {
      status: selectedStatus,
      clientId: selectedClient || 1,
      zoneId: zoId ? zoId : 0,
      dmaId: dmaId ? dmaId : 0,
      gatewayId: typeof gId !== "undefined" ? gId : selectedGateway || 0,
      startIndex: startIndex,
      rowCount: itemsPerPage
    };
    const response = await axios.post(`${BASE_API_URL1}meters/getAllMetersWithClientIdZoneIdAndDmaId`, requestBody);
    setTotalItems(response.data.totalCount);
    const meters = response.data.meters || [];
    setFiteredMeterData(meters.slice(0, itemsPerPage));
    setLoading(false);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    setLoading(false);
  }
};

  const onClickGateWay = (zoneId, dmaId, gatewayId) => {
    setGatewayIdClick(true);
    setSelectedGateway(gatewayId);
    getDashboardData(currentPage,itemsPerPage,zoneId,dmaId,gatewayId)
  }

  const handleFilterIconClick = () => {
    setIsDialogOpen(true);
    // const dataToSend = { id: 3 };
    // navigate("/app/client", { state: dataToSend })

  };
  const handleDialogReset = () => {
    setSelectedZone(0);
    setSelectedDma(0);
    setSelectedGateway(0);
    setSelectedStatus(0);
  };


  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };


  const handleDialogApply = () => {
    setIsDialogOpen(false);
    const dataToSend = { id: 3 };
    navigate("/app/client", { state: dataToSend })
  };

  const ArrowBack = () => {
    console.log("click")
    setGatewayIdClick(false)
    setSelectedGateway(0);

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
                            onChange={(e) => setSelectedGateway(Number(e.target.value))} style={{width:"14rem"}}>
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
              <ArrowBackIcon style={{ color: "black", marginRight: "20px", cursor:"pointer" }} onClick={ArrowBack} />
              <h4 style={{ fontWeight: '600' }}>Meters</h4>
            </div>
            <div style={{ display: "flex" }}>
              <div className="form-group selectcustom" style={{ width: "100%" }}>
                <select className="form-control" value={selectedGateway ? selectedGateway : 0}
                  onChange={handleGateWayChange} style={{width:"14rem"}}>
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
                            onChange={(e) => setSelectedGateway(Number(e.target.value))} style={{width:"14rem"}}>
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
          <MeterList 
            meterData={filteredmeterData}
            totalItems={totalItems}
            load={loading}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            handlePage={handlePageChange}
            handleClickRef={handleClickRefresh}
            handleItemsPerPage={handleItemsPerPageChange}
          />
        </section>}
    </>

  );
}

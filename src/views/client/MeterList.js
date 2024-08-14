import React, { useContext, useEffect, useState } from 'react';
// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
// import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
// import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
// import AutorenewIcon from '@mui/icons-material/Autorenew';
import { Col, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Link } from '@mui/material';
// import { MoreVert } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Meter from './Meter';
import axios from 'axios';
import { BASE_API_URL1 } from '../../config/constant';
import { ClientsContext } from '../dashboard/context/index';
import Spinner from 'react-bootstrap/Spinner';
import Paginations from '../../components/Paginatons';
import { useLocation } from 'react-router-dom';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const MeterList = () => {
  const location = useLocation();
  const { selectedClient,
    selectedZone,
    selectedDma,
    selectedGateway,
    selectedStatus,
    setSelectedZone,
    setSelectedDma,
    setSelectedGateway,
    setSelectedStatus,
    setSelectedClient
  } = useContext(ClientsContext);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");

  // const [fullWidth] = useState(true);
  // const { clients } = useContext(ClientsContext);
  const [meterList, setMeterList] = useState([]);
  const [loading, setLoading] = useState(true);
  // Assuming these are your filters' state variables
  // const [selectedClient, setSelectedClient] = useState('');
  // const [selectedZone, setSelectedZone] = useState(0);
  // const [selectedDma, setSelectedDma] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [totalItems, setTotalItems] = useState(0);
  const { zoneId, dmaId, gatewayId } = location.state || { zoneId: selectedZone, dmaId: selectedDma, gatewayId: selectedGateway, status: selectedStatus };
  console.log('location.state:', location.state);
  console.log('zoneId:', zoneId);
  console.log('dmaId:', dmaId);
  console.log('gatewayId:', gatewayId);


  useEffect(() => {
    getDashboardData()
  }, [currentPage, itemsPerPage, selectedClient, selectedZone, selectedDma, selectedGateway, selectedStatus])

  // const getDashboardData = async () => {
  //   const clientId = selectedClient
  //   const startIndex = (currentPage - 1) * itemsPerPage;
  //   try {
  //     setLoading(true);
  //     const requestBody = {
  //       status: selectedStatus || 0,
  //       clientId: clientId || 0,
  //       zoneId: zoneId || 0,
  //       dmaId: dmaId || 0,
  //       gatewayId: gatewayId || 0,
  //       startIndex: startIndex,
  //       rowCount: itemsPerPage
  //     }

  //     console.log(requestBody)
  //     const response = await axios.post(`${BASE_API_URL1}meters/getAllMetersWithClientIdZoneIdAndDmaId`, requestBody);
  //     console.log(response)
  //     setMeterList(response.data.meters || []);
  //     setTotalItems(response.data.totalCount);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     setLoading(false);

  //   }
  // };


  const getDashboardData = async () => {
    const clientId = selectedClient || 0; // Default to 0 if selectedClient is null or undefined
    const status = selectedStatus || 0;   // Default to 0 if selectedStatus is null or undefined
    const zoneId = selectedZone || 0;     // Default to 0 if selectedZone is null or undefined
    const dmaId = selectedDma || 0;       // Default to 0 if selectedDma is null or undefined
    const gatewayId = selectedGateway || 0; // Default to 0 if selectedGateway is null or undefined

    const startIndex = (currentPage - 1) * itemsPerPage;

    try {
      setLoading(true);
      const requestBody = {
        status: status,
        clientId: clientId,
        zoneId: zoneId,
        dmaId: dmaId,
        gatewayId: gatewayId,
        startIndex: startIndex,
        rowCount: itemsPerPage
      }

      console.log(requestBody);
      const response = await axios.post(`${BASE_API_URL1}meters/getAllMetersWithClientIdZoneIdAndDmaId`, requestBody);
      console.log(response);
      setMeterList(response.data.meters || []);
      console.log(response.data.totalCount);
      setTotalItems(response.data.totalCount);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };
  const handleClickOpen = (e, data) => {
    setOpen(true);
    setData(data)
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };
  const totalPagesCount = Math.ceil(totalItems / itemsPerPage);

  // const [refreshData, setRefrehData] = useState([]);

  const handleClickRefresh = () => {
    setSelectedClient(1);
    setSelectedZone(0);
    setSelectedDma(0);
    setSelectedGateway(0);
    setSelectedStatus(0);

    // Call getDashboardData to fetch updated data with reset values
    getDashboardData();
  }


  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active':
        return { backgroundColor: 'rgba(47, 182, 23, 1)', color: '#fff' };
      case 'Inactive':
        return { backgroundColor: 'rgba(255, 0, 0, 1)', color: '#fff' };
      default:
        return { backgroundColor: 'rgba(128, 128, 128, 1)', color: '#fff' }; // Default color for other statuses
    }
  };

  return (
    <div className='col-md-12'>
      <div className="d-flex justify-content-around row">
        <div className="col-md-6 col-sm-12 col-12">
          <nav className='d-flex' style={{ width: 'auto' }}>
          </nav>

        </div>
      </div>
      <div style={{ backgroundColor: '#fff', padding: 16, borderRadius: 10, paddingBottom: 100 }}>
        <Row style={{ marginBottom: '14px' }}>
          <Col md={9} sm={7} xs={7}>
            <Row>
              <Col md={9} sm={7} xs={7}>
                <span style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>Meter List</span>
              </Col>

            </Row>
          </Col>
          <Col md={2}></Col>
          <Col md={1}>
            <CachedOutlinedIcon
              style={{ color: '#6C757D', marginBottom: '5px', marginRight: '400px', cursor: 'pointer' }}
              onClick={handleClickRefresh}
            />
          </Col>
        </Row>

        <div className='customer-table mt-0'>
          {/* <Row style={{ marginBottom: '24px' }}>
              <Col md={9} sm={7} xs={7}>
                <div className='pagination-controls' style={{marginLeft:"10px", marginTop:"10px"}}>
                  <label htmlFor='itemsPerPage' style={{ fontWeight: '500', color: 'black', fontSize: '18px' }}>Items per page:</label><nsbp /><nsbp />
                  <select id='itemsPerPage' value={itemsPerPage} onChange={handleItemsPerPageChange} style={{ marginLeft: '8px' }}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                </div>
              </Col>
              <Col md={3} sm={5} xs={5} style={{ textAlign: 'end' }}>
                <CachedOutlinedIcon style={{ color: '#6C757D', marginTop:"10px", marginRight:"10px" }} onClick={handleClickRefresh}/>               
              </Col>
            </Row> */}

          {loading ? (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <>

              <Table style={{ borderRadius: 8 }}>
                <thead>
                  <tr>
                    <th className='tablehead'>CAN No</th>
                    <th className='tablehead'>Meter Id</th>
                    <th className='tablehead'>Gateway Id</th>
                    <th className='tablehead'>DEVEUI</th>
                    <th className='tablehead'>Zone no</th>
                    <th className='tablehead'>DMA no</th>
                    <th className='tablehead'>Timestamp</th>
                    <th className='tablehead'>Reading</th>
                    <th className='tablehead'>Consum (in KL)</th>
                    <th className='tablehead'>Status</th>
                    <th className='tablehead'>Battery Life</th>
                    <th className='tablehead'>Remarks</th>
                    {/* <th className='tablehead'>Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {meterList.map((meter) => (
                    <tr key={meter.meterId}>
                      <td className='tablecontent-link'>
                        <Link
                          key={meter.meterId}
                          state={{ zoneId: zoneId, dmaId: dmaId, gatewayId: gatewayId, meterId: meter.meterId }}

                          onClick={(e) => handleClickOpen(e, meter)}
                          style={{ textDecoration: 'none', cursor: 'pointer' }}>
                          {meter.canNo}
                        </Link>
                      </td>
                      <td className='tablecontent'>  {meter.meterId}</td>
                      <td className='tablecontent'>{meter.gatewayId}</td>
                      <td className='tablecontent'>{meter.deveui}</td>
                      <td className='tablecontent'>
                        <span style={{ backgroundColor: '#E3F2FD', padding: 8, paddingLeft: 20, paddingRight: 20, borderRadius: 20, color: '#1565C0', fontWeight: '600' }}>Zone {meter.zoneNo}</span>
                      </td>
                      <td className='tablecontent'>
                        <span style={{ backgroundColor: '#E3F2FD', padding: 8, paddingLeft: 20, paddingRight: 20, borderRadius: 20, color: '#1565C0', fontWeight: '600' }}>DMA {meter.dmaNo}</span>
                      </td>
                      <td className='tablecontent'>{new Date(meter.timestamp).toLocaleString()}</td>
                      <td className='tablecontent'>
                        <span style={{ backgroundColor: '#F4F5F5', padding: 8, paddingLeft: 20, paddingRight: 20, borderRadius: 20, color: '#6C757D' }}>{meter.reading}</span>
                      </td>
                      <td className='tablecontent'>{meter.consumed}</td>
                      <td className='tablecontent'>
                        <span style={{ ...getStatusStyle(meter.status), padding: '8px 20px' }}>
                          {meter.status}
                        </span>
                      </td>
                      <td className='tablecontent'>{meter.batteryLife}</td>
                      <td className='tablecontent'>{meter.remarks}</td>
                      {/* <td className='tablecontent'><MoreVert style={{ color: '#D6D9DC' }} /></td> */}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
          {/* Pagination controls, items per page selector, and refresh icon */}
      

        </div>
        <div className='row mt-3'>
            <div className='col-md-5'>
              <div className='pagination-controls' style={{ marginLeft: '10px' }}>
                <label htmlFor='itemsPerPage' style={{ fontWeight: '500', color: 'black', fontSize: '18px' }}>
                  Items per page:
                </label>
                <select
                  id='itemsPerPage'
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  style={{ marginLeft: '8px' }}>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
              </div>
            </div>
            <div className='col-md-7'>
              <div style={{ textAlign: 'center' }}>
                <Paginations
                  currentPage={currentPage}
                  totalPages={totalPagesCount}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        {/* <div style={{ textAlign: 'center', marginTop: '40PX' }}>
          <Paginations
            currentPage={currentPage}
            totalPages={Math.ceil(totalItems / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </div> */}
      </div>
      {/* <BootstrapDialog  onClose={handleClose}   aria-labelledby="customized-dialog-title"
        open={open}>
          <h1>test</h1>

      </BootstrapDialog> */}

      {/* Meter Details Dialog */}
      <BootstrapDialog
        maxWidth="md" // Options: 'xs', 'sm', 'md', 'lg', 'xl'
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      // fullWidth={fullWidth}
      // className='clientpopup'
      >
        <Row container style={{ backgroundColor: '#000' }}>
          <Col md={10} sm={12} xs={10}>
            <DialogTitle style={{ color: '#fff' }} sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              Meter Details
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
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </Col>
        </Row>
        <Meter data={data} />
      </BootstrapDialog>
    </div>
  );
};

export default MeterList;

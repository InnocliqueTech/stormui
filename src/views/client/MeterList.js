import React, { useContext, useEffect, useState } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { Col, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Link } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
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
  const { selectedClient, selectedZone } = useContext(ClientsContext);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");

  // const [fullWidth] = useState(true);
  // const { clients } = useContext(ClientsContext);
  const [zonesList, setZonesList] = useState([]);
  const [loading, setLoading] = useState(true);
  // Assuming these are your filters' state variables
  // const [selectedClient, setSelectedClient] = useState('');
  // const [selectedZone, setSelectedZone] = useState(0);
  // const [selectedDma, setSelectedDma] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [totalItems, setTotalItems] = useState(0);
  const { zoneId, dmaId, gatewayId } = location.state || { zoneId: selectedZone, dmaId: 0, gatewayId: 0 };
  console.log('location.state:', location.state);
  console.log('zoneId:', zoneId);
  console.log('dmaId:', dmaId);
  console.log('gatewayId:', gatewayId);
  // useEffect(() => {
  //   if (clients && clients.length > 0) {
  //     getDashboardData(clients[0].clientId); // Fetch data for initial client
  //   }
  // }, [clients]);

  useEffect(() => {
    getDashboardData()
  }, [currentPage, itemsPerPage])

  const getDashboardData = async () => {
    const clientId = selectedClient
    const startIndex = (currentPage - 1) * itemsPerPage;
    try {
      setLoading(true);
      const requestBody = {
        clientId: clientId,
        zoneId: zoneId,
        dmaId: dmaId,
        gatewayId: gatewayId,
        startIndex: startIndex,
        rowCount: itemsPerPage
      }
    
      console.log(requestBody)
      const response = await axios.post(`${BASE_API_URL1}meters/getAllMetersWithClientIdZoneIdAndDmaId`, requestBody);
      console.log(response)
      setZonesList(response.data.meters || []);
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

  // const handleClientChange = (event) => {
  //   setSelectedClient(event.target.value);
  // };

  // const handleZoneChange = (event) => {
  //   setSelectedZone(event.target.value);
  // };

  // const handleDmaChange = (event) => {
  //   setSelectedDma(event.target.value);
  // };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const offset = (currentPage - 1) * itemsPerPage;
  const currentPageData = zonesList.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(zonesList.length / itemsPerPage);

  return (
    <div className='col-md-12'>
      <div className="d-flex justify-content-around row">
        <div className="col-md-6 col-sm-12 col-12">
          <nav className='d-flex' style={{ width: 'auto' }}>
            {/* <ol className="breadcrumb zone-breadcrum"> */}
            {/* <li className="breadcrumb-item"><a href="#">Clients</a></li>
              <li className="breadcrumb-item"><a href="#">Zones</a></li>
              <li className="breadcrumb-item"><a href="#">DMA’s</a></li>
              <li className="breadcrumb-item"><a href="#">Meters</a></li> */}
            {/* </ol> */}
          </nav>

        </div>
        {/* <div className="d-flex justify-content-end col-md-6 col-sm-12 col-12" style={{ marginTop: '12px' }}>
          <div className="row days-filter float-end">
            <div className="col-md-12 d-flex">
              <div className="form-group selectcustom me-2" style={{ width: '160px' }}>
                <select className="form-control" value={selectedClient} onChange={handleClientChange}>
                  <option value="">Select Client</option>
                  <option value="All">All</option>
                  <option value="KSCCL-WATER">KSCCL-WATER</option>
                  <option value="TEST_ABP_01">TEST_ABP_01</option>
                </select>
              </div>
              <div className="form-group selectcustom me-2" style={{ width: '160px' }}>
                <select className="form-control" value={selectedZone} onChange={handleZoneChange}>
                  <option value="">Select Zone</option>
                  <option value="All">All</option>
                  <option value="KSCCL-WATER">KSCCL-WATER</option>
                  <option value="TEST_ABP_01">TEST_ABP_01</option>
                </select>
              </div>
              <div className="form-group selectcustom me-2" style={{ width: '160px' }}>
                <select className="form-control" value={selectedDma} onChange={handleDmaChange}>
                  <option value="">Select DMA</option>
                  <option value="All">All</option>
                  <option value="KSCCL-WATER">KSCCL-WATER</option>
                  <option value="TEST_ABP_01">TEST_ABP_01</option>
                </select>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <div style={{ backgroundColor: '#fff', padding: 16, borderRadius: 10, paddingBottom: 100 }}>
        <Row style={{ marginBottom: '24px' }}>
          <Col md={9} sm={7} xs={7}>
            <Row>
              <Col md={9} sm={7} xs={7}>
                <span style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>Meter List</span>
                <span style={{ textAlign: 'end' }}>
                  <InfoOutlinedIcon style={{ height: 20, width: 20, justifyContent: 'center', color: '#D6D9DC', marginLeft: 5 }} />
                </span>
              </Col>
            </Row>
          </Col>
          <Col md={3} sm={5} xs={5} style={{ textAlign: 'end' }}>
            <CachedOutlinedIcon style={{ color: '#6C757D' }} />
            <FilterAltOutlinedIcon style={{ color: '#6C757D', marginLeft: 20, marginRight: 20 }} />
            <FileUploadOutlinedIcon style={{ color: '#6C757D' }} />
          </Col>
        </Row>

        <div className='customer-table mt-0'>
          <div className='pagination-controls' style={{ marginTop: '20px', marginLeft: '10PX' }}>
            <label htmlFor='itemsPerPage' style={{ fontWeight: '500', color: 'black', fontSize: '18px' }}>Items per page:</label><nsbp /><nsbp />
            <select id='itemsPerPage' value={itemsPerPage} onChange={handleItemsPerPageChange} style={{ marginLeft: '8px' }}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
          {loading ? ( // Display spinner if loading is true
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
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
                  <th className='tablehead'>Action</th>
                </tr>
              </thead>
              <tbody>
                {zonesList.map((meter) => (
                  <tr key={meter.meterId}>
                    <td className='tablecontent'>
                      <Link
                        key={meter.meterId}
                        state={{ zoneId: zoneId, dmaId: dmaId, gatewayId: gatewayId, meterId: meter.meterId }}

                        onClick={(e) => handleClickOpen(e, meter)}
                        style={{ textDecoration: 'none', cursor: 'pointer', color: '#212121 !important' }}>
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
                      <span style={{ backgroundColor: 'rgba(47, 182, 23, 1)', padding: 8, paddingLeft: 20, paddingRight: 20, color: '#fff' }}>{meter.status}</span>
                    </td>
                    <td className='tablecontent'>{meter.batteryLife}</td>
                    <td className='tablecontent'>{meter.remarks}</td>
                    <td className='tablecontent'><MoreVert style={{ color: '#D6D9DC' }} /></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
        <div style={{ textAlign: 'center', marginTop: '40PX' }}>
          <Paginations
            currentPage={currentPage}
            totalPages={Math.ceil(totalItems / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
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

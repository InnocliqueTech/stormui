import React from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { Col, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Link } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import Paginations from '../../components/Paginatons';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Meter from './Meter';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function MeterList() {
    const [open, setOpen] = React.useState(false);
    const [fullWidth] = React.useState(true);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    
    return (
        <div className='col-md-12'>
            <div className="d-flex justify-content-around row">
                <div className="col-md-6 col-sm-12 col-12">
                <nav className='d-flex' style={{width:'auto'}}>
                    <ol className="breadcrumb  zone-breadcrum">
                    <li className="breadcrumb-item"><a href="#">Clients</a></li>
                    <li className="breadcrumb-item"><a href="#">Zones</a></li>
                    <li className="breadcrumb-item"><a href="#">DMA’s</a></li>
                    <li className="breadcrumb-item"><a href="#">Meters</a></li>
                    </ol>
                </nav>
                <div className="inner-heading"  style={{marginBottom:'24px'}}>
                    <a >KSCCL-WATER-SUPPLY-OTAA</a>
                </div>
                </div>
                <div className="d-flex justify-content-end col-md-6 col-sm-12 col-12" style={{marginTop:'12px'}}>
                <div className="row days-filter float-end">
                    <div className="col-md-12 d-flex">
                        <div className="form-group selectcustom me-2" style={{width:'160px'}}>
                            <select className="form-control">
                            <option>Select Client</option>
                            <option>All</option>
                            <option>KSCCL-WATER ..</option>
                            <option>TEST_ABP_01</option>
                            </select>
                        </div>
                        <div className="form-group selectcustom me-2" style={{width:'160px'}}>
                            <select className="form-control">
                            <option>Select Zone1</option>
                            <option>All</option>
                            <option>KSCCL-WATER ..</option>
                            <option>TEST_ABP_01</option>
                            </select>
                        </div>
                        <div className="form-group selectcustom me-2" style={{width:'160px'}}>
                            <select className="form-control">
                            <option>Select DMA1</option>
                            <option>All</option>
                            <option>KSCCL-WATER ..</option>
                            <option>TEST_ABP_01</option>
                            </select>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div style={{ backgroundColor: '#fff', padding: 16, borderRadius: 10, paddingBottom: 100 }}>
        <Row style={{marginBottom:'24px'}}>
          <Col md={9} sm={7} xs={7}>
            <Row>
                <Col md={9} sm={7} xs={7}>
                    <span style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>Meter List</span> <span style={{ textAlign: 'end' }}><InfoOutlinedIcon style={{ height: 20, width: 20, justifyContent: 'center', color: '#D6D9DC', marginLeft: 5 }} /></span>
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
          <Table style={{ borderRadius: 8 }}>
            <thead>
                <tr>
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
                <tr>
                    <td className='tablecontent'>
                        <Link onClick={handleClickOpen} style={{ textDecoration: 'none', cursor: 'pointer', color: '#212121' }} >1941472 </Link>
                    </td>
                    <td className='tablecontent'>0fnjckdy778t7y6778</td>
                    <td className='tablecontent'>0fnjckdy778t7y6778</td>
                    <td className='tablecontent'>
                        <span style={{ backgroundColor: '#E3F2FD', padding: 8, paddingLeft: 20, paddingRight: 20, borderRadius: 20, color: '#1565C0', fontWeight:'600' }}>Zone</span>
                    </td>
                    <td className='tablecontent'>
                        <span style={{ backgroundColor: '#E3F2FD', padding: 8, paddingLeft: 20, paddingRight: 20, borderRadius: 20, color: '#1565C0', fontWeight:'600' }}>#1472</span>
                    </td>
                    <td className='tablecontent'>02/05/2024 16:40:28</td>
                    <td className='tablecontent'>
                        <span style={{ backgroundColor: '#F4F5F5', padding: 8, paddingLeft: 20, paddingRight: 20, borderRadius: 20, color: '#6C757D' }}>0</span>
                    </td><td className='tablecontent'>675</td>
                    <td className='tablecontent'>
                        <span style={{ backgroundColor: 'rgba(47, 182, 23, 1)', padding: 8, paddingLeft: 20, paddingRight: 20, color: '#fff' }}>Active</span>
                    </td>
                    <td className='tablecontent'>OxFE</td>
                    <td className='tablecontent'>Null</td>
                    <td className='tablecontent'><MoreVert style={{ color: '#D6D9DC' }} /></td>
                </tr>
            </tbody>
          </Table>
        </div>
        <Paginations />
      </div>
            
            {/* ------------------------meter list--------------------------------------- */}
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth={fullWidth}
                className='clientpopup'
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
                <Meter />
            </BootstrapDialog>
        </div>
    );
}

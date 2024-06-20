import * as React from 'react';
// import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Card, Checkbox, Link } from '@mui/material';
import { Col, Row } from 'react-bootstrap';
import { CachedOutlined, FileUploadOutlined } from '@mui/icons-material';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Paginations from '../../components/Paginatons';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

let active = 1;
let items = [];
for (let number = 1; number <= 5; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>,
  );
}
export default function GatewayTable() {
  const [open, setOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div style={{marginBottom:100}}>
      <Table responsive style={{ marginTop: 30, borderRadius: 10, border: '1px solid #ccc' }}>
        <thead style={{ backgroundColor: '#F4F5F5' }}>
          <tr>
            <th className='tablehead'><Checkbox /></th>
            <th className='tablehead'>Gateway ID</th>
            <th className='tablehead'>Gateway Name</th>
            <th className='tablehead'>Region</th>
            <th className='tablehead'>Subnet</th>
            <th className='tablehead'>Gateway</th>
            <th className='tablehead'>Online Status</th>
            <th className='tablehead'>Connection</th>
            <th className='tablehead'>Creator</th>
            <th className='tablehead'>Last Stats Seen</th>
            <th className='tablehead'>Tag</th>
            <th className='tablehead'>Remarks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='tablecontent'><Checkbox /></td>
            <td className='tablecontent'>
              <Link style={{textDecoration:'none', cursor:'pointer', color:'#212121' }}   onClick={handleClickOpen}>0xF04CD5FFFE01B1A9 </Link></td>
            <td className='tablecontent'>Stormenergys</td>
            <td className='tablecontent'>GW12_KSCCL_01BDEE</td>
            <td className='tablecontent'>
              <span style={{ backgroundColor: '#E3F2FD', padding: 8, paddingLeft: 20, paddingRight: 20, borderRadius: 20, color: '#1565C0' }}>IN865</span></td>
            <td className='tablecontent'>CH_00-07</td>
            <td className='tablecontent'>RHF2S208</td>
            <td className='tablecontent'>
              <span style={{ backgroundColor: 'rgba(47, 182, 23, 1)', padding: 8, paddingLeft: 20, paddingRight: 20, color: '#fff' }}>Active</span>
            </td>
            <td className='tablecontent'>MQTT</td>
            <td className='tablecontent'>2024-05-02 16:40:28:27</td>
            <td className='tablecontent'>-</td>
            <td className='tablecontent'>GW12_KSCCL_0DEE</td>
          </tr>

          <tr>
            <td className='tablecontent'><Checkbox /></td>
            <td className='tablecontent'>
              <Link style={{textDecoration:'none', cursor:'pointer', color:'#212121' }}   onClick={handleClickOpen}>0xF04CD5FFFE01B1A9 </Link></td>
            <td className='tablecontent'>Stormenergys</td>
            <td className='tablecontent'>GW12_KSCCL_01BDEE</td>
            <td className='tablecontent'>
              <span style={{ backgroundColor: '#E3F2FD', padding: 8, paddingLeft: 20, paddingRight: 20, borderRadius: 20, color: '#1565C0' }}>IN865</span></td>
            <td className='tablecontent'>CH_00-07</td>
            <td className='tablecontent'>RHF2S208</td>
            <td className='tablecontent'>
              <span style={{ backgroundColor: 'rgba(47, 182, 23, 1)', padding: 8, paddingLeft: 20, paddingRight: 20, color: '#fff' }}>Active</span>
            </td>
            <td className='tablecontent'>MQTT</td>
            <td className='tablecontent'>2024-05-02 16:40:28:27</td>
            <td className='tablecontent'>-</td>
            <td className='tablecontent'>GW12_KSCCL_0DEE</td>
          </tr>

          <tr>
            <td className='tablecontent'><Checkbox /></td>
            <td className='tablecontent'>
              <Link style={{textDecoration:'none', cursor:'pointer', color:'#212121' }}   onClick={handleClickOpen}>0xF04CD5FFFE01B1A9 </Link></td>
            <td className='tablecontent'>Stormenergys</td>
            <td className='tablecontent'>GW12_KSCCL_01BDEE</td>
            <td className='tablecontent'>
              <span style={{ backgroundColor: '#E3F2FD', padding: 8, paddingLeft: 20, paddingRight: 20, borderRadius: 20, color: '#1565C0' }}>IN865</span></td>
            <td className='tablecontent'>CH_00-07</td>
            <td className='tablecontent'>RHF2S208</td>
            <td className='tablecontent'>
              <span style={{ backgroundColor: 'rgba(47, 182, 23, 1)', padding: 8, paddingLeft: 20, paddingRight: 20, color: '#fff' }}>Active</span>
            </td>
            <td className='tablecontent'>MQTT</td>
            <td className='tablecontent'>2024-05-02 16:40:28:27</td>
            <td className='tablecontent'>-</td>
            <td className='tablecontent'>GW12_KSCCL_0DEE</td>
          </tr>

          <tr>
            <td className='tablecontent'><Checkbox /></td>
            <td className='tablecontent'>
              <Link style={{textDecoration:'none', cursor:'pointer', color:'#212121' }}   onClick={handleClickOpen}>0xF04CD5FFFE01B1A9 </Link></td>
            <td className='tablecontent'>Stormenergys</td>
            <td className='tablecontent'>GW12_KSCCL_01BDEE</td>
            <td className='tablecontent'>
              <span style={{ backgroundColor: '#E3F2FD', padding: 8, paddingLeft: 20, paddingRight: 20, borderRadius: 20, color: '#1565C0' }}>IN865</span></td>
            <td className='tablecontent'>CH_00-07</td>
            <td className='tablecontent'>RHF2S208</td>
            <td className='tablecontent'>
              <span style={{ backgroundColor: 'rgba(47, 182, 23, 1)', padding: 8, paddingLeft: 20, paddingRight: 20, color: '#fff' }}>Active</span>
            </td>
            <td className='tablecontent'>MQTT</td>
            <td className='tablecontent'>2024-05-02 16:40:28:27</td>
            <td className='tablecontent'>-</td>
            <td className='tablecontent'>GW12_KSCCL_0DEE</td>
          </tr>
        </tbody>
      </Table>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={fullWidth}
      >

        <Row container style={{ backgroundColor: '#000' }}>
          <Col md={10} sm={12} xs={10}>
            <DialogTitle style={{ color: '#fff' }} sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              Gateway Details
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
        <Row style={{ padding: 15, justifyContent:"end" , display:"flex" }}>
          <Col md={3} xs={12} sm={12} style={{width:"144px", justifyContent:"end" , display:"flex" }}>
            <Button style={{ backgroundColor: '#1976D2', color: '#fff' }}>
              <CachedOutlined style={{ marginRight: 5 }} /> Refresh
            </Button>
          </Col>
          <Col md={2} xs={12} sm={12} style={{ marginLeft: -10 }}>
            <Button style={{ backgroundColor: '#fff', color: '#1976D2', border: '1px solid #1976D2' }}>
              <FileUploadOutlined style={{ marginRight: 5 }} />Export
            </Button>
          </Col>
          {/* <Col md={6} xs={1} sm={1}></Col> */}
          {/* <Col md={1} xs={12} sm={12} style={{ marginRight: 20 }}>
            <Button style={{ backgroundColor: '#fff', color: '#1976D2', border: '1px solid #1976D2' }}>
              <ModeEditOutline style={{ marginRight: 5 }} />Edit
            </Button>
          </Col>
          <Col md={1} xs={12} sm={12}>
            <Button style={{ backgroundColor: '#fff', color: '#DE315E', border: '1px solid #DE315E' }}>
              <DeleteOutlineOutlined style={{ marginRight: 5 }} /> Delete
            </Button>
          </Col> */}
        </Row>
        <Card style={{ margin: 10, padding: 30, paddingTop: 10 }}>
          <div style={{ fontFamily: 'inter', fontWeight: 600, fontSize: '18px' }}>Basic Details</div>
          <Row>
            <Col md={6} xs={12} sm={12}>
              <Row>
                <Col md={5} xs={6} sm={6}>
                  <div className='inter600'>id:</div>
                  <div className='inter600'>Type:</div>
                  <div className='inter600'>Subnet:</div>
                  <div className='inter600 marginTop'>Ceacon:</div>
                  <div className='inter600 marginTop'>Transmitting Power:</div>
                  <div className='inter600'>Created Time:</div>
                </Col>
                <Col md={7} xs={6} sm={6}>
                  <div className='inter400black'>#f04cd5fffe043425</div>
                  <div className='inter400black'>#f04cd5fffe043425</div>
                  <div className='inter400black'>CH_00-07</div>
                  <div className='inter400red'>Disabled</div>
                  <div className='inter400yellow'>Custom</div>
                  <div className='inter400black'>2024-05-02 16:40:28.427</div>
                </Col>
              </Row>
            </Col>
            <Col md={6} xs={12} sm={12}>
              <Row>
                <Col md={5} xs={6} sm={6}>
                  <div className='inter600'>Name:</div>
                  <div className='inter600'>Region:</div>
                  <div className='inter600 marginTop'>Beacon:</div>
                  <div className='inter600 marginTop'>GDTP:</div>
                  <div className='inter600'>HTTP:</div>
                  <div className='inter600'>Remarks:</div>
                </Col>
                <Col md={7} xs={6} sm={6}>
                  <div className='inter400black'>GW13_KSCCL_043425 </div>
                  <div className='inter400black'>IN865</div>
                  <div className='inter600red'>Disabled</div>
                  <div className='inter400black marginTop'>21</div>
                  <div className='inter400black'>http://49.207.11.223:17070</div>
                  <div className='inter400black'>GW13_KSCCL_043425</div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>

        <Card style={{ margin: 10, padding: 30, paddingTop: 10 }}>
          <div style={{ fontFamily: 'inter', fontWeight: 600, fontSize: '18px' }}>Last Frame Data</div>
          <Row>
            <Col md={6} xs={12} sm={12}>
              <Row>
                <Col md={5} xs={6} sm={6}>
                  <div className='inter600'>Dev Address:</div>
                  <div className='inter600'>Frequency(MHz):</div>
                  <div className='inter600'>SNR(dB):</div>
                  <div className='inter600'>BW(KHz):</div>
                  <div className='inter600'>GPS Time:</div>
                </Col>
                <Col md={7} xs={6} sm={6}>
                  <div className='inter400black'>01-69-FE-F6</div>
                  <div className='inter400black'>865.663</div>
                  <div className='inter400black'>-11.2</div>
                  <div className='inter400black'>125</div>
                  <div className='inter400black'>1399086378.403s</div>
                </Col>
              </Row>
            </Col>
            <Col md={6} xs={12} sm={12}>
              <Row>
                <Col md={5} xs={6} sm={6}>
                  <div className='inter600'>Type:</div>
                  <div className='inter600'>RSSI(dBm):</div>
                  <div className='inter600'>SF:</div>
                  <div className='inter600'>LoRa Mod.:</div>
                  <div className='inter600'>Remarks:</div>
                </Col>
                <Col md={7} xs={6} sm={6}>
                  <div className='inter400black'>Unconfirmed Data Up</div>
                  <div className='inter400black'>79</div>
                  <div className='inter400black'>12</div>
                  <div className='inter400green'>LoRa</div>
                  <div className='inter400black'>2024-05-02 16:40:28.427</div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </BootstrapDialog>
      <Paginations />
    </div>
  );
}
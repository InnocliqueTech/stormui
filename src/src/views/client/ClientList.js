
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { Col, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { Checkbox, Link } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import Paginations from '../../components/Paginatons';

export default function ClientList() {
    
let active = 2;
let items = [];
for (let number = 1; number <= 5; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>,
  );
}
    return (
        <div style={{backgroundColor:'#fff', padding:10, borderRadius:10,paddingTop:30, marginTop:10, paddingBottom:100}}>
        <Row>
            <Col md={9} sm={7} xs={7}>
                <span style={{ fontSize: 20, fontWeight: 'bold', color:'#000' }}>Zone List</span> <span style={{ textAlign: 'end' }}><InfoOutlinedIcon style={{ height: 20, width: 20, justifyContent: 'center', color: '#D6D9DC', marginLeft:5 }} /></span>
            </Col>
            <Col md={3} sm={5} xs={5} style={{ textAlign:'end' }}>
                <CachedOutlinedIcon style={{ color: '#6C757D' }} /> <span> <FilterAltOutlinedIcon style={{ color: '#6C757D', marginLeft:20, marginRight:20 }} /></span><span> <FileUploadOutlinedIcon style={{ color: '#6C757D' }} /></span>
            </Col>
        </Row>
        <Table responsive style={{ marginTop: 30, borderRadius: 10, border: '1px solid #ccc' }}>
        <thead style={{ backgroundColor: '#F4F5F5' }}>
          <tr>
            <th className='tablehead'><Checkbox /></th>
            <th className='tablehead'>CI Id</th>
            <th className='tablehead'>Client Name</th>
            <th className='tablehead'>Type</th>
            <th className='tablehead'>Region</th>
            <th className='tablehead'>Create Time</th>
            <th className='tablehead'>Meter</th>
            <th className='tablehead'>Status</th>
            <th className='tablehead'>SI.No</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='tablecontent'><Checkbox /></td>
            <td className='tablecontent'>
              <Link href="/app/zonelist" style={{textDecoration:'none', cursor:'pointer', color:'#212121' }} >#1472 </Link></td>
            <td className='tablecontent'>KSCCL-WATER-SUPPLY-OTTA</td>
            <td className='tablecontent'>OTAA</td>
            <td className='tablecontent'>
              <span style={{ backgroundColor: '#FFF3E8', padding: 8, paddingLeft: 20, paddingRight: 20, borderRadius: 20, color: '#FF8515' }}>IN865</span></td>
            <td className='tablecontent'>02/05/2024 16:40:28</td>
            <td className='tablecontent'>
              <span style={{ backgroundColor: '#E3F2FD', padding: 8, paddingLeft: 20, paddingRight: 20, borderRadius: 20, color: '#1565C0' }}>4500</span></td>
            <td className='tablecontent'>
              <span style={{ backgroundColor: 'rgba(47, 182, 23, 1)', padding: 8, paddingLeft: 20, paddingRight: 20, color: '#fff' }}>Active</span>
            </td>
            <td className='tablecontent'><MoreVert style={{color:'#D6D9DC'}}/></td>
          </tr>

          <tr>
            <td className='tablecontent'><Checkbox /></td>
            <td className='tablecontent'>
              <Link style={{textDecoration:'none', cursor:'pointer', color:'#212121' }} >#1472 </Link></td>
            <td className='tablecontent'>KSCCL-WATER-SUPPLY-OTTA</td>
            <td className='tablecontent'>OTAA</td>
            <td className='tablecontent'>
              <span style={{ backgroundColor: '#FFF3E8', padding: 8, paddingLeft: 20, paddingRight: 20, borderRadius: 20, color: '#FF8515' }}>IN865</span></td>
            <td className='tablecontent'>02/05/2024 16:40:28</td>
            <td className='tablecontent'>
              <span style={{ backgroundColor: '#E3F2FD', padding: 8, paddingLeft: 20, paddingRight: 20, borderRadius: 20, color: '#1565C0' }}>4500</span></td>
            <td className='tablecontent'>
              <span style={{ backgroundColor: '#D6D9DC', padding: 8, paddingLeft: 20, paddingRight: 20, color: '#FDFDFD' }}>Active</span>
            </td>
            <td className='tablecontent'><MoreVert style={{color:'#D6D9DC'}}/></td>
          </tr>

          
        </tbody>
      </Table>
      <Paginations />
        </div>
    );
}

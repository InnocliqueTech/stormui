import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { Col, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Link } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import Paginations from '../../components/Paginatons';
import { useLocation } from 'react-router-dom';


export default function ZoneList() {
  let title = '';
  const location = useLocation();
  return (
    <div style={{ backgroundColor: '#fff', padding: 10, borderRadius: 10, paddingTop: 30, marginTop: 10, paddingBottom: 100 }}>
      <Row>
        <Col md={9} sm={7} xs={7}>
          <span style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>Zone List</span> <span style={{ textAlign: 'end' }}><InfoOutlinedIcon style={{ height: 20, width: 20, justifyContent: 'center', color: '#D6D9DC', marginLeft: 5 }} /></span>
        </Col>
        <Col md={3} sm={5} xs={5} style={{ textAlign: 'end' }}>
          <CachedOutlinedIcon style={{ color: '#6C757D' }} /> <span> <FilterAltOutlinedIcon style={{ color: '#6C757D', marginLeft: 20, marginRight: 20 }} /></span><span> <FileUploadOutlinedIcon style={{ color: '#6C757D' }} /></span>
        </Col>
      </Row>
      <div className="dashheading">
        <Link className={title == "Zone List" ? "title" : location.pathname.toLowerCase().includes("list") ? "tab" : "tab active"} to={`/app/${title}`} >{title != "Zone List" ? "Zone List" : title}</Link>
        {/* {title != "Dashboard" &&
                        <span>
                          <Link className={location.pathname.toLowerCase().includes("list") ? "tab active" : "tab"} to={`/app/${title}List`} >{title} List</Link>
                        </span>
                      } */}
      </div>
      <Table responsive style={{ marginTop: 30, borderRadius: 10, border: '1px solid #ccc' }}>
        <thead style={{ backgroundColor: '#F4F5F5' }}>
          <tr>
            <th className='tablehead'>Zone/DMA ID</th>
            <th className='tablehead'>Region</th>
            <th className='tablehead'>Gateway ID</th>
            <th className='tablehead'>Last Communicaton Time</th>
            <th className='tablehead'>Reading</th>
            <th className='tablehead'>Meters</th>
            <th className='tablehead'>Status</th>
            <th className='tablehead'>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='tablecontent'>
              <Link href="/app/dmalist" style={{ textDecoration: 'none', cursor: 'pointer', color: '#212121' }} >#1472 </Link>
            </td>
            <td className='tablecontent'>
              <span style={{ backgroundColor: '#FFF3E8', padding: 8, paddingLeft: 20, paddingRight: 20, borderRadius: 20, color: '#FF8515' }}>IN865</span>
            </td>
            <td className='tablecontent'>0fnjckdy778t7y6778</td>
            <td className='tablecontent'>02/05/2024 16:40:28</td>
            <td className='tablecontent'>
              <span style={{ backgroundColor: '#E3F2FD', padding: 8, paddingLeft: 20, paddingRight: 20, borderRadius: 20, color: '#1565C0' }}>4500</span>
            </td>
            <td className='tablecontent'>
              <span style={{ backgroundColor: '#E3F2FD', padding: 8, paddingLeft: 20, paddingRight: 20, borderRadius: 20, color: '#1565C0' }}>4500</span>
            </td>
            <td className='tablecontent'>
              <span style={{ backgroundColor: 'rgba(47, 182, 23, 1)', padding: 8, paddingLeft: 20, paddingRight: 20, color: '#fff' }}>Active</span>
            </td>
            <td className='tablecontent'><MoreVert style={{ color: '#D6D9DC' }} /></td>
          </tr>




        </tbody>
      </Table>
      <Paginations />
    </div>
  );
}

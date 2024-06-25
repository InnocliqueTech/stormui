//import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { Col, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Accordion, AccordionSummary, Link } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import Paginations from '../../components/Paginatons';
// import { useLocation } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function DmaList() {
  // let title = '';
  // const location = useLocation();
  return (
    <>
      <div className="d-flex justify-content-around row">
        <div className="col-md-6 col-sm-12 col-12">
          <nav className='d-flex' style={{ width: 'auto' }}>
            <ol className="breadcrumb  zone-breadcrum">
              <li className="breadcrumb-item"><a href="#">Clients</a></li>
              <li className="breadcrumb-item"><a href="#">Zones</a></li>
              <li className="breadcrumb-item"><a href="#">DMA’s</a></li>
              <li className="breadcrumb-item active" aria-current="page">Meters</li>
            </ol>
          </nav>
          <div className="inner-heading" style={{ marginBottom: '24px' }}>
            <a>KSCCL-WATER-SUPPLY-OTAA</a>
          </div>
        </div>
        <div className="d-flex justify-content-end col-md-6 col-sm-12 col-12" style={{ marginTop: '12px' }}>
          <div className="row days-filter float-end">
            <div className="col-md-12 d-flex">
              <div className="form-group selectcustom me-2" style={{ width: '160px' }}>
                <select className="form-control">
                  <option>Select Client</option>
                  <option>All</option>
                  <option>KSCCL-WATER ..</option>
                  <option>TEST_ABP_01</option>
                </select>
              </div>
              <div className="col-md-1 col-sm-4 col-4" style={{ textAlign: 'end', width: 100 }}>
                <button className="filter" style={{ background: 'transparent', color: 'rgb(21, 101, 192)', border: '1px solid rgb(21, 101, 192)', paddingLeft: 10, paddingRight: 10, height: 48, width: 103, borderRadius: '8px' }}>
                  <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="FilterAltOutlinedIcon" style={{ color: 'rgb(21, 101, 192)' }}>
                    <path d="M7 6h10l-5.01 6.3zm-2.75-.39C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39c.51-.66.04-1.61-.79-1.61H5.04c-.83 0-1.3.95-.79 1.61"></path>
                  </svg>
                  Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#fff', padding: 16, borderRadius: 10, paddingBottom: 100 }}>
        <Row style={{ marginBottom: '24px' }}>
          <Col md={9} sm={7} xs={7}>
            <div className="col-md-3 col-sm-6 col-12">
              <div className="setting-nav zonelist-nav">
                <ul>
                  <li><a href="#">Zone List</a></li>
                  <li><a className="active" href="#">DMA’s List</a></li>
                </ul>
              </div>
            </div>
          </Col>
          <Col md={3} sm={5} xs={5} style={{ textAlign: 'end' }}>
            <CachedOutlinedIcon style={{ color: '#6C757D' }} />
            <FilterAltOutlinedIcon style={{ color: '#6C757D', marginLeft: 20, marginRight: 20 }} />
            <FileUploadOutlinedIcon style={{ color: '#6C757D' }} />
          </Col>
          {/* <Col md={9} sm={7} xs={7}>
                    <span style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>Zone List</span> <span style={{ textAlign: 'end' }}><InfoOutlinedIcon style={{ height: 20, width: 20, justifyContent: 'center', color: '#D6D9DC', marginLeft: 5 }} /></span>
                </Col>
                <Col md={3} sm={5} xs={5} style={{ textAlign: 'end' }}>
                    <CachedOutlinedIcon style={{ color: '#6C757D' }} /> <span> <FilterAltOutlinedIcon style={{ color: '#6C757D', marginLeft: 20, marginRight: 20 }} /></span><span> <FileUploadOutlinedIcon style={{ color: '#6C757D' }} /></span>
                </Col> */}
        </Row>
        <div className="dashheading">
          {/* <Link className={title == "Zone List" ? "title" : location.pathname.toLowerCase().includes("list") ? "tab" : "tab active"} to={`/app/${title}`} >{title != "Zone List" ? "Zone List" : title}</Link> */}
          {/* {title != "Dashboard" &&
                        <span>
                        <Link className={location.pathname.toLowerCase().includes("list") ? "tab active" : "tab"} to={`/app/${title}List`} >{title} List</Link>
                        </span>
                        } */}
        </div>
        <div className='customer-table mt-0'>
          <Table style={{ borderRadius: 8 }}>
            <thead style={{ backgroundColor: '#F4F5F5' }}>
              <tr>
                <th className='tablehead'></th>
                <th className='tablehead'>DMA ID</th>
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
                  <Accordion style={{boxShadow:'none'}}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >

                    </AccordionSummary>
                  </Accordion>
                </td>
                <td className='tablecontent'>
                  <Link href="/app/meterlist" style={{ textDecoration: 'none', cursor: 'pointer', color: '#212121' }} >#1472 </Link>
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
        </div>
        <Paginations />
      </div>
    </>
  );
}

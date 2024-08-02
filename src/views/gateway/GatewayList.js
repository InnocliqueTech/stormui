import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import './GatewayList.scss'
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { Col, Row } from 'react-bootstrap';
import GatewayTable from './GatewayTable';


export const GateWayList = () => {

    return(
        <div style={{ backgroundColor: '#fff', padding: 16, borderRadius: 10, marginTop: 10 }}>
        <Row>
          <Col md={9} sm={7} xs={7}>
            <span style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>Gateway Lists</span>{' '}
            {/* <span style={{ textAlign: 'end' }}>
              <InfoOutlinedIcon style={{ height: 20, width: 20, justifyContent: 'center', color: '#D6D9DC', marginLeft: 5 }} />
            </span> */}
          </Col>
          <Col md={3} sm={5} xs={5} style={{ textAlign: 'end' }}>
            <CachedOutlinedIcon style={{ color: '#6C757D' }} />{' '}
            <span>
              {' '}
              <FilterAltOutlinedIcon style={{ color: '#6C757D', marginLeft: 20, marginRight: 20 }} />
            </span>
            <span>
              {' '}
              <FileUploadOutlinedIcon style={{ color: '#6C757D' }} />
            </span>
          </Col>
        </Row>
        {/* <GatewayTable /> */}
      </div>
    )
}
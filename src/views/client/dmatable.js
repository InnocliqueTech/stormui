// import { Checkbox } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { Col, Image, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import zone from '../../assets/images/water.svg';
import refresh from '../../assets/images/refresh.svg';
import download from '../../assets/images/download.svg';
import info from "../../assets/images/info.svg"

function DmaTable() {
  return (
    <div style={{padding:10,marginTop:40, marginBottom:120, height:"500px"}}>
    <Row style={{marginBottom:24}}>
        <Col md={9} sm={7} xs={7}>
          <span style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>
            <span className='iconContainer'>
              <Image src={zone} alt="zone" className='icon' />
            </span>  DMA-wise  Supply  </span><span><Image src={info} alt="gateway" /></span>
          <span style={{ textAlign: 'end' }}></span>
        </Col>
        <Col md={3} sm={5} xs={5} style={{ textAlign: 'end' }}>
          <span style={{marginRight:20}}><Image src={refresh} alt="refresh" className='icon' /></span>
          <span style={{marginRight:10}}><Image src={download} alt="download" className='icon' /></span>
        </Col>
      </Row>
      <div className='customer-table'>
        <Table  style={{borderRadius:8}}>
          <thead>
          <tr>
              <th className='clienttablehead'>DMA Id</th>
              <th className='clienttablehead'>Gateway ID</th>
              <th className='clienttablehead'>Last Communication Time</th>
              <th className='clienttablehead'>Meters</th>
              <th className='clienttablehead'>Status</th>
              <th className='clienttablehead'>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='clienttabletext'>#DMA 1</td>
              <td className='clienttabletext'>0xF04CD5FFFE01B1A9</td>
              <td className='clienttabletext'>02/05/2024 17:32:10</td>
              <td className='clienttabletext'>
              <span style={{backgroundColor:'#E3F2FD', padding:8,paddingLeft:40, paddingRight:40, borderRadius:20,color:'#1976D2', fontWeight:600}}>5</span></td>
              <td className='clienttabletext'>
              <span style={{backgroundColor:'rgba(47, 182, 23, 1)', padding:8,paddingLeft:20, paddingRight:20, color:'#fff'}}>Active</span></td>
              <td className='clienttabletext'><MoreVert /></td>
            </tr>

            <tr>
              <td className='clienttabletext'>#DMA 1</td>
              <td className='clienttabletext'>0xF04CD5FFFE01B1A9</td>
              <td className='clienttabletext'>02/05/2024 17:32:10</td>
              <td className='clienttabletext'>
              <span style={{backgroundColor:'#E3F2FD', padding:8,paddingLeft:40, paddingRight:40, borderRadius:20,color:'#1976D2', fontWeight:600}}>5</span></td>
              <td className='clienttabletext'>
              <span style={{backgroundColor:'rgba(47, 182, 23, 1)', padding:8,paddingLeft:20, paddingRight:20, color:'#fff'}}>Active</span></td>
              <td className='clienttabletext'><MoreVert /></td>
            </tr>

            <tr>
              <td className='clienttabletext'>#DMA 1</td>
              <td className='clienttabletext'>0xF04CD5FFFE01B1A9</td>
              <td className='clienttabletext'>02/05/2024 17:32:10</td>
              <td className='clienttabletext'>
              <span style={{backgroundColor:'#E3F2FD', padding:8,paddingLeft:40, paddingRight:40, borderRadius:20,color:'#1976D2', fontWeight:600}}>5</span></td>
              <td className='clienttabletext'>
              <span style={{backgroundColor:'rgba(47, 182, 23, 1)', padding:8,paddingLeft:20, paddingRight:20, color:'#fff'}}>Active</span></td>
              <td className='clienttabletext'><MoreVert /></td>
            </tr>

          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default DmaTable;
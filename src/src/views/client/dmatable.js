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
    <div style={{padding:10,marginTop:30, marginBottom:120}}>
    <Row>
        <Col md={9} sm={7} xs={7}>
          <span style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>
            <span className='iconContainer'>
              <Image src={zone} alt="zone" className='icon' />
            </span>  DMA-wise  Consumption  </span><span><Image src={info} alt="gateway" /></span>
          <span style={{ textAlign: 'end' }}></span>
        </Col>
        <Col md={3} sm={5} xs={5} style={{ textAlign: 'end' }}>
          <span style={{marginRight:20}}><Image src={refresh} alt="refresh" className='icon' /></span>
          <span style={{marginRight:10}}><Image src={download} alt="download" className='icon' /></span>
        </Col>
      </Row>
    <Table responsive style={{marginTop:30, borderRadius:10, border:'1px solid #ccc'}}>
      <thead  style={{backgroundColor:'#F4F5F5'}}>
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
          <span style={{backgroundColor:'rgba(149, 172, 255, 0.2)', padding:8,paddingLeft:40, paddingRight:40, borderRadius:20}}>5</span></td>
          <td className='clienttabletext'>
          <span style={{backgroundColor:'rgba(47, 182, 23, 1)', padding:8,paddingLeft:20, paddingRight:20, color:'#fff'}}>Active</span></td>
          <td className='clienttabletext'><MoreVert /></td>
        </tr>

        <tr>
          <td className='clienttabletext'>#DMA 1</td>
          <td className='clienttabletext'>0xF04CD5FFFE01B1A9</td>
          <td className='clienttabletext'>02/05/2024 17:32:10</td>
          <td className='clienttabletext'>
          <span style={{backgroundColor:'rgba(149, 172, 255, 0.2)', padding:8,paddingLeft:40, paddingRight:40, borderRadius:20}}>5</span></td>
          <td className='clienttabletext'>
          <span style={{backgroundColor:'rgba(47, 182, 23, 1)', padding:8,paddingLeft:20, paddingRight:20, color:'#fff'}}>Active</span></td>
          <td className='clienttabletext'><MoreVert /></td>
        </tr>

        <tr>
          <td className='clienttabletext'>#DMA 1</td>
          <td className='clienttabletext'>0xF04CD5FFFE01B1A9</td>
          <td className='clienttabletext'>02/05/2024 17:32:10</td>
          <td className='clienttabletext'>
          <span style={{backgroundColor:'rgba(149, 172, 255, 0.2)', padding:8,paddingLeft:40, paddingRight:40, borderRadius:20}}>5</span></td>
          <td className='clienttabletext'>
          <span style={{backgroundColor:'rgba(47, 182, 23, 1)', padding:8,paddingLeft:20, paddingRight:20, color:'#fff'}}>Active</span></td>
          <td className='clienttabletext'><MoreVert /></td>
        </tr>

      </tbody>
    </Table>
    </div>
  );
}

export default DmaTable;
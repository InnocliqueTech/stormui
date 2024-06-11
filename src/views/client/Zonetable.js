// import { Checkbox } from '@mui/material';
import { Col, Image, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import zone from '../../assets/images/water_drops.svg';
import refresh from '../../assets/images/refresh.svg';
import download from '../../assets/images/download.svg';
import info from "../../assets/images/info.svg"

function ZoneTable() {
  return (
    <div style={{padding:10,marginTop:30, marginBottom:120}}>
    <Row>
        <Col md={9} sm={7} xs={7}>
          <span style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>
            <span className='iconContainer'>
              <Image src={zone} alt="zone" className='icon' />
            </span>  Zone-wise  Consumption  </span><span><Image src={info} alt="gateway" /></span>
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
          <th className='clienttablehead'>Zone Id</th>
          <th className='clienttablehead'>Gateway ID</th>
          <th className='clienttablehead'>Reading</th>
          <th className='clienttablehead'>Date</th>
          <th className='clienttablehead'>DMA</th>  
          <th className='clienttablehead'>Meters</th>          
          <th className='clienttablehead'>Consumed</th>
          <th className='clienttablehead'>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className='clienttabletext'>#Zone 1</td>
          <td className='clienttabletext'>0xF04CD5FFFE01B1A9</td>
          <td className='clienttabletext'>
          <span style={{backgroundColor:'rgba(244, 245, 245, 1)', padding:5,paddingLeft:20, paddingRight:20, borderRadius:20}}>17.875</span></td>
          <td className='clienttabletext'>02/05/24</td>
          <td className='clienttabletext'>
          <span style={{backgroundColor:'rgba(149, 172, 255, 0.2)', padding:5,paddingLeft:25, paddingRight:25, borderRadius:30}}>5</span></td>
          <td className='clienttabletext'>
          <span style={{backgroundColor:'rgba(149, 172, 255, 0.2)', padding:5,paddingLeft:25, paddingRight:25, borderRadius:20}}>5</span></td>
          <td className='clienttabletext'>
          <span className='clienttabletext'>0%</span></td>
          <td className='clienttabletext'>
          <span style={{backgroundColor:'rgba(47, 182, 23, 1)', padding:8,paddingLeft:20, paddingRight:20, color:'#fff'}}>Active</span></td>
         
        </tr>

       

      </tbody>
    </Table>
    </div>
  );
}

export default ZoneTable;
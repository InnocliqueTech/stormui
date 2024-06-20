// import { Checkbox } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import Table from 'react-bootstrap/Table';

function CustomerTable() {
  return (
    <div className='customer-table'>
      <Table responsive style={{borderRadius:8}}>
        <thead  style={{backgroundColor:'#F4F5F5'}}>
        <tr>
            <th className='clienttablehead'>#CAN</th>
            <th className='clienttablehead'>Type</th> 
            <th className='clienttablehead'>Gateway ID</th>
            <th className='clienttablehead'>Last Communication Time</th>
            <th className='clienttablehead'>Reading</th>
            <th className='clienttablehead'>Zones</th>
            <th className='clienttablehead'>Status</th>
            <th className='clienttablehead'>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='clienttabletext'>#1472</td>
            <td className='clienttabletext'>OTAA</td>
            <td className='clienttabletext'>0xF04CD5FFFE01B1A9</td>
            <td className='clienttabletext'>02/05/2024 17:32:10</td>
            <td className='clienttabletext'>
              <span style={{backgroundColor:'#f4f5f5', padding:8,paddingLeft:20, paddingRight:20, borderRadius:20}}>17.878</span></td>
            <td className='clienttabletext'>
            <span style={{backgroundColor:'rgba(149, 172, 255, 0.2)', padding:8,paddingLeft:40, paddingRight:40, borderRadius:20}}>5</span></td>
            <td className='clienttabletext'>
            <span style={{backgroundColor:'rgba(47, 182, 23, 1)', padding:8,paddingLeft:20, paddingRight:20, color:'#fff'}}>Active</span></td>
            <td className='clienttabletext'><MoreVert /></td>
          </tr>

          <tr>
            <td className='clienttabletext'>#1472</td>
            <td className='clienttabletext'>OTAA</td>
            <td className='clienttabletext'>0xF04CD5FFFE01B1A9</td>
            <td className='clienttabletext'>02/05/2024 17:32:10</td>
            <td className='clienttabletext'>
              <span style={{backgroundColor:'#f4f5f5', padding:8,paddingLeft:20, paddingRight:20, borderRadius:20}}>17.878</span></td>
            <td className='clienttabletext'>
            <span style={{backgroundColor:'rgba(149, 172, 255, 0.2)', padding:8,paddingLeft:40, paddingRight:40, borderRadius:20}}>5</span></td>
            <td className='clienttabletext'>
            <span style={{backgroundColor:'rgba(47, 182, 23, 1)', padding:8,paddingLeft:20, paddingRight:20, color:'#fff'}}>Active</span></td>
            <td className='clienttabletext'><MoreVert /></td>
          </tr>

          <tr>
            <td className='clienttabletext'>#1472</td>
            <td className='clienttabletext'>OTAA</td>
            <td className='clienttabletext'>0xF04CD5FFFE01B1A9</td>
            <td className='clienttabletext'>02/05/2024 17:32:10</td>
            <td className='clienttabletext'>
              <span style={{backgroundColor:'#f4f5f5', padding:8,paddingLeft:20, paddingRight:20, borderRadius:20}}>17.878</span></td>
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

export default CustomerTable;
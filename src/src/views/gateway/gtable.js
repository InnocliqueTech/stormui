// import { Checkbox } from '@mui/material';
import { Checkbox } from '@mui/material';
import Table from 'react-bootstrap/Table';

function Gtable() {
  return (
    <Table responsive style={{marginTop:30, borderRadius:10, border:'1px solid #ccc'}}>
      <thead  style={{backgroundColor:'#F4F5F5'}}>
      <tr>
          <th className='clienttablehead'><Checkbox /></th>
          <th className='clienttablehead'>Gateway ID</th> 
          <th className='clienttablehead'>Gateway Name</th>
          <th className='clienttablehead'>Region</th>
          <th className='clienttablehead'>Subnet</th>
          <th className='clienttablehead'>Gateway</th>
          <th className='clienttablehead'>Online Status</th>
          <th className='clienttablehead'>Connection</th>
          <th className='clienttablehead'>Creator</th>
          <th className='clienttablehead'>Last Stats Seen</th>
          <th className='clienttablehead'>Tag</th>
          <th className='clienttablehead'>Remarks</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className='clienttabletext'><Checkbox /></td>
          <td className='clienttabletext'>
            <div>0xF04CD5FFFE01B1A9 </div></td>
          <td className='clienttabletext'>Stormenergys</td>
          <td className='clienttabletext'>GW12_KSCCL_01BDEE</td>
          <td className='clienttabletext'>
          <span style={{backgroundColor:'#E3F2FD', padding:8,paddingLeft:20, paddingRight:20, borderRadius:20, color:'#1565C0'}}>IN865</span></td>
          <td className='clienttabletext'>CH_00-07</td>
          <td className='clienttabletext'>RHF2S208</td>
          <td className='clienttabletext'>
          <span style={{backgroundColor:'rgba(47, 182, 23, 1)', padding:8,paddingLeft:20, paddingRight:20, color:'#fff'}}>Active</span>
          </td>
          <td className='clienttabletext'>MQTT</td>
          <td className='clienttabletext'>2024-05-02 16:40:28:27</td>
          <td className='clienttabletext'>-</td>
          <td className='clienttabletext'>GW12_KSCCL_0DEE</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default Gtable;
// import { Checkbox } from '@mui/material';
import Table from 'react-bootstrap/Table';

function BootstrapTable() {
  return (
    <Table responsive>
      <thead>
      <tr>
          <th>#</th>
          <th>Gateway ID</th>
          <th>Gateway Name</th>
          <th>Region</th>
          <th>Subnet</th>
          <th>Gateway</th>
          <th>Online Status</th>
          <th>Connection</th>
          <th>Creator</th>
          <th>Online Status</th>
          <th>Connection</th>
          <th>Creator</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default BootstrapTable;
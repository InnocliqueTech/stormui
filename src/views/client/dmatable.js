import React from 'react';
import { Image, Col, Row } from 'react-bootstrap';
import { MoreVert } from '@mui/icons-material';
import Table from 'react-bootstrap/Table';
import zone from '../../assets/images/water.svg';
import refresh from '../../assets/images/refresh.svg';
import download from '../../assets/images/download.svg';
import info from '../../assets/images/info.svg';
// import axios from 'axios'; // Import Axios for making HTTP requests
// import { ClientsContext } from '../dashboard/context/index';
// import { useStateContext } from '../../contexts/MainContext';


function DmaTable({dmaData}) {
  console.log(dmaData)
  // const [dmaData, setDmaData] = useState({
  //   totalConsumption: 0,
  //   dmaWiseConsumption: [],
  //   dmaDetails: [],
  // });
  // const { selectedClient, selectedZone } = useContext(ClientsContext);
  // const { presentDate, toDate } = useStateContext();
  // useEffect(() => {
  //   // Function to fetch DMA data from API
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.post('http://49.207.11.223:3307/dma/getDMAWiseConsumptionInClientDashboard', {
  //         clientId: selectedClient,
  //         zoneId: selectedZone || 0,
  //         fromDate: presentDate,
  //         toDate: toDate
  //       });
  //       // Assuming response.data is in the format you provided
  //       setDmaData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching DMA data:', error);
  //     }
  //   };

  //   fetchData(); // Call the fetchData function when component mounts

  //   // Clean-up function (optional)
  //   return () => {
  //     // Any clean-up code here
  //   };
  // }, [presentDate, toDate]); 

  return (
    <div style={{ padding: 10, marginTop: 40, marginBottom: 120, height: '500px' }}>
      <Row style={{ marginBottom: 24 }}>
        <Col md={9} sm={7} xs={7}>
          <span style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>
            <span className='iconContainer'>
              <Image src={zone} alt='zone' className='icon' />
            </span> DMA-wise Supply </span>
          <span><Image src={info} alt='gateway' /></span>
          <span style={{ textAlign: 'end' }}></span>
        </Col>
        <Col md={3} sm={5} xs={5} style={{ textAlign: 'end' }}>
          <span style={{ marginRight: 20 }}><Image src={refresh} alt='refresh' className='icon' /></span>
          <span style={{ marginRight: 10 }}><Image src={download} alt='download' className='icon' /></span>
        </Col>
      </Row>
      <div className='customer-table'>
        <Table style={{ borderRadius: 8 }}>
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
          {dmaData && dmaData.dmaDetails && dmaData.dmaDetails.length > 0 ? (
              dmaData.dmaDetails.map((item, index) => (
                <tr key={index}>
                  <td className='clienttabletext'>#DMA {item.dmaId || '-'}</td>
                  <td className='clienttabletext'>{item.gatewayId || '-'}</td>
                  <td className='clienttabletext'>{item.lastCommunication || '-'}</td>
                  <td className='clienttabletext'>
                    <span style={{ backgroundColor: '#E3F2FD', padding: 8, paddingLeft: 40, paddingRight: 40, borderRadius: 20, color: '#1976D2', fontWeight: 600 }}>
                      {item.meters || '-'}
                    </span>
                  </td>
                  <td className='clienttabletext'>
                  {item.status || '-'}
                  </td>
                  <td className='clienttabletext'><MoreVert /></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '20px' }}>No data found</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default DmaTable;

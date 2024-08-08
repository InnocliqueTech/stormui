// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import './GatewayList.scss'
// import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
// import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
// import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
// import { Col, Row } from 'react-bootstrap';
import GatewayTable from './GatewayTable';
import activeGatway from '../../assets/images/activeGateways.svg';
import totalGateway from '../../assets/images/totalGatways.svg';
import inactive from '../../assets/images/inactiveGatways.svg';
import cans from '../../assets/images/cansCommunicated.svg';
import axios from 'axios';
import { useEffect, useContext, useState } from 'react';
import { ClientsContext } from '../dashboard/context';


export default function GatewayList() {
  const [gatewayCardData, setGatewayCardData] = useState('')
  const { selectedClient } = useContext(ClientsContext);


  useEffect(() => {

  
  
    fetchCardData()
  }, [selectedClient])

  const fetchCardData = async () => {
    try {
      const requestBody = {
        clientId: selectedClient
      }
      const response = await axios.post('http://49.207.11.223:3307/gateways/getGatewayCountsInGatewayDashboard', requestBody)
      console.log(response.data)
      const data = response.data
      console.log(data)
      setGatewayCardData([
        {
          type: 'Total Gateways',
          count: data.gatewayCount.totalGateways || '0',
          icon: totalGateway,
          bg: 'rgba(79, 187, 0, 0.15)'
        },
        {
          type: 'Active Gateways',
          count: data.gatewayCount.activeGateways || '0',
          icon: activeGatway,
          bg: '#FFF3E8'
        },
        {
          type: 'Inactive Gateways',
          count: data.gatewayCount.inactiveGateways || '0',
          icon: inactive,
          bg: '#FEF0F4'
        },
        {
          type: "Can's communicated today",
          count: data.gatewayCount.totalCansCommunicatedToday || '0',
          icon: cans,
          bg: '#E3F2FD'
        }
      ]);
    } catch (error) {
      console.error(error);
    }
  }
  // const dummyData = [
  //   {
  //     type: 'Total Gateways',
  //     count: '2',
  //     icon: totalGateway,
  //     //   iconColor: '#2FB617',
  //     bg: 'rgba(79, 187, 0, 0.15)'
  //   },
  //   {
  //     type: 'Active Gateways',
  //     count: '188',
  //     icon: activeGatway,
  //     //   iconColor: '#FFA400',
  //     bg: '#FFF3E8'
  //   },
  //   {
  //     type: 'Inactive Gateways ',
  //     count: '123',
  //     icon: inactive,
  //     //   iconColor: '#DE315E',
  //     bg: '#FEF0F4'
  //   },
  //   {
  //     type: "Can's communicated today",
  //     count: '200',
  //     icon: cans,
  //     //   iconColor: '#1565C0',
  //     bg: '#E3F2FD'
  //   }
  // ];
  return (
    <section className='gateway-component'>
      {/* <h2 className="heading">Gateways</h2> */}
      <div className='gateway-list'>
        {gatewayCardData && gatewayCardData.map((item) => {
          return (
            <div key={item.type} className='gateway-card'>
              <div className='type-icon'>
                <img src={item.icon} alt={item.type} style={{ background: item.bg }} />
                <span>{item.type}</span>
              </div>
              <div className='count' style={{ marginLeft: "10px" }}>
                <span>{item.count}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div >
        {/* <Row>
          <Col md={9} sm={7} xs={7}>
            <span style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>Gateway Lists</span>{' '}
            <span style={{ textAlign: 'end' }}>
              <InfoOutlinedIcon style={{ height: 20, width: 20, justifyContent: 'center', color: '#D6D9DC', marginLeft: 5 }} />
            </span>
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
        </Row> */}
        <GatewayTable />
      </div>
    </section>
  );
}

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import './GatewayList.scss'
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { Col, Row } from 'react-bootstrap';
import GatewayTable from './GatewayTable';
import activeGatway from '../../assets/images/activeGateways.svg';
import totalGateway from '../../assets/images/totalGatways.svg';
import inactive from '../../assets/images/inactiveGatways.svg';
import cans from '../../assets/images/cansCommunicated.svg';


export default function GatewayList() {
  const dummyData = [
    {
      type: 'Total Gateways',
      count: '2',
      icon: totalGateway,
    //   iconColor: '#2FB617',
      bg: 'rgba(79, 187, 0, 0.15)'
    },
    {
      type: 'Active Gateways',
      count: '188',
      icon: activeGatway,
    //   iconColor: '#FFA400',
      bg: '#FFF3E8'
    },
    {
      type: 'Inactive Gateways ',
      count: '123',
      icon: inactive,
    //   iconColor: '#DE315E',
      bg: '#FEF0F4'
    },
    {
      type: "Can's communicated today",
      count: '200',
      icon: cans,
    //   iconColor: '#1565C0',
      bg: '#E3F2FD'
    }
  ];
  return (
    <section className='gateway-component'>
        <h2 className="heading">Gateways</h2>
      <div className='gateway-list'>
        {dummyData.map((item) => {
          return (
            <div key={item.type} className='gateway-card'>
              <div className='type-icon'>
                <img src={item.icon} alt={item.type} style={{background:item.bg}} />
                <span>{item.type}</span>
              </div>
              <div className='count'>

                <span>   {item.count}</span>
                
             </div>
            </div>
          );
        })}
      </div>

      <div style={{ backgroundColor: '#fff', padding: 16, borderRadius: 10, marginTop: 10 }}>
        <Row>
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
        </Row>
        <GatewayTable />
      </div>
    </section>
  );
}

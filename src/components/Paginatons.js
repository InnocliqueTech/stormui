import { Col, Row } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
// import { useStateContext } from '../contexts/MainContext';

export default function Paginations({zonesList,itemsPerPage,currentPage,setCurrentPage}) {
  // const { zonesList, itemsPerPage, currentPage } = useStateContext();
  const items = Math.ceil(zonesList.length / itemsPerPage);
  const paginateItems = Array(items)
    .fill()
    .map((_, index) => index + 1);


  return (
    <Row style={{ position: 'absolute', bottom: 20, right: 50 }}>
      <Col md={12} style={{ textAlign: 'end' }}>
        <Pagination>
          {paginateItems.map((item, index) => {
            return (
              <Pagination.Item key={index} active={item === currentPage}
              
              onClick={()=>setCurrentPage(item)}
              >
              {item}
              </Pagination.Item>
            );
          })}
        </Pagination>
      </Col>
    </Row>
  );
}

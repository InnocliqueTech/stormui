import { Col, Row } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';

export default function Paginations() {
    
let active = 2;
let items = [];
for (let number = 1; number <= 5; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>,
  );
}
    return (
      <Row style={{position:'absolute', bottom:20, right:50}}>
        <Col md={12} style={{textAlign:'end'}}>
        <Pagination>{items}</Pagination>
        </Col>
      </Row>
    );
}

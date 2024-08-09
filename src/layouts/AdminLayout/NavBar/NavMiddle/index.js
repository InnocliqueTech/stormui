import React from 'react';
import { ListGroup } from 'react-bootstrap';

const index = () => {
  return (
    <React.Fragment>
    <ListGroup as="ul" bsPrefix=" " className="navbar-nav ml-auto"id="navbar-right">
      <ListGroup.Item as="li" bsPrefix=" " className="nav-item" style={{ textAlign:"center"}}>
        <h5 style={{fontWeight:"bold"}}>Karimnagar Smart City Corporation LTD</h5>
        <h6>24/7 Water Supply Pilot Project</h6>
      </ListGroup.Item>
      
    </ListGroup>
  </React.Fragment>
  )
}

export default index
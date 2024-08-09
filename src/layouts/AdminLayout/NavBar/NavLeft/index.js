import React from 'react';
import { ListGroup } from 'react-bootstrap';
import useWindowSize from '../../../../hooks/useWindowSize';
// import logo from '../../../../assets/images/logo.png';
import SmartCity from '../../../../layouts/AdminLayout/NavBar/krmsc1r (1).png'
// import logo2 from '../image6.png';
const NavLeft = () => {
  const windowSize = useWindowSize();

  let navItemClass = ['nav-item'];
  if (windowSize.width <= 575) {
    navItemClass = [...navItemClass, 'd-none'];
  }

  return (
    <React.Fragment>
      <ListGroup as="ul" bsPrefix=" " className="navbar-nav mr-auto">
        <ListGroup.Item as="li" bsPrefix=" " className={navItemClass.join(' ')} style={{lineHeight:'0px' }}>
          <img src={SmartCity} width={70}  alt="logo" />
        </ListGroup.Item>
        {/* <ListGroup.Item as="li" bsPrefix=" " className="nav-item" style={{ lineHeight: '0px'}}>
          <div className='head-right-search'>
            <i className="fas fa-search me-2"></i>
            <input type='text' placeholder='Search'></input>
          </div>
        </ListGroup.Item> */}
        {/* <ListGroup.Item as="li" bsPrefix=" " className="nav-item">
          <NavSearch windowWidth={windowSize.width} />
        </ListGroup.Item> */}
      </ListGroup>
    </React.Fragment>
  );
};

export default NavLeft;

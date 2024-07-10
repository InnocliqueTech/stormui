import React from 'react';
import { ListGroup } from 'react-bootstrap';
import useWindowSize from '../../../../hooks/useWindowSize';
import logo from '../../../../assets/images/logo.png';
import logo2 from '../image6.png';
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
          <img src={logo} width={100}  alt="logo" />
          <img src={logo2} width={50} alt="logo2" style={{ marginLeft: '50px' }} />
          {/* <Dropdown align={dropdownAlign}>
            <Dropdown.Toggle variant={'link'} id="dropdown-basic">
              Dropdown
            </Dropdown.Toggle>
            <ul>
              <Dropdown.Menu>
                <li>
                  <Link to="#" className="dropdown-item">
                    Action
                  </Link>
                </li>
                <li>
                  <Link to="#" className="dropdown-item">
                    Another action
                  </Link>
                </li>
                <li>
                  <Link to="#" className="dropdown-item">
                    Something else here
                  </Link>
                </li>
              </Dropdown.Menu>
            </ul>
          </Dropdown> */}
        </ListGroup.Item>
        {/* <ListGroup.Item as="li" bsPrefix=" " className="nav-item">
          <NavSearch windowWidth={windowSize.width} />
        </ListGroup.Item> */}
      </ListGroup>
    </React.Fragment>
  );
};

export default NavLeft;

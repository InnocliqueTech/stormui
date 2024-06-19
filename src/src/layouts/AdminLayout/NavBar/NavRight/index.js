import React, { useState } from 'react';
import {  Image,ListGroup } from 'react-bootstrap';

import ChatList from './ChatList';

//import NavSearch from '../NavLeft/NavSearch';
//import useWindowSize from '../../../../hooks/useWindowSize';
import avatar2 from '../../../../assets/images/user/Ramesh.png';
// import avatar3 from '../../../../assets/images/user/avatar-3.jpg';
// import avatar4 from '../../../../assets/images/user/avatar-4.jpg';

const NavRight = () => {
  const [listOpen, setListOpen] = useState(false);
  //const windowSize = useWindowSize();

  // let navItemClass = ['nav-item'];
  // if (windowSize.width <= 575) {
  //   navItemClass = [...navItemClass, 'd-none'];
  // }

  // const notiData = [
  //   {
  //     name: 'Joseph William',
  //     image: avatar2,
  //     details: 'Purchase New Theme and make payment',
  //     activity: '30 min'
  //   },
  //   {
  //     name: 'Sara Soudein',
  //     image: avatar3,
  //     details: 'currently login',
  //     activity: '30 min'
  //   },
  //   {
  //     name: 'Suzen',
  //     image: avatar4,
  //     details: 'Purchase New Theme and make payment',
  //     activity: 'yesterday'
  //   }
  // ];
  // const Search = styled('div')(({ theme }) => ({
  //   position: 'relative',
  //   borderRadius: theme.shape.borderRadius,
  //   backgroundColor: theme.palette.grey[200],
  //   '&:hover': {
  //     backgroundColor: theme.palette.grey[300],
  //   },
  //   marginLeft: 0,
  //   width: '100%',
  //   [theme.breakpoints.up('sm')]: {
  //     marginLeft: theme.spacing(1),
  //     width: 'auto',
  //   },
  // }));

  // const SearchIconWrapper = styled('div')(({ theme }) => ({
  //   padding: theme.spacing(0, 2),
  //   height: '100%',
  //   position: 'absolute',
  //   pointerEvents: 'none',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // }));

  // const StyledInputBase = styled(InputBase)(({ theme }) => ({
  //   color: 'inherit',
  //   width: '100%',
  //   '& .MuiInputBase-input': {
  //     padding: theme.spacing(1, 1, 1, 0),
  //     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  //     transition: theme.transitions.create('width'),
  //     width: '100%',
  //     [theme.breakpoints.up('sm')]: {
  //       width: '20ch',
  //       '&:focus': {
  //         width: '25ch',
  //       },
  //     },
  //   },
  // }));

  return (
    <React.Fragment>
      <ListGroup as="ul" bsPrefix=" " className="navbar-nav ml-auto" id="navbar-right">
        <ListGroup.Item as="li" bsPrefix=" " className="nav-item" style={{lineHeight:'0px',padding:'0',paddingRight:'24px' }}>
          {/* <NavSearch windowWidth={windowSize.width} /> */}
          <div className='head-right-search'>
            <i className="fas fa-search me-2"></i>
            <input type='text' placeholder='Search'></input>
          </div>
        </ListGroup.Item>
        <ListGroup.Item as="li" bsPrefix=" " className="nav-item p-0" style={{lineHeight:'0px' }}>
          <Image src={avatar2} alt="avtar" style={{ height: 38, width: 38, marginTop:'-3px' }} />
        </ListGroup.Item>
        <ListGroup.Item as="li" bsPrefix=" " className="nav-item" style={{lineHeight:'0px' }}>
          <div className='head-right-user'>
            <div className="">
              <div className="col-md-12">
                <h3>Ramesh Vemula</h3>
                <small>Senior Operator</small>
                {/* <div className="profile"></div>
                <div className="profilesmall"></div> */}
              </div>
            </div>
          </div>
        </ListGroup.Item>
        {/* <ListGroup.Item as="li" bsPrefix=" ">
          <Dropdown>
            <Dropdown.Toggle as={Link} variant="link" to="#" className="displayChatbox" onClick={() => setListOpen(true)}>
              <i className="icon feather icon-mail" />
            </Dropdown.Toggle>
          </Dropdown>
        </ListGroup.Item> */}
        {/* <ListGroup.Item as="li" bsPrefix=" ">
          <Dropdown align="start" className="drp-user">
            <Dropdown.Toggle as={Link} variant="link" to="#" id="dropdown-basic">
              <i className="icon feather icon-settings" />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="profile-notification">
              <div className="pro-head">
                <img src={avatar1} className="img-radius" alt="User Profile" />
                <span>John Doe</span>
                <Link to="#" className="dud-logout" title="Logout">
                  <i className="feather icon-log-out" />
                </Link>
              </div>
              <ListGroup as="ul" bsPrefix=" " variant="flush" className="pro-body">
                <ListGroup.Item as="li" bsPrefix=" ">
                  <Link to="#" className="dropdown-item">
                    <i className="feather icon-settings" /> Settings
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item as="li" bsPrefix=" ">
                  <Link to="#" className="dropdown-item">
                    <i className="feather icon-user" /> Profile
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item as="li" bsPrefix=" ">
                  <Link to="#" className="dropdown-item">
                    <i className="feather icon-mail" /> My Messages
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item as="li" bsPrefix=" ">
                  <Link to="#" className="dropdown-item">
                    <i className="feather icon-lock" /> Lock Screen
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item as="li" bsPrefix=" ">
                  <Link to="#" className="dropdown-item">
                    <i className="feather icon-log-out" /> Logout
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </Dropdown.Menu>
          </Dropdown>
        </ListGroup.Item> */}
      </ListGroup>
      <ChatList listOpen={listOpen} closed={() => setListOpen(false)} />
    </React.Fragment>
  );
};

export default NavRight;

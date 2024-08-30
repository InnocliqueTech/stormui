import React from 'react';
import { Box, Typography, List, ListItem, useMediaQuery, useTheme, Divider, Avatar, Paper } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './setting.css';
// import ClientNotification from '../../src/assets/images/ClientNotification.png';
// import Mail from '../../src/assets/images/Mail.png';
// import UpdateSystem from '../../src/assets/images/UpdateSystem.png';
// import Logout from '../../src/assets/images/Logout.png';
import { useNavigate } from 'react-router-dom';




function Settings() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [, setFlexDirection] = useState(isSmallScreen ? 'column' : 'row');

  useEffect(() => {
    setFlexDirection(isSmallScreen ? 'column' : 'row');
  }, [isSmallScreen]);
  const onlLogOut = () => {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('dashboardReloaded');
    sessionStorage.removeItem('gatewayReloaded');
    sessionStorage.removeItem('zoneReloaded');
    sessionStorage.removeItem('reloaded')
    navigate('/login')
  }
  return (
    <>
      <Row>
        <Col md={10} sm={6} xs={12}>
          <div className="dashheading">Profile</div>
        </Col>
        <Col md={2} sm={5} xs={12}>
          <div className='setting-nav'>
            <ul>
              <li><Link className='active' to='/app/setting'>Profile</Link></li>
              <li><Link to='/app/about'>About us</Link></li>
              {/* <li><Link to='/app/terms'>Terms & Conditions</Link></li> */}

            </ul>
          </div>
        </Col>
      </Row>
      <Paper elevation={3} style={{ padding: '15px', marginTop: '20px', boxShadow: 'none' }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Avatar
              alt="Srinivas Alwala"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Altja_j%C3%B5gi_Lahemaal.jpg/800px-Altja_j%C3%B5gi_Lahemaal.jpg"
              sx={{ width: 56, height: 56, marginRight: 2 }}
            />
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <h4 className='fs-18 fw6' >Srinivas Alwala</h4>
              <span className='fs-16 fw4' style={{ color: '#808E9D' }}>Project Manager</span>
            </Box>
          </Box>
          {/* <Button sx={{ borderRadius: "7px", borderWidth: "2px" }} startIcon={<EditIcon />} variant="outlined">Edit</Button> */}
        </Box>

        <Box>
          <List className='setting-detail-list' style={{ borderRadius: 16, border: '1px solid #F4F5F5' }} sx={{
            p: 0,
            width: '100%',
            marginTop: '25px'
          }} aria-label="mailbox folders">
            <ListItem>
              <h5 className='fs-18 fw6 d-flex'>Basic Details</h5>
            </ListItem>
            <Divider component="li" style={{ borderBottom: '1px solid #F4F5F5' }} />
            <ListItem>

              <Box sx={{ borderRadius: "7px", borderWidth: "1px", padding: "16px", width: "100%" }}>
                <Box display="flex" flexDirection="row" justifyContent="space-between"  >
                  <Box className="setting-detail" display="flex" flexDirection="column" alignItems="flex-start" marginRight={2} width="45%">
                    <label>Name</label>
                    <input type='text' placeholder='Srikar Mitta'></input>
                  </Box>

                  <Box className="setting-detail" display="flex" flexDirection="column" alignItems="flex-start" width="45%">
                    <label>Email</label>
                    <input type='text' placeholder='srinivasalwala22@gmail.com'></input>
                  </Box>
                </Box>

                <Box display="flex" flexDirection="row" justifyContent="space-between" marginTop={2}>
                  <Box className="setting-detail" display="flex" flexDirection="column" alignItems="flex-start" marginRight={2} width="45%">
                    <label>Contact</label>
                    <input type='text' placeholder='+91 9000000001'></input>
                  </Box>

                  <Box className="setting-detail" display="flex" flexDirection="column" alignItems="flex-start" width="45%">
                    <label>Job Title</label>
                    <input type='text' placeholder='Project Manager'></input>
                  </Box>
                </Box>
              </Box>
            </ListItem>
          </List>
        </Box>

        <Box>
          <List className='setting-detail-list' style={{ borderRadius: 16, border: '1px solid #F4F5F5' }} sx={{
            p: 0,
            width: '100%',
            marginTop: '25px'
          }} aria-label="mailbox folders">
            {/* <ListItem>
              <h5 className='fs-18 fw6 d-flex'>Settings</h5>
            </ListItem> */}

            {/* <Divider component="li" style={{ borderBottom: '1px solid #F4F5F5' }} />
            <ListItem sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', padding: '16px' }}>
                <img src={ClientNotification} alt="ClientNotification" width={20} height={20} />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', ml: 2 }}>
                  <h4 className='fs-16 fw7'>Client Notification</h4>
                  <Typography variant="body2" color="#ADB5BD">
                    You will be notified when customers order any product
                  </Typography>
                </Box>
              </Box>
              <FormControlLabel
                control={<Switch />}
                label=""
                sx={{ marginLeft: 'auto' }}
              />
            </ListItem>

            <Divider component="li" style={{ borderBottom: '1px solid #F4F5F5' }} />
            <ListItem sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', padding: '16px' }}>
                <img src={Mail} alt="Mail" width={20} height={20} />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', ml: 2 }}>
                  <h4 className='fs-16 fw7'>Setup Email Notification</h4>
                  <Typography variant="body2" color="#ADB5BD">
                    Turn on email notification to get update through email
                  </Typography>
                </Box>
              </Box>
              <FormControlLabel
                control={<Switch />}
                label=""
                sx={{ marginLeft: 'auto' }}
              />
            </ListItem>

            <Divider component="li" style={{ borderBottom: '1px solid #F4F5F5' }} />
            <ListItem sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', padding: '16px' }}>
                <img src={UpdateSystem} alt="UpdateSystem" width={20} height={20} />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', ml: 2 }}>
                  <h4 className='fs-16 fw7'>Update System Notification</h4>
                  <Typography variant="body2" color="#ADB5BD">
                    You will be notified when customers order any product
                  </Typography>
                </Box>
              </Box>
              <FormControlLabel
                control={<Switch />}
                label=""
                sx={{ marginLeft: 'auto' }}
              />
            </ListItem> */}
            <Divider component="li" style={{ borderBottom: '1px solid #F4F5F5' }} />
            <ListItem sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', padding: '16px' }}>
                {/* <img src={Logout} alt="Logout" width={20} height={20} /> */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', ml: 2 }}>
                  <Typography gutterBottom style={{ color: '#D81B60', fontWeight: '700', fontSize: 20, }}>LogOut</Typography>
                  {/* <Typography variant="body2" color="#ADB5BD">
                    You will be notified when customers order any product
                  </Typography> */}
                </Box>
              </Box>
              <button className='btn logoutbtn' onClick={onlLogOut}>Log Out</button>

            </ListItem>
          </List>
        </Box>
      </Paper>
    </>
  );
}

export default Settings;

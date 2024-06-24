import React from 'react';
import { Box,Typography,List,ListItem,useMediaQuery, useTheme,Divider, TextField, FormControlLabel, Switch, Button, Avatar, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'; 
import { EmailOutlined,  StickyNote2Outlined, } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { Col,Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

 
function Settings() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [, setFlexDirection] = useState(isSmallScreen ? 'column' : 'row');

  useEffect(() => {
    setFlexDirection(isSmallScreen ? 'column' : 'row');
  }, [isSmallScreen]);

  return (
    <>
      <Row>
        <Col md={8} sm={6} xs={12}>
          <div className="dashheading"><a className="title">Profile</a></div>
        </Col>
        <Col md={4} sm={5} xs={12}>
            <div className='setting-nav'>
                <ul>
                <li><Link className='active'   to='/app/setting'>Profile</Link></li>
              <li><Link to='/app/about'>About us</Link></li>
              <li><Link to='/app/terms'>Terms & Conditions</Link></li>
 
                </ul>
            </div>
        </Col>
      </Row>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Avatar
              alt="Srinivas Alwala"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Altja_j%C3%B5gi_Lahemaal.jpg/800px-Altja_j%C3%B5gi_Lahemaal.jpg"
              sx={{ width: 56, height: 56, marginRight: 2 }}
            />
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <h4 className='fs-18 fw6' >Srinivas Alwala</h4>
              <span className='fs16 fw4' style={{color:'#808E9D'}}>Project Manager</span>
            </Box>
          </Box>
          <Button sx={{borderRadius: "7px", borderWidth:"2px"}} startIcon={<EditIcon />} variant="outlined">Edit</Button>
        </Box>

    <Box>
    <List sx={{ p: 0,
                width: '100%',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'background.paper',
                marginTop: '25px'}} aria-label="mailbox folders">
      <ListItem>
      <h5 className='fs18 fw6 d-flex'>Basic Details</h5>
      </ListItem>
      <Divider component="li" />
      <ListItem>
        
      <Box sx={{ borderRadius: "7px", borderWidth: "1px", padding: "10px" ,width:"100%" }}>
      <Box display="flex" flexDirection="row" justifyContent="space-between"  >
        <Box className="setting-detail" display="flex" flexDirection="column" alignItems="flex-start"  marginRight={2} width="45%">
          <label>Name</label>
          <TextField
            fullWidth
            variant="outlined"
            defaultValue="Srikar Mitta"
            InputProps={{
              sx: {
                height: '36px', // Adjust the height as per your requirement
                color:'grey',marginTop:0
              }
            }}
          />
        </Box>

        <Box className="setting-detail" display="flex" flexDirection="column" alignItems="flex-start" width="45%">
          <label>Email</label>
          <TextField
            fullWidth
            variant="outlined"
            defaultValue="srinivasalwala22@gmail.com"
            InputProps={{
              sx: {
                height: '36px', // Adjust the height as per your requirement
                color:'grey'
              }
            }}
          />
        </Box>
      </Box>

      <Box display="flex" flexDirection="row" justifyContent="space-between" marginTop={2}>
        <Box className="setting-detail" display="flex" flexDirection="column" alignItems="flex-start" marginRight={2} width="45%">
          <label>Contact</label>
          <TextField
            fullWidth
            variant="outlined"
            defaultValue="+91 9000000001"
            InputProps={{
              sx: {
                height: '36px', // Adjust the height as per your requirement
                color:'grey'
              }
            }}
          />
        </Box>

        <Box className="setting-detail" display="flex" flexDirection="column" alignItems="flex-start" width="45%">
          <label>Job Title</label>
          <TextField
            fullWidth
            variant="outlined"
            defaultValue="Project Manager"
            InputProps={{
              sx: {
                height: '36px', // Adjust the height as per your requirement
                color:'grey'
              }
            }}
          />
        </Box>
      </Box>
      </Box>
      </ListItem>
      <Divider component="li" />
    </List>
    </Box>

<Box>
<List sx={{ p: 0,
            width: '100%',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            backgroundColor: 'background.paper',
            marginTop: '25px'}}aria-label="mailbox folders">
      <ListItem> 
        <h5 className='fs18 fw6 d-flex'>Settings</h5>
      </ListItem>
      
      <Divider component="li" />
      <ListItem sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center',padding:'8px' }}>
        <StickyNote2Outlined style={{ color: 'blue' }}/> 
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', ml: 2 }}>
          <h5 className='fs16 fw7'>Client Notification</h5>
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
 
      <Divider component="li" />
      <ListItem sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center',padding:'8px' }}>
        <EmailOutlined style={{ color: 'blue' }}/>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', ml: 2 }}>
        <h5 className='fs16 fw7'>Setup Email Notification</h5>
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

      <Divider component="li" />
      <ListItem sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center',padding:'8px' }}>
        <NotificationsNoneIcon style={{ color: 'blue' }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', ml: 2 }}>
          <h5 className='fs16 fw7'>Update System Notification</h5>
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
    <Divider component="li" />
      <ListItem sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <ExitToAppIcon style={{ color: '#D81B60' }}/> 
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', ml: 2 }}>
          <Typography gutterBottom style={{ color: '#D81B60',fontWeight: '700', fontSize:20, }}>LogOut</Typography>
          <Typography variant="body2" color="#ADB5BD">
            You will be notified when customers order any product 
          </Typography>
        </Box>
      </Box>
      <Button
            variant="contained"
            sx={{width:'93px', height:'40px', padding:'8px 16px', borderRadius:'8px', backgroundColor: '#D81B60', }}

          >
            Log Out
      </Button>

    </ListItem>
  </List>
  </Box>
      </Paper>
    </>
  );
}

export default Settings;

import React from 'react';
import { Box,Typography,List,ListItem,useMediaQuery, useTheme,Divider, TextField, FormControlLabel, Switch, Button, Avatar, Container, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'; 
import { EmailOutlined,  StickyNote2Outlined, } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { Col,Row } from 'react-bootstrap';

 
function Settings() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [, setFlexDirection] = useState(isSmallScreen ? 'column' : 'row');

  useEffect(() => {
    setFlexDirection(isSmallScreen ? 'column' : 'row');
  }, [isSmallScreen]);

  return (
    <Container maxWidth="lm">
      <Row>
        <Col md={8} sm={6} xs={12}>
          <div className="dashheading"><a className="title">Profile</a></div>
        </Col>
        <Col md={4} sm={6} xs={12}>
            <div className='setting-nav'>
                <ul>
                  <li><a className='active' href='#'>Profile</a></li>
                  <li><a href='#'>About us</a></li>
                  <li><a href='#'>Terms & Conditions</a></li>
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
              <Typography variant="h6">Srinivas Alwala</Typography>
              <Typography sx={{color:'grey'}}variant="subtitle1">Project Manager</Typography>
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
      <Typography paddingLeft={1} display="flex" flexDirection="column" alignItems="flex-start" variant="h6" gutterBottom>Basic Details</Typography>
      </ListItem>
      <Divider component="li" />
      <ListItem>
        
      <Box sx={{ borderRadius: "7px", borderWidth: "1px", padding: "10px" ,width:"100%" }}>
      <Box display="flex" flexDirection="row" justifyContent="space-between"  >
        <Box display="flex" flexDirection="column" alignItems="flex-start"  marginRight={2} width="45%">
          <Typography>Name</Typography>
          <TextField
            fullWidth
            variant="outlined"
            defaultValue="Srikar Mitta"
            margin="normal"
            InputProps={{
              sx: {
                height: '36px', // Adjust the height as per your requirement
                color:'grey'
              }
            }}
          />
        </Box>

        <Box display="flex" flexDirection="column" alignItems="flex-start" width="45%">
          <Typography>Email</Typography>
          <TextField
            fullWidth
            variant="outlined"
            defaultValue="srinivasalwala22@gmail.com"
            margin="normal"
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
        <Box display="flex" flexDirection="column" alignItems="flex-start" marginRight={2} width="45%">
          <Typography>Contact</Typography>
          <TextField
            fullWidth
            variant="outlined"
            defaultValue="+91 9000000001"
            margin="normal"
            InputProps={{
              sx: {
                height: '36px', // Adjust the height as per your requirement
                color:'grey'
              }
            }}
          />
        </Box>

        <Box display="flex" flexDirection="column" alignItems="flex-start" width="45%">
          <Typography>Job Title</Typography>
          <TextField
            fullWidth
            variant="outlined"
            defaultValue="Project Manager"
            margin="normal"
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
        <Typography variant="h6" gutterBottom>Settings</Typography>
      </ListItem>
      
      <Divider component="li" />
      <ListItem sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <StickyNote2Outlined style={{ color: 'blue' }}/> 
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', ml: 2 }}>
          <Typography gutterBottom>Client Notification</Typography>
          <Typography variant="body2" color="textSecondary">
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
        <EmailOutlined style={{ color: 'blue' }}/>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', ml: 2 }}>
          <Typography gutterBottom> Setup Email Notification</Typography>
          <Typography variant="body2" color="textSecondary">
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
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <NotificationsNoneIcon style={{ color: 'blue' }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', ml: 2 }}>
          <Typography gutterBottom>Update System Notification</Typography>
          <Typography variant="body2" color="textSecondary">
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
          <Typography gutterBottom style={{ color: '#D81B60',fontWeight: 'bold' }}>LogOut</Typography>
          <Typography variant="body2" color="textSecondary">
            You will be notified when customers order any product 
          </Typography>
        </Box>
      </Box>
      <Button
            variant="contained"
            sx={{ marginLeft: 'auto', backgroundColor: '#D81B60', }}

          >
            Log Out
      </Button>

    </ListItem>
  </List>
  </Box>
      </Paper>
    </Container>
  );
}

export default Settings;

import React from 'react';
import { Typography } from '@mui/material';
import { Box, List, ListItem, Grid, Divider, Paper } from '@mui/material';
// import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function aboutUs() {
  return (
    <>
      <>
        {/* <Row style={{marginBottom:'30px'}}>
        <Col md={10} sm={6} xs={12}>
          <div className="dashheading"><a className="title">About us</a></div>
        </Col>
          <Col md={2} sm={5} xs={12}>
            <div className='setting-nav'>
              <ul>
                <li><Link to='/app/setting'>Profile</Link></li>
                <li><Link className='active' to='/app/about'>About us</Link></li>
              
              </ul>
            </div>
          </Col>
      </Row> */}
        <div style={{ marginBottom: '30px', display:"flex", justifyContent:"space-between" }}>
          <div>
            <div className="dashheading"><a className="title">About us</a></div>
          </div>
          <div>
            <div className='setting-nav'>
              <ul style={{gap:"10px"}}>
                <li><Link to='/app/setting'>Profile</Link></li>
                <li><Link className='active' to='/app/about'>About us</Link></li>

              </ul>
            </div>
          </div>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12} className='aboutus-details'>
            <Paper elevation={0} sx={{ padding: 2, border: '1px solid #F4F5F5' }}
              style={{ borderRadius: '16px' }}
            >
              <p>
                While clean water is the primary concern, Water and Wastewater organizations must prioritize meeting regulations and reducing costs. With solutions coming from Storm&apos;s basket like Centralized monitoring, controlling and reporting, Storm provides a crystal clear view resulting in greater safety and efficiency.
              </p>
              <Typography variant="body2" >
                Our solutions cater to:
              </Typography>
              <Typography variant="body2" component="ul" sx={{ marginBottom: 2 }}>
                <li>Desalination</li>
                <li>Water Pumping Stations</li>
                <li>Water Distribution &amp; Irrigation</li>
                <li>Water Treatment Plants</li>
              </Typography>
              <Typography variant="body2">
                We offer a comprehensive range of solutions for W&amp;WW industry viz:
              </Typography>
              <Typography variant="body2" component="ul" sx={{ marginBottom: 2 }}>
                <li>Turnkey Water Solutions</li>
                <li>Automation &amp; SCADA</li>
                <li>Water Plant Optimization</li>
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: 2 }}>
                Storm offers a comprehensive portfolio of life cycle management and service solutions for the water industry - a portfolio based on extensive process and application know-how.
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: 2 }}>
                Our philosophy is simple: we protect your investment through the stepwise evolution and upgrading of your electrical, control, and instrumentation systems to minimize the consumption of energy, prolong asset operating life, and minimize the cost of ownership.
              </Typography>
              <Typography variant="body2">
                Ranging from simple SCADA and control applications, our suite of solutions and services ranges to advanced applications like optimization, energy efficiency application, etc.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Box>
          <List className='setting-detail-list' style={{ borderRadius: 16, border: '1px solid #F4F5F5' }} sx={{
            p: 0,
            width: '100%',
            marginTop: '25px'
          }} aria-label="mailbox folders">
            <ListItem>
              <h5 className='fs18 fw6 d-flex'>Contact Us</h5>
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <Box sx={{ borderRadius: "7px", borderWidth: "1px", padding: "16px", width: "100%" }}>
                <Box display="flex" flexDirection="row" justifyContent="space-between">
                  <Box className="setting-detail" display="flex" flexDirection="column" alignItems="flex-start" marginRight={2} width="45%">
                    <label>Contact</label>
                    <input type='text' placeholder='+91 9000000001'></input>
                  </Box>

                  <Box display="flex" className="setting-detail" flexDirection="column" alignItems="flex-start" width="45%">
                    <label>G-mail</label>
                    <input type='text' placeholder='srinivasalwala22@gmail.com'></input>
                  </Box>
                </Box>

                <Box display="flex" flexDirection="row" justifyContent="space-between" marginTop={2}>
                  <Box display="flex" className="setting-detail" flexDirection="column" alignItems="flex-start" marginRight={2} width="45%">
                    <label>Address</label>
                    <input type='text' placeholder='12-39302-28192,Hitech-city'></input>
                  </Box>
                </Box>
                <Box display="flex" flexDirection="row" justifyContent="space-between" marginTop={2}>
                  <Box display="flex" className="setting-detail" flexDirection="column" alignItems="flex-start" marginRight={2} width="45%">
                    <label className="form-label">PDF Attachment</label>
                    <input type="file" id="file" style={{ display: 'none' }} />
                    <label htmlFor="file" className="custom-file-upload">Choose a file</label>
                  </Box>

                </Box>

              </Box>
            </ListItem>
          </List>
        </Box>

      </>
    </>
  );
}

export default aboutUs;

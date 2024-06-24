import React from 'react';
import {Grid, Paper, Typography } from '@mui/material';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Terms() {
  return ( 
    <>
    <Row style={{marginBottom:'30px'}}>
      <Col md={8} sm={6} xs={12}>
        <div className="dashheading"><a className="title">Terms & Conditions</a></div>
      </Col>
      <Col md={4} sm={5} xs={12}>
          <div className='setting-nav'>
              <ul>
              <li><Link to='/app/setting'>Profile</Link></li>
              <li><Link to='/app/about'>About us</Link></li>
              <li><Link className='active' to='/app/terms'>Terms & Conditions</Link></li>
 
              </ul>
          </div>
      </Col>
    </Row>
    <Paper  sx={{ padding: 2, border: '1px solid #e0e0e0' }}> 
        <Grid container spacing={2}>
          <Grid item xs={12} className='tc-details'>
            <strong>1. ACCEPTANCE THE USE OF LOREM IPSUM TERMS AND CONDITIONS</strong>
            <p>
              Your access to and use of Lorem Ipsum (the app) is subject exclusively to these Terms and Conditions. You will not use the app for any purpose that is unlawful or prohibited by these Terms and Conditions. By using the app you are fully accepting the terms, conditions and disclaimers contained in this notice. If you do not accept these Terms and Conditions you must immediately stop using the app.
            </p>
          </Grid>

          <Grid className='tc-details' item xs={12}>
            <strong>2. CREDIT CARD DETAILS</strong>
            <p>
              All Lorem Ipsum purchases are managed by the individual App Stores (Apple, Google Windows) and Lorem Ipsum will never store your credit card information or make it available in any other way. Any personal information provided will be processed directly by them prior to the respective App Stores and you will be subject to their credit card policies.
            </p>
          </Grid>

          <Grid  className='tc-details' item xs={12}>
            <strong>3. LEGAL ADVICE</strong>
            <Typography variant="body1" sx={{ color: 'grey',fontSize: '12px' }}>
              The contents of Lorem Ipsum app do not constitute advice and should not be relied upon in making or refraining from making, any decision. All material contained in Lorem Ipsum is provided without any or warranty of any kind. You use the material on Lorem Ipsum at your own discretion.
            </Typography>
          </Grid>

          <Grid  className='tc-details' item xs={12}>
              <strong>4. CHANGE OF USE</strong>
              <p>
                Lorem Ipsum reserves the right to:
                <ol>
                  <li>Change or remove (temporarily or permanently) the app or any part of it without notice and you confirm that Lorem Ipsum shall not be liable to you for any such change or removal.</li>
                  <li>Change these Terms and Conditions at any time, and your continued use of the app following any changes shall be deemed to be your acceptance of such change.</li>
                </ol>
              </p>
          </Grid>

          <Grid className='tc-details' item xs={12}>
              <strong>5. LINKS TO THIRD PARTY APPS AND WEBSITES</strong>
              <p>
                Lorem Ipsum app may include links to third party apps and websites that are controlled and maintained by others. Any link to other apps and websites is not an endorsement of such apps or websites and you acknowledge and agree that we are not responsible for the content or availability of any such apps and websites.
              </p>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default Terms;

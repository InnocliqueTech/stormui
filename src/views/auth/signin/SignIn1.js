import React from 'react';
// import { Card } from 'react-bootstrap';
// import { Card, Button, Alert } from 'react-bootstrap';
// import { NavLink, Link } from 'react-router-dom';

// import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';

// import { CopyToClipboard } from 'react-copy-to-clipboard';

import AuthLogin from './FirebaseLogin';
import loginbg from '../../../assets/images/LoginPageBG.webp';
// import logoshadow from '../../../assets/images/logo-shadow.webp'


const Signin1 = () => {
  return (
    <React.Fragment>
      {/* <Breadcrumb /> */}
    
        <div 
         style={{
          backgroundImage: `url(${loginbg})`,
          backgroundSize:'contain',
          // backgroundSize: '100vw 100vh',
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
          height: '100vh',
          width: '100vw', 
          overflow: 'hidden', 
        }}
        >
        {/* <Card style={{backgroundColor:"#212121", padding:"50px 150px"}}> */}
          {/* <div className="auth-content1"> */}
            {/* <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div> */}

            {/* <div className="borderless text-center" style={{borderRadius:"10px"}}> */}
              {/* <Card.Body> */}
                {/* <div className="mb-4">
                <i className="feather icon-unlock auth-icon" />
              </div> */}
                <AuthLogin />
                {/* <p className="mb-2 text-muted">
                Forgot password?{' '}
                <NavLink to="/auth/reset-password-1" className="f-w-400">
                  Reset
                </NavLink>
              </p>
              <p className="mb-0 text-muted">
                Don’t have an account?{' '}
                <NavLink to="/auth/signup-1" className="f-w-400">
                  Signup
                </NavLink>
              </p>
              <Alert variant="primary" className="text-start mt-3">
                User:
                <CopyToClipboard text="info@codedthemes.com">
                  <Button variant="outline-primary" as={Link} to="#" className="badge mx-2 mb-2" size="sm">
                    <i className="fa fa-user" /> info@codedthemes.com
                  </Button>
                </CopyToClipboard>
                <br />
                Password:
                <CopyToClipboard text="123456">
                  <Button variant="outline-primary" as={Link} to="#" className="badge mx-2" size="sm">
                    <i className="fa fa-lock" /> 123456
                  </Button>
                </CopyToClipboard>
              </Alert> */}
              {/* </Card.Body> */}
            {/* </div> */}

          {/* </div> */}
          {/* </Card> */}
        </div>
     
    </React.Fragment>
  );
};

export default Signin1;

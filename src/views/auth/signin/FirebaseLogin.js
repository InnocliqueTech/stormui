// import PropTypes from 'prop-types';
// import React, { useState } from 'react';
// import { Row, Col, Button } from 'react-bootstrap';
// import logo from '../../../assets/images/logo.png';
// import { useNavigate } from 'react-router-dom';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
// import IconButton from '@mui/material/IconButton';
// import loginbg from '../../../assets/images/loginbg.jpg'



// import * as Yup from 'yup';
// import { Formik } from 'formik';

// const FirebaseLogin = ({ className, ...rest }) => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);

//   const handleClickShowPassword = () => setShowPassword(!showPassword);
//   const handleMouseDownPassword = (event) => event.preventDefault();

//   const handleLogin = async (values, { setErrors, setSubmitting }) => {
//     try {
//       const response = await fetch('http://49.207.11.223:3307/dashboard/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           email: values.email,
//           password: values.password
//         })
//       });

//       const result = await response.json();

//       if (response.ok) {
//         sessionStorage.setItem('email', values.email);
//         sessionStorage.removeItem('dashboardReloaded');
//         sessionStorage.removeItem('gatewayReloaded');
//         sessionStorage.removeItem('zoneReloaded');
//         sessionStorage.removeItem('reloaded')

//         // alert(result.message);
//         navigate('/app/dashboard/location');

//       } else {
//         setErrors({ submit: result.message || 'Something went wrong' });
//       }
//     } catch (error) {
//       setErrors({ submit: 'Failed to login. Please try again later.' });
//     } finally {
//       setSubmitting(false);
//     }
//   };
//   return (
//     <React.Fragment>
//       <div style={{ padding: "20px" }}>
//         <img src={logo} width={100} style={{ height: "70px" }} alt="logo" />
//       </div>
//       <h6 style={{ textAlign: "left", padding: "10px 20px", fontWeight: "600" }}>Login</h6>
//       <Formik
//         initialValues={{
//           email: '',
//           password: '',
//           submit: null
//         }}
//         validationSchema={Yup.object().shape({
//           email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
//           password: Yup.string().max(255).required('Password is required')
//         })}
//         onSubmit={handleLogin}

//       >
//         {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
//           <form noValidate onSubmit={handleSubmit} className={className} {...rest}>
//             <div style={{ padding: "0px 20px" }}>
//               <div className="form-group mb-3">
//                 <h6 style={{ textAlign: "left", fontSize: "12px", color: "rgb(137 130 130)" }}>User Id</h6>
//                 <input
//                   className="form-control"
//                   label="Email Address / Username"
//                   name="email"
//                   onBlur={handleBlur}
//                   onChange={handleChange}
//                   type="email"
//                   value={values.email}
//                   placeholder='Enter User Id'
//                 />
//                 {touched.email && errors.email && (
//                   <div style={{ textAlign: 'left', color: 'red', marginTop: '5px' }}>
//                     <small>{errors.email}</small>
//                   </div>
//                 )}
//                 {/* {touched.email && errors.email && <small className="text-danger " >{errors.email}</small>} */}
//               </div>
//               <div className="form-group mb-4">
//                 <h6 style={{ textAlign: "left", fontSize: "12px", color: "rgb(137 130 130)" }}>Enter password</h6>
//                 <div style={{ position: 'relative' }}>
//                   <input
//                     className="form-control"

//                     label="Password"
//                     name="password"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     type={showPassword ? 'text' : 'password'}
//                     // type="password"
//                     value={values.password}
//                     placeholder='Enter Password'
//                     style={{ paddingRight: '40px' }}
//                   />
//                    <IconButton
//                     onClick={handleClickShowPassword}
//                     onMouseDown={handleMouseDownPassword}
//                     style={{
//                       position: 'absolute',
//                       right: 0,
//                       top: 0,
//                       height: '100%',
//                       padding: '0 25px',
//                     }}
//                     edge="end"
//                   >
//                     {showPassword ? <RemoveRedEyeIcon /> : < VisibilityOffIcon/>}
//                   </IconButton>
//                 </div>

//                 {touched.password && errors.password && (
//                   <div style={{ textAlign: 'left', color: 'red', marginTop: '5px' }}>
//                     <small>{errors.password}</small>
//                   </div>
//                 )}
//               </div>
//             </div>


//             <Row style={{ paddingBottom: "50px" }}>
//               <Col mt={2} md={12} style={{ padding: "0px 30px" }}>
//                 <Button
//                   className="btn-block"
//                   color="primary"
//                   disabled={isSubmitting}
//                   size="large"
//                   type="submit"
//                   variant="primary"
//                   style={{ width: '100%' }}
//                 >
//                   {isSubmitting ? (
//                     <>

//                       Processing...
//                     </>
//                   ) : (
//                     'Log in'
//                   )}
//                 </Button>
//                 {/* <Button className="btn-block" color="primary" disabled={isSubmitting} size="large" type="submit" variant="primary" style={{ width: "100%" }}>
//                   Log in
//                 </Button> */}
//                 {errors.submit && (
//                   <div style={{ textAlign: 'left', color: 'red', marginTop: '5px' }}>
//                     <small>{errors.submit}</small>
//                   </div>
//                 )}
//               </Col>
//             </Row>
//           </form>
//         )}
//       </Formik>

//       {/* <Row>
//         <Col sm={12}>
//           <h5 className="my-3"> OR </h5>
//         </Col>
//       </Row>

//       <Row>
//         <Col sm={12}>
//           <Button variant="danger">
//             <i className="fa fa-lock" /> Sign in with Google
//           </Button>
//         </Col>
//       </Row> */}


//     </React.Fragment>
//   );
// };

// FirebaseLogin.propTypes = {
//   className: PropTypes.string
// };

// export default FirebaseLogin;


import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
// import logo from '../../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import IconButton from '@mui/material/IconButton';
// import loginbg from '../../../assets/images/loginbg.jpg';

import * as Yup from 'yup';
import { Formik } from 'formik';

const FirebaseLogin = ({ className, ...rest }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleLogin = async (values, { setErrors, setSubmitting }) => {
    try {
      const response = await fetch('http://49.207.11.223:3307/dashboard/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password
        })
      });

      const result = await response.json();

      if (response.ok) {
        sessionStorage.setItem('email', values.email);
        sessionStorage.removeItem('dashboardReloaded');
        sessionStorage.removeItem('gatewayReloaded');
        sessionStorage.removeItem('zoneReloaded');
        sessionStorage.removeItem('reloaded');

        navigate('/app/dashboard/location');
      } else {
        setErrors({ submit: result.message || 'Something went wrong' });
      }
    } catch (error) {
      setErrors({ submit: 'Failed to login. Please try again later.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
    // style={{
    //   backgroundImage: `url(${loginbg})`,
    //   backgroundSize: 'cover',
    //   backgroundPosition: 'center',
    //   height: '100vh', // Full-screen height
    //   display: 'flex',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    // }}
    >
      {/* <div
      
      style={{
        backgroundColor: 'white', // Adding a white background for the form to make it stand out
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        width: '100%',
      }}
      > */}
      {/* <div style={{ padding: '20px' }}>
          <img src={logo} width={100} style={{ height: '70px' }} alt="logo" />
        </div>
        <h6 style={{ textAlign: 'left', padding: '10px 20px', fontWeight: '600' }}>Login</h6> */}
      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required'),
        })}
        onSubmit={handleLogin}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} className={className} {...rest}>\
            <div className='col-md-12'>
              <div className='row'>
                <div className='col-md-3'>

                </div>
                <div className='col-md-7'>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      // justifyContent: "flex-end",
                      height: "100vh",
                      alignItems: "end",
                      padding: "70px",
                      gap: "10px"
                    }}
                  >

                    {/* <div className='col-md-8'> */}
                    {/* <div className='row'

                  > */}
                    <div>
                      <h6 style={{ textAlign: 'left', fontSize: '12px', color: 'rgb(137 130 130)' }}>User Id</h6>
                      <input
                        className="form-control"
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="email"
                        value={values.email}
                        placeholder="Enter User Id"
                      />
                      {touched.email && errors.email && (
                        <div style={{ textAlign: 'left', color: 'red', marginTop: '5px' }}>
                          <small>{errors.email}</small>
                        </div>
                      )}
                    </div>
                    <div >
                      <h6 style={{ textAlign: 'left', fontSize: '12px', color: 'rgb(137 130 130)' }}>Enter password</h6>
                      <div style={{ position: 'relative' }}>
                        <input
                          className="form-control"
                          name="password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type={showPassword ? 'text' : 'password'}
                          value={values.password}
                          placeholder="Enter Password"
                          style={{ paddingRight: '40px' }}
                        />
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          style={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            height: '100%',
                            padding: '0 25px',
                          }}
                          edge="end"
                        >
                          {showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </div>
                      {touched.password && errors.password && (
                        <div style={{ textAlign: 'left', color: 'red', marginTop: '5px' }}>
                          <small>{errors.password}</small>
                        </div>
                      )}
                    </div>
                    <div>
                      <Button
                        className="btn-block"
                        color="primary"
                        disabled={isSubmitting}
                        size="large"
                        type="submit"
                        variant="primary"
                        style={{ width: '100%', marginTop: "20px" }}
                      >
                        {isSubmitting ? 'Processing...' : 'Log in'}
                      </Button>
                      {errors.submit && (
                        <div style={{ textAlign: 'left', color: 'red', marginTop: '5px' }}>
                          <small>{errors.submit}</small>
                        </div>
                      )}
                    </div>
                    {/* </div> */}
                    {/* </div> */}

                  </div>
                </div>
                <div className='col-md-2'>

                </div>
              </div>
            </div>

            {/* <div
                style={{ padding: '0px 20px' }}
              >
                <div className="form-group mb-3">
                  <h6 style={{ textAlign: 'left', fontSize: '12px', color: 'rgb(137 130 130)' }}>User Id</h6>
                  <input
                    className="form-control"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                    placeholder="Enter User Id"
                  />
                  {touched.email && errors.email && (
                    <div style={{ textAlign: 'left', color: 'red', marginTop: '5px' }}>
                      <small>{errors.email}</small>
                    </div>
                  )}
                </div>
                <div className="form-group mb-4">
                  <h6 style={{ textAlign: 'left', fontSize: '12px', color: 'rgb(137 130 130)' }}>Enter password</h6>
                  <div style={{ position: 'relative' }}>
                    <input
                      className="form-control"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type={showPassword ? 'text' : 'password'}
                      value={values.password}
                      placeholder="Enter Password"
                      style={{ paddingRight: '40px' }}
                    />
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        height: '100%',
                        padding: '0 25px',
                      }}
                      edge="end"
                    >
                      {showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </div>
                  {touched.password && errors.password && (
                    <div style={{ textAlign: 'left', color: 'red', marginTop: '5px' }}>
                      <small>{errors.password}</small>
                    </div>
                  )}
                </div>
              </div>

              <Row style={{ paddingBottom: '50px' }}>
                <Col mt={2} md={12} style={{ padding: '0px 30px' }}>
                  <Button
                    className="btn-block"
                    color="primary"
                    disabled={isSubmitting}
                    size="large"
                    type="submit"
                    variant="primary"
                    style={{ width: '100%' }}
                  >
                    {isSubmitting ? 'Processing...' : 'Log in'}
                  </Button>
                  {errors.submit && (
                    <div style={{ textAlign: 'left', color: 'red', marginTop: '5px' }}>
                      <small>{errors.submit}</small>
                    </div>
                  )}
                </Col>
              </Row> */}
          </form>
        )}
      </Formik>
      {/* </div> */}
    </div>
  );
};

FirebaseLogin.propTypes = {
  className: PropTypes.string,
};

export default FirebaseLogin;

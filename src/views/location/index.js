import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './location.css';  // Import the CSS file
import HomeEdit from '../../assets/images/HomeEdit.png'
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import image from './image2835.png';
import {ClientsContext} from '../../views/dashboard/context/index'
import { Link } from 'react-router-dom';
export default function Location() {
  const { clients } = useContext(ClientsContext);
  return (
    <>
    <h2 style={{fontSize:32,fontWeight:700, color:'#212121', marginTop:0}} className="">Welcome to Storm Energy</h2>
    <div className="mt-4">
      <Row className="justify-content-start">
        {clients.map((project, index) => (
          <Col md={4} className="mb-4" key={index}>
            <div className="card border-0" style={{borderRadius:16}}>
            <Link to="/app/dashboard/default">
              <img className="card-img-top" src={image} alt={project.title} />
              </Link>
              <div className="">
                <Row className='row p-0 m-0'>
                  <Col className='p-0' md={10} sm={1} xs={1}>
                    <Link to="/app/dashboard/default">
                      <a style={{ color: "black", textDecoration: 'none' }}>
                        <h5 className="card-title m-0 p-0">{project.clientName}</h5>
                      </a>
                    </Link>
                  </Col>
                  
                  <Col md={2} sm={1} xs={1} className='p-0 text-end' >
                    <img src={HomeEdit} style={{background:'#F4F5F5', width:24, height:24, borderRadius:6, padding:4}}  alt="uparrow" /> 
                  </Col> 
                </Row>
                
                <p className="card-text">{project.description}</p>
                <div className="d-flex justify-content-between">
                  <div className="custom-zones">
                    <small>Zones:</small>
                    <strong> {project.totalZonesCount}</strong>
                  </div>
                  <div className='custom-zones'>
                    <small>DMAs:</small>
                    <strong>{project.totalDMACount}</strong> 
                  </div>
                  <div className='custom-zones'>
                    <small>Meters:</small>
                    <strong>{project.meters}</strong> 
                  </div>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
</>
);
}
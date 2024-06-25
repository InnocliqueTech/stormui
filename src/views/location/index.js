import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './location.css';  // Import the CSS file
import image from './image2835.png';
import HomeEdit from '../../assets/images/HomeEdit.png'
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';

const projects = [
  {
    title: 'Karimnagar Smart City Corporation',
    description: '24/7 Water Supply Pilot Project',
    zones: 6,
    dmas: 24,
    meters: 1345,
    imgSrc: image, // Use the imported image
  },
  {
    title: 'MCK ',
    description: '24/7 Water Supply Pilot Project',
    zones: 6,
    dmas: 24,
    meters: 1345,
    imgSrc: image, // Use the imported image
  },
  {
    title: 'Smart City',
    description: '24/7 Water Supply Pilot Project',
    zones: 6,
    dmas: 24,
    meters: 1345,
    imgSrc: image, // Use the imported image
  },
];

export default function Location() {
  return (
    <>
      <h2 style={{fontSize:32,fontWeight:700, color:'#212121'}} className="mb-2 mt-3">Welcome to Strom Energy</h2>
    <div className="container mt-4" style={{margin:"-4px"}}>
      <div className="row">
        {projects.map((project, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card border-0">
              <img className="card-img-top" src={project.imgSrc} alt={project.title} />
              <div className="">
                <Row className='row p-0 m-0'>
                  <Col className='p-0' md={10} sm={1} xs={1}>
                    <a style={{color:"black", textDecoration:'none'}} href = "http://49.207.11.223:3308/app/dashboard/default">
                    <h5 className="card-title">{project.title}</h5>
                    </a>
                  </Col>
                  <Col md={2} sm={1} xs={1} className='p-0 text-end' >
                    <img src={HomeEdit} style={{background:'#F4F5F5', width:24, height:24, borderRadius:6, padding:4}}  alt="uparrow" /> 
                  </Col>
                </Row>
                
                <p className="card-text">{project.description}</p>
                <div className="d-flex justify-content-between">
                  <div className="custom-zones">
                  <small>Zones:</small>
                  <strong> {project.zones}</strong>
                  </div>
                  <div className='custom-zones'>
                    <small>DMAs:</small>
                    <strong>{project.dmas}</strong> 
                  </div>
                  <div className='custom-zones'>
                    <small>Meters:</small>
                    <strong>{project.meters}</strong> 
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
        </>
  );
}

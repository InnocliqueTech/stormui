import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './location.css';  // Import the CSS file
import image from './image2835.png';

const projects = [
  {
    title: 'Karimnagar Smart City Corporation LTD',
    description: '24/7 Water Supply Pilot Project',
    zones: 6,
    dmas: 24,
    meters: 1345,
    imgSrc: image, // Use the imported image
  },
  {
    title: 'MCK Smart City Corporation LTD Hyd, Telangana',
    description: '24/7 Water Supply Pilot Project',
    zones: 6,
    dmas: 24,
    meters: 1345,
    imgSrc: image, // Use the imported image
  },
  {
    title: 'Smart City Corporation LTD Hyd, Telangana',
    description: '24/7 Water Supply Pilot Project',
    zones: 6,
    dmas: 24,
    meters: 1345,
    imgSrc: image, // Use the imported image
  },
];

export default function Location() {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Welcome to Strom Energy</h2>
      <div className="row">
        {projects.map((project, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card">
              <img className="card-img-top" src={project.imgSrc} alt={project.title} />
              <div className="card-body">
                <a style={{color:"black"}} href = "http://localhost:3000/app/dashboard/default">
                <h5 className="card-title">{project.title}</h5>
                </a>
                <p className="card-text">{project.description}</p>
                <div className="d-flex justify-content-between">
                  <div className="custom-zones">
                    <strong>Zones:</strong> {project.zones}
                  </div>
                  <div className='custom-zones'>
                    <strong>DMAs:</strong> {project.dmas}
                  </div>
                  <div className='custom-zones'>
                    <strong>Meters:</strong> {project.meters}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

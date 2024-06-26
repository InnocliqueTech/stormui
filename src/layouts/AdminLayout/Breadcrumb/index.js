import React, { useContext, useState, useEffect } from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { ClientsContext } from '../../../views/dashboard/context/index';

import navigation from '../../../menu-items';
import { BASE_API_URL1, BASE_TITLE } from '../../../config/constant';
import { DateRange } from '@mui/icons-material';
import axios from 'axios';

const Breadcrumb = () => {
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState("7D");
  const [main, setMain] = useState([]);
  const [item, setItem] = useState([]);
  const { clients, selectedClient, setSelectedClient } = useContext(ClientsContext);
  const [, setZones] = useState([]);

  useEffect(() => {
    const fetchZones = async (clientId) => {
      try {
        const response = await axios.post(BASE_API_URL1 +'zones/getAllZoneDetailsWithClientId', {
          clientId,
        });
        setZones(response.data.zonesList);
      } catch (error) {
        console.error("Error fetching zones:", error);
      }
    };
    
    if (selectedClient) {
      fetchZones(selectedClient);
    }
  }, [selectedClient]);






  useEffect(() => {
    navigation.items.forEach((item, index) => {
      if (item.type && item.type === 'group') {
        getCollapse(item, index);
      }
    });
  }, [location.pathname]);

  const getCollapse = (item, index) => {
    if (item.children) {
      item.children.forEach((collapse) => {
        if (collapse.type && collapse.type === 'collapse') {
          getCollapse(collapse, index);
        } else if (collapse.type && collapse.type === 'item') {
          if (location.pathname === collapse.url) {
            setMain(item);
            setItem(collapse);
          }
        }
      });
    }
  };

  let mainContent;
  let breadcrumbContent = '';
  let title = '';

  if (main && main.type === 'collapse') {
    mainContent = (
      <ListGroup.Item as="li" className="breadcrumb-item">
        <Link to="#">{main.title}</Link>
      </ListGroup.Item>
    );
  }

  if (item && item.type === 'item') {
    title = item.title;

    if (title === 'Settings' || title === 'Home') {
      breadcrumbContent = null;
    } else {
      breadcrumbContent = (
        <div className="page-header pb-3">
          <div className="page-block">
            <div className="row align-items-center">
              <div className="col-md-12">
                <div className="page-header-title">
                  <h5 className="m-b-10">{mainContent}</h5>
                </div>
                <Row className='d-flex justify-content-around'>
                  <Col md={6} sm={12} xs={12}>
                    <div className="dashheading">
                      <Link className={title === "Dashboard" ? "title" : location.pathname.toLowerCase().includes("list") ? "tab" : "tab active"} to={`/app/${title}`} >{title !== "Dashboard" ? "Dashboard" : title}</Link>
                      {title !== "Dashboard" &&
                        <span>
                          <Link className={location.pathname.toLowerCase().includes("list") ? "tab active" : "tab"} to={`/app/${title}List`} >{title} List</Link>
                        </span>
                      }
                    </div>
                  </Col>
                  <Col md={6} sm={12} xs={12} className='d-flex justify-content-end' style={{ paddingRight: '18px' }}>
                    <div className="row days-filter float-end" style={{ marginRight: '15px' }}>
                      <div className="col-md-12" style={{ padding: 0 }}>
                        <button className={`days ${selectedDate === "1D" ? "active" : ""}`} onClick={() => setSelectedDate("1D")}>1D</button>
                        <button className={`days ${selectedDate === "7D" ? "active" : ""}`} onClick={() => setSelectedDate("7D")}>7D</button>
                        <button className={`days ${selectedDate === "14D" ? "active" : ""}`} onClick={() => setSelectedDate("14D")}>14D</button>
                        <button className={`days ${selectedDate === "30D" ? "active" : ""}`} onClick={() => setSelectedDate("30D")}>30D</button>
                        <button className={`days`}>
                          <DateRange />
                        </button>
                      </div>
                    </div>
                    <Col md={2} sm={7} xs={7} style={{ padding: 2, textAlign: 'end', justifyContent: 'end', display: 'flex', width: '160px', marginRight: '15px' }}>
                      <div className="form-group selectcustom">
                        <select
                          className="form-control"
                          value={selectedClient}
                          onChange={(e) => setSelectedClient(e.target.value)}
                        >
                          <option>Select Client</option>
                          <option value="all">All</option>
                          {clients.map(client => (
                            <option key={client.clientId} value={client.clientId}>
                              {client.clientName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </Col>
                   
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      );
    }

    document.title = title + BASE_TITLE;
  }

  return <React.Fragment>{breadcrumbContent}</React.Fragment>;
};

export default Breadcrumb;

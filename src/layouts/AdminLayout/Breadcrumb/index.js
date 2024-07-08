import React, { useState, useEffect, useContext } from 'react';
import './index.css';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { ClientsContext } from '../../../views/dashboard/context/index';
import navigation from '../../../menu-items';
import { BASE_API_URL1, BASE_TITLE } from '../../../config/constant';
import axios from 'axios';
import { useStateContext } from '../../../contexts/MainContext';
import { format, isValid, parseISO } from 'date-fns';
import DateRangeIcon from '@mui/icons-material/DateRange';
import NewDatePicker from './NewDatePicker';

const handleChange = (e, setValue) => {
  const { value } = e.target;
  setValue(value);
};

const Breadcrumb = () => {
  const location = useLocation();
  const [main, setMain] = useState([]);
  const [item, setItem] = useState([]);
  const { selectedClient, setSelectedClient } = useContext(ClientsContext);
  const { onDateChange,selectedDate,setSelectedDate,isDatePickerOpen,toggleDatePicker  } = useStateContext();
  const [zones, setZones] = useState([]);





  useEffect(() => {
    const fetchZones = async (clientId) => {
      try {
        const response = await axios.post(BASE_API_URL1 + 'zones/getAllZoneDetailsWithClientId', {
          clientId
        });
        setZones(response.data.zonesList);
      } catch (error) {
        console.error('Error fetching zones:', error);
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
        <div className="page-header pb-4">
          <div className="page-block">
            <div className="row align-items-center">
              <div className="col-md-12">
                <div className="page-header-title">
                  <h5 className="m-b-10">{mainContent}</h5>
                </div>
                <Row className="d-flex">
                  <Col
                    className="d-flex align-items-center"
                    style={{
                      padding: '0px 15px'
                    }}
                  >
                    <Col md={6} sm={12} xs={12}>
                      <div className="dashheading">
                        {title !== 'Dashboard' && (
                          <span>
                            {location.pathname.startsWith('/app/client') && (
                              <>
                                <Link className={location.pathname === '/app/client' ? 'tab active' : 'tab'} to="/app/client">
                                  Dashboard
                                </Link>
                                <Link
                                  className={location.pathname.toLowerCase().includes('clientlist') ? 'tab active' : 'tab'}
                                  to="/app/clientlist"
                                >
                                  Client List
                                </Link>
                                <Link
                                  className={location.pathname.toLowerCase().includes('dmalist') ? 'tab active' : 'tab'}
                                  to="/app/dmalist"
                                >
                                  DmaList
                                </Link>
                              </>
                            )}
                          </span>
                        )}
                      </div>
                    </Col>

                    <section className="seconde-section">
                      <div className="days-date-picker">
                        <div>
                          {[
                            { day: '1D', add: 1 },
                            { day: '7D', add: 7 },
                            { day: '14D', add: 14 },
                            { day: '30D', add: 30 }
                          ].map((obj) => {
                            return (
                              <button
                                className={`days ${selectedDate === obj.day ? 'active' : ''}`}
                                onClick={() => {
                                  setSelectedDate(obj.day);
                                  onDateChange(obj.add);
                                }}
                                key={obj.day}
                              >
                                {obj.day}
                              </button>
                            );
                          })}

                          {isDatePickerOpen && (
                            <div className="date-picker">
                              <NewDatePicker />
                            </div>
                          )}
                        </div>

                        <div className="">
                          <button className="icon-button" onClick={toggleDatePicker}>
                            <DateRangeIcon />
                          </button>
                        </div>
                      </div>

                      {location.pathname !== '/app/GatewayList' && (
                        <div>
                          <div className="form-group selectcustom">
                            <select className="form-control" value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)}>
                              <option>Select Zone</option>
                              <option value="all">All</option>
                              {zones.map((zone) => (
                                <option key={zone.zoneId} value={zone.gatewayId}>
                                  {zone.zoneId}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )}
                    </section>
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

export function Date_Input({ name, placeholder, value, readOnly, setValue }) {
  const dateValue = value ? parseISO(value) : null;
  const formattedDate = isValid(dateValue) ? format(new Date(dateValue), 'yyyy-MM-dd') : '';
  return (
    <>
      <div className="total-form">
        <div className="main_label">
          <label htmlFor={name}>{placeholder}</label>
        </div>
        <div className="main-input">
          <div className="input">
            <input
              type="date"
              id={name}
              name={name}
              placeholder={placeholder}
              value={formattedDate}
              onChange={(e) => handleChange(e, setValue)}
              readOnly={readOnly}
              className=" custom-date-input"
            />
          </div>
        </div>
      </div>
    </>
  );
}

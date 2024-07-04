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
import { DateRangePicker, LocalizationProvider, SingleInputDateRangeField } from '@mui/x-date-pickers-pro';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const handleChange = (e, setValue) => {
  const { value } = e.target;
  setValue(value);
};

const Breadcrumb = () => {
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState('7d');
  const [main, setMain] = useState([]);
  const [item, setItem] = useState([]);
  const { selectedClient, setSelectedClient } = useContext(ClientsContext);
  const { onDateChange, setPresentDate, presentDate, toDate, setToDate } = useStateContext(); //presentDate, toDate, setPresentDate, setToDate
  const [zones, setZones] = useState([]);

  const [isDatePickerOpen, setDatePickerOpen] = useState(false);

  const toggleDatePicker = () => {
    setDatePickerOpen(!isDatePickerOpen);
  };

  const handleDateChange = (date) => {
    if (date[0]) {
      const startDate = new Date(date[0]);
      if (!isNaN(startDate)) {
        const formattedDate = format(startDate, 'yyyy-MM-dd');
        setPresentDate(formattedDate);
      }
    }
    if (date[1]) {
      const endDate = new Date(date[1]);
      if (!isNaN(endDate)) {
        const formattedDate = format(endDate, 'yyyy-MM-dd');
        setToDate(formattedDate);
      }
    }
  };
  
  console.log(presentDate, toDate, 'presentdate', 'toDate');
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
        <div className="page-header pb-3">
          <div className="page-block">
            <div className="row align-items-center">
              <div className="col-md-12">
                <div className="page-header-title">
                  <h5 className="m-b-10">{mainContent}</h5>
                </div>
                <Row className="d-flex justify-content-around">
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
                  <Col
                    md={6}
                    sm={12}
                    xs={12}
                    className="d-flex justify-content-end"
                    style={{
                      padding: 2,
                      width: '100%'
                    }}
                  >
                    <div className="days-date-picker">
                      <div className="" style={{ padding: 0 }}>
                        {[
                          { day: '1d', add: 1 },
                          { day: '7d', add: 7 },
                          { day: '14d', add: 14 },
                          { day: '30d', add: 30 }
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

                        {/* Calendar icon to toggle date picker */}

                        {/* Render the date picker based on state */}
                        {isDatePickerOpen && (
                          <div className="date-picker" style={{ backgroundColor: 'white', border: 'none' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={['SingleInputDateRangeField']}>
                                <DateRangePicker
                                  slots={{ field: SingleInputDateRangeField }}
                                  name="allowedRange"
                                  onChange={handleDateChange}
                                />
                              </DemoContainer>
                            </LocalizationProvider>
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
                      <Col
                        md={2}
                        sm={7}
                        xs={7}
                        style={{
                          padding: 2,
                          textAlign: 'end',
                          justifyContent: 'end',
                          display: 'flex',
                          width: '160px',
                          marginRight: '15px'
                        }}
                      >
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
                      </Col>
                    )}
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

// export const MultipleDateRangesChange = ({ setPresentDate, setToDate, presentDate, toDate }) => {

//   console.log(setPresentDate,setToDate,presentDate,toDate)
//   return (
//     <Col
//       md={2}
//       sm={7}
//       xs={7}
//       style={{
//         padding: 2,
//         textAlign: 'end',
//         justifyContent: 'end',
//         display: 'flex',
//         width: '300px',
//         marginRight: '15px',
//         gap: '10px',
//         transform: 'translate(10px,-15px)'
//       }}
//       className="d-flex g-4"
//     >

//     <DateRange
//         ranges={[{ startDate: presentDate, endDate: toDate, key: 'selection' }]}
//         onChange={(ranges) => {

//           if (ranges.selection) {
//             setPresentDate(ranges.selection.startDate);
//             setToDate(ranges.selection.endDate);
//           }
//         }}

//         moveRangeOnFirstSelection={false}
//         editableDateInputs={true}
//         rangeColors={['#8774df']}
//       />

//       <h2>hello world</h2>
//     </Col>
//   );
// };

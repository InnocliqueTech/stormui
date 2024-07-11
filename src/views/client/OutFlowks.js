import React, { useEffect, useState ,useContext} from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import over from '../../assets/images/symbols_water.svg';
import { Col, Image, Row } from 'react-bootstrap';
import info from '../../assets/images/i_icons.svg';
import { useStateContext } from '../../contexts/MainContext';
import { ClientsContext } from '../dashboard/context/index';
const Overflowks = (props) => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const { presentDate, toDate } = useStateContext();
  const {  selectedClient,  selectedZone } = useContext(ClientsContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://49.207.11.223:3307/dashboard/getTotalOutflowInDashboard', {
          clientId: selectedClient,
          zoneId: selectedZone || 0,
          fromDate: presentDate,
          toDate: toDate
        });

        if (response.data && response.data.totalOutFlow) {
          let counts = [];
          let dates = [];
          response.data.totalOutFlow.forEach((flow) => {
            counts.push(flow.count);
            dates.push(flow.date);
          });
          setData([
            {
              name: 'Out  Flow Trend',
              data: counts
            }
          ]);
          setCategories(dates);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [props, presentDate, toDate]);

  const options = {
    colors: ['#2196F3', '#80CAEE'],
    chart: {
      fontFamily: 'inter',
      type: 'bar',
      height: 500,
      stacked: true,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    responsive: [
      {
        breakpoint: 1536,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 0,
              columnWidth: 20 // Adjust column width here for better spacing
            }
          }
        }
      }
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 0,
        columnWidth: '50%', // Adjust column width here for better spacing
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last'
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: categories,
      tickPlacement: 'on',
      labels: {
        show: true,
        rotate: -45,
        rotateAlways: true,
        hideOverlappingLabels: true,
        showDuplicates: false,
        trim: true,
        maxHeight: 120,
        style: {
          fontSize: '12px',
          fontWeight: 400
        }
      },
      title: {
        offsetY: -10,
        style: {
          fontSize: '14px',
          fontWeight: 600
        }
      },
      scrollbar: {
        enabled: true, // Enable the scrollbar
        height: 20,
        borderRadius: 2,
        barBackgroundColor: '#90CAF9',
        barHeight: 2,
        barBorderRadius: 2,
        barBorderColor: '#2196F3'
      }
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      fontFamily: 'inter',
      fontWeight: 600,
      fontSize: '14px',
      showForSingleSeries: true,
      markers: {
        radius: 0
      }
    },
    fill: {
      opacity: 1
    }
  };

  return (
    <div className="col-span-12 rounded-sm bg-white px-1 shadow-default sm:px-2 xl:col-span-6">
      <Row>
        <Col md={1} sm={1} xs={1} className="iconContainer" style={{ backgroundColor: '#F6C574' }}>
          <Image src={over} alt="over" className="icon" />
        </Col>
        <Col md={8} sm={8} xs={8}>
          <div className="alerttext">
        Out Flow Trend{' '}
            <span>
              <Image src={info} alt="gateway" />
            </span>{' '}
          </div>
        </Col>
      </Row>
      <ReactApexChart options={options} series={data} type="bar" width="100%" height={250} />
    </div>
  );
};

export default Overflowks;

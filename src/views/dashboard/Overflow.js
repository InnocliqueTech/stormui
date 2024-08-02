import React, { useEffect, useState, useContext } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import over from '../../assets/images/symbols_water.svg';
import { Col, Image, Row } from 'react-bootstrap';
import info from '../../assets/images/i_icons.svg';
import { ClientsContext } from '../dashboard/context/index';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const Overflow = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const { selectedClient, selectedZone } = useContext(ClientsContext);
 

  useEffect(() => {
    fetchData();
  }, [selectedDate, selectedClient, selectedZone]);

  const fetchData = async () => {


    try {
      const fromDate = selectedDate.startOf('month').format('YYYY-MM-DD');
      const toDate = selectedDate.endOf('month').format('YYYY-MM-DD');
      const requestBody = {
        clientId: selectedClient,
        zoneId: selectedZone || 0,
        dmaId: 0,
        meterId: 2275,
        fromDate: fromDate,
        toDate: toDate
      }
      const response = await axios.post('http://49.207.11.223:3307/meters/getMeterDetailsWithMeterId', requestBody);
      console.log(requestBody)
      console.log(response)
      console.log(response.data.deviceDetails)
      if (response.data && response.data.meterAnalytics && response.data.meterAnalytics.usage) {
        const usage = response.data.meterAnalytics.usage;

        // Generate array for days of the month
        const daysInMonth = dayjs(selectedDate).daysInMonth();
        const allDays = Array.from({ length: daysInMonth }, (_, index) => index + 1); // [1, 2, ..., daysInMonth]


        // Create a map for usage data for easy lookup
        const usageMap = usage.reduce((acc, u) => {
          const day = dayjs(u.date).date(); // Get the day from the date
          acc[day] = u.value; // Map day to value
          return acc;
        }, {});

        const counts = allDays.map(day => usageMap[day] || 0); // Default to 0 if no data for that day
        // let counts = usage.map(u => u.value);
        // let dates = usage.map(u => u.date);
        setData([
          {
            name: 'Meter Usage',
            data: counts
          }
        ]);
        setCategories(dates);


      } 



    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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
        rotate: 0, // You can adjust rotation if needed
        hideOverlappingLabels: true,
        showDuplicates: false,
        trim: true,
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
        enabled: true,
        height: 20,
        borderRadius: 2,
        barBackgroundColor: '#90CAF9',
        barHeight: 2,
        barBorderRadius: 2,
        barBorderColor: '#2196F3'
      }
    },
    // xaxis: {
    //   categories: categories,
    //   tickPlacement: 'on',
    //   labels: {
    //     show: true,
    //     rotate: -45,
    //     rotateAlways: true,
    //     hideOverlappingLabels: true,
    //     showDuplicates: false,
    //     trim: true,
    //     maxHeight: 120,
    //     style: {
    //       fontSize: '12px',
    //       fontWeight: 400
    //     }
    //   },
    //   title: {
    //     offsetY: -10,
    //     style: {
    //       fontSize: '14px',
    //       fontWeight: 600
    //     }
    //   },
    //   scrollbar: {
    //     enabled: true, // Enable the scrollbar
    //     height: 20,
    //     borderRadius: 2,
    //     barBackgroundColor: '#90CAF9',
    //     barHeight: 2,
    //     barBorderRadius: 2,
    //     barBorderColor: '#2196F3'
    //   }
    // },
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
    <>
    <div className="col-span-12 rounded-sm bg-white px-1 shadow-default sm:px-2 xl:col-span-6">
      <div style={{ float: "right" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            views={['year', 'month']}
            label="Select Month"
            minDate={dayjs('2024-01-01')}
            maxDate={dayjs('2024-12-31')}
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
          />
        </LocalizationProvider>
      </div>
      <Row>
        <Col md={7} sm={7} xs={7}>
          <Image style={{ backgroundColor: '#F6C574', marginRight: "10px" }} src={over} alt="over" className="icon" />
          <span className="alerttext">
            Usage{' '}
            <span>
              <Image src={info} alt="gateway" />
            </span>{' '}
          </span>
        </Col>
      </Row>
      <ReactApexChart options={options} series={data} type="bar" width="100%" height={250} />
     
    </div>
    <div className="col-span-12 rounded-sm px-1 shadow-default sm:px-2 xl:col-span-6">
    <Row className='mt-3'>
        <Col md={7} sm={7} xs={7}>
         
          <span className="alerttext">
            Extended Summary{' '}
            
          </span>
        </Col>
      </Row>
    </div>
    </>
  );
};

export default Overflow;

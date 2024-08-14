// import * as React from 'react';
// import { BarChart } from '@mui/x-charts/BarChart';
// import { Card, Col } from 'react-bootstrap';
// import TotalMeters from '../../dashboard/TotalMeters';


// export default function Analytics() {
//   return (
//     <>
//     <BarChart
//       series={[
//           { data: [3, 4, 1, 6, 5], stack: 'A', label: 'Series A1' },
//           { data: [4, 3, 1, 5, 8], stack: 'A', label: 'Series A2' },
//           { data: [4, 2, 5, 4, 1], stack: 'B', label: 'Series B1' },
//           { data: [2, 8, 1, 3, 1], stack: 'B', label: 'Series B2' },
//           { data: [10, 6, 5, 8, 9], label: 'Series C1' },
//           ]}
//           width={600}
//           height={350}
//           />
//           <Col md={6} xl={4} sm={12}>
//           <Card className="card-social">
//             <Card.Body className="border-bottom">
//               <TotalMeters  />
//             </Card.Body>
//           </Card>
//         </Col>
//           </>
//   );
// }



import React, { useEffect, useState, useContext } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import over from '../../../assets/images/symbols_water.svg';
import { Col, Image, Row } from 'react-bootstrap';
import info from '../../../assets/images/i_icons.svg';
import { ClientsContext } from '../../dashboard/context';
// import { ClientsContext } from '../dashboard/context/index';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';

import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement,   CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
 } from "chart.js";

Chart.register(ArcElement,CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend);

// const data2 = {
//   datasets: [
//     {
//       data: [20,10],
//       backgroundColor: [
//         "#336699",
//         "#FFFFFF",
        
//       ],
//       display: true,
//       borderColor: "#D1D6DC"
//     }
//   ]
// };


const SemiDonutChart = ({ title, series, color, left }) => {
  // let col = ["#FFFFFF", color]
  let restData = Math.floor(100 - Number(series))
  console.log('ddddd', color, series, title, restData)
  const data2 = {
    datasets: [
      {
        data: [series, restData],
        backgroundColor: [
          color,
          "#f4f5f5",
          
        ],
        display: true,
        borderColor: "#D1D6DC"
      }
    ],
    plugins: {
      tooltip: {
          callbacks: {
              label: function(context) {
                console.log('LABEL', label)
                  let label = context.dataset.label || '';

                  if (label) {
                      label += ': ';
                  }
                  if (context.parsed.y !== null) {
                      label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                  }
                  return label;
              }
          }
      }
    }

  };

  return (
    <div>
      <Doughnut
        data={data2}
        options={{
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: false
            }
          },
          rotation: -90,
          circumference: 180,
          cutout: "60%",
          maintainAspectRatio: true,
          responsive: true
        }}
      />
      <div
        style={{
          position: "relative",
          top: "%",
          left: left,
          // transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "black"
        }}
      >
        <div>{series}</div>
      </div>
    </div>
  );
};


const Analytics = ({ data1, onAnalyticsData }) => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const { selectedClient, selectedZone } = useContext(ClientsContext);
  const [minUsagePerDay, setMinUsagePerDay] = useState(0);
  const [maxUsagePerDay, setMaxUsagePerDay] = useState(0);
  const [avgUsagePerDay, setAvgUsagePerDay] = useState(0);
  const [medianUsagePerDay, setMedianUsagePerDay] = useState(0);
  const [meterDetails, setMeterDetails] = useState([])
  const [deviceDetails, setDeviceDetails] = useState([])
  const[analyticsDetails, setAnalyticsDetails ] = useState({
    meterDetails:{},
    deviceDetails:{}
  })



  const location = useLocation();
  const { zoneId, dmaId, gatewayId } = location.state || { zoneId: selectedZone, dmaId: 0, gatewayId: 0 }


  console.log(data1)

  useEffect(() => {
    fetchData();
  }, [selectedDate, selectedClient, selectedZone]);


  useEffect(() => {
    onAnalyticsData(analyticsDetails)
  }, [analyticsDetails])



  const fetchData = async () => {


    try {
      const fromDate = selectedDate.startOf('month').format('YYYY-MM-DD');
      const toDate = selectedDate.endOf('month').format('YYYY-MM-DD');
      const requestBody = {
        clientId: selectedClient,
        zoneId: zoneId,
        gatewayId: gatewayId,
        dmaId: dmaId,
        meterId: data1.meterId,
        fromDate: fromDate,
        toDate: toDate
      }
     
      const response = await axios.post('http://49.207.11.223:3307/meters/getMeterDetailsWithMeterId', requestBody);
      console.log(requestBody)
      console.log(response)
      console.log(response.data.meterDetails)
      console.log(response.data.deviceDetails)
      if (response.data && response.data.meterAnalytics && response.data.meterAnalytics.extendedSummary) {
        const extendedSummary = response.data.meterAnalytics.extendedSummary
        console.log(extendedSummary)
        setMinUsagePerDay(extendedSummary.minUsagePerDay)
        console.log(extendedSummary.minUsagePerDay)
        setMaxUsagePerDay(extendedSummary.maxUsagePerDay)
        setAvgUsagePerDay(extendedSummary.avgUsagePerDay)
        setMedianUsagePerDay(extendedSummary.medianUsagePerDay)
        console.log(minUsagePerDay, maxUsagePerDay, avgUsagePerDay, medianUsagePerDay)
      }
      if (response.data && response.data) {
        let obj = {
          meterDetails: response.data.meterDetails,
          deviceDetails: response.data.deviceDetails
        }
        setAnalyticsDetails(obj)
        // setMeterDetails(response.data.meterDetails)
      }
      if (response.data && response.data.deviceDetails) {
        // setDeviceDetails(response.data.deviceDetails)
      }
      // console.log(meterDetails)
      // console.log(deviceDetails)
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
      <div className="col-span-12 rounded-sm bg-white px-1 shadow-default sm:px-2 xl:col-span-6 mb-4 p-3">
        <div style={{ float: "right" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              views={['year', 'month']}
              label="Select Month"
              minDate={dayjs('1900-01-01')}
              // minDate={dayjs('2024-01-01')}
              // maxDate={dayjs('2024-12-31')}
              maxDate={dayjs(new Date().getFullYear() + '-12-31')}
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
            />
          </LocalizationProvider>
        </div>
        <Row>
          <Col md={7} sm={7} xs={7}>
            <Image style={{ backgroundColor: '#F6C574', marginRight: "10px", borderRadius:"50%", padding:"5px" }} src={over} alt="over" className="icon" />
            <span className="alerttext" style={{fontWeight:"600", fontSize:"16px"}}>
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



        <span className="alerttext" style={{fontWeight:"600", fontSize:"16px"}}>
          Extended Summary{' '}
          <Row className='mt-3 bg-white p-3'>
            <Col md={3} sm={6} xs={6}>
            <h6 style={{fontWeight:"600"}}>Min Usage/day</h6>
              <SemiDonutChart
               title="Min Usage Per Day" 
               series={[minUsagePerDay]}  
               value={minUsagePerDay}
               color="#00b4eb" 
              //  left="12%" 
               />
            </Col>
            <Col md={3} sm={6} xs={6}>
            <h6 style={{fontWeight:"600"}}>Min Usage/day</h6>
              <SemiDonutChart 
              title="Max Usage Per Day" 
              series={[maxUsagePerDay]} 
              value={maxUsagePerDay}
              color="#0d47a1"
              // left="36%"
              />
            </Col>
            <Col md={3} sm={6} xs={6}>
            <h6 style={{fontWeight:"600"}}>Avg Usage/day</h6>
              <SemiDonutChart 
              title="Avg Usage Per Day" 
              series={[avgUsagePerDay]} 
              value={avgUsagePerDay}
              color="#ffa400" 
              // left="60%" 
              />
            </Col>
            <Col md={3} sm={6} xs={6}>
            <h6 style={{fontWeight:"600"}}>Medium Usage/day</h6>
              <SemiDonutChart 
              title="Median Usage Per Day" 
              series={[medianUsagePerDay]} 
              value={medianUsagePerDay}
              color="#1dd0bb" 
              // left="83%" 
              />
            </Col>
          </Row>
        </span>


      </div>
    </>
  );
};

export default Analytics;
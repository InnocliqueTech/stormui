import React, { useEffect, useState } from 'react';
// import ReactApexChart from 'react-apexcharts';
import { format } from 'date-fns';
// import { Col, Image, Row } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
// import info from '../../assets/images/i_icons.svg';
import { useStateContext } from '../../../contexts/MainContext';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
// Registering the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TotalConsumption = (props) => {
  console.log(props.data.totalConsumption)
  // const [data, setData] = useState([]);
  // const [categories, setCategories] = useState([]);

  const [chartData, setChartData] = useState({});
  const { presentDate, toDate } = useStateContext();
  useEffect(() => {
    if (props.data && props.data.totalConsumption) {
      const inflows = [];
      const consumptions = [];
      const dates = [];
      
      props.data.totalConsumption.forEach((entry) => {
        inflows.push(entry.inflow);
        consumptions.push(entry.consumption);
        dates.push(format(new Date(entry.date), 'MM/dd'));
      });

      setChartData({
        labels: dates,
        datasets: [
          {
            label: 'Total Inflow',
            data: inflows,
            backgroundColor: 'orange',
            stack: 'Stack 0',
          },
          {
            label: 'Total Consumption',
            data: consumptions,
            backgroundColor: '#4cc9f0',
            stack: 'Stack 1',
          }
        ]
      });
    }
  }, [props, presentDate, toDate]);

   // Check if datasets is defined before using flatMap
   const maxDataValue = (chartData.datasets || []).flatMap((d) => d.data || []).reduce((max, val) => Math.max(max, val), 0);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => Math.round(tooltipItem.raw),
        }
      }
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          stepSize: (props.data && props.data.totalConsumption && props.data.totalConsumption.length > 0)
            ? Math.ceil(maxDataValue / 6) 
            : 1,
          callback: (value) => Math.round(value),
        },
      }
    }
  };

  // useEffect(() => {

  //   if (props.data && props.data.totalConsumption) {
  //     let inflows = [];
  //     let dates = [];
  //     props.data.totalConsumption.forEach((entry) => {
  //       inflows.push(entry.inflow);
  //       dates.push(format(new Date(entry.date), 'MM/dd'));
  //     });
  //     setData([
  //       {
  //         name: 'Total Inflow',
  //         data: inflows
  //       }
  //     ]);
  //     setCategories(dates);
  //   }



  // }, [props, presentDate, toDate]);

  // const options = {
  //   colors: ['#2196F3', '#80CAEE'],
  //   chart: {
  //     fontFamily: 'inter',
  //     type: 'bar',
  //     height: 500,
  //     stacked: true,
  //     toolbar: {
  //       show: false
  //     },
  //     zoom: {
  //       enabled: false
  //     }
  //   },
  //   responsive: [
  //     {
  //       breakpoint: 1536,
  //       options: {
  //         plotOptions: {
  //           bar: {
  //             borderRadius: 0,
  //             columnWidth: 10
  //           }
  //         }
  //       }
  //     }
  //   ],
  //   plotOptions: {
  //     bar: {
  //       horizontal: false,
  //       borderRadius: 0,
  //       columnWidth: 40,
  //       borderRadiusApplication: 'end',
  //       borderRadiusWhenStacked: 'last'
  //     }
  //   },
  //   dataLabels: {
  //     enabled: false
  //   },
  //   xaxis: {
  //     categories: categories,
  //   },
  //   legend: {
  //     position: 'bottom',
  //     horizontalAlign: 'center',
  //     fontFamily: 'inter',
  //     fontWeight: 600,
  //     fontSize: '14px',
  //     showForSingleSeries: true,
  //     markers: {
  //       radius: 0
  //     }
  //   },
  //   fill: {
  //     opacity: 1
  //   }
  // };

  return (
    <div className="col-span-12 rounded-sm bg-white px-1 shadow-default sm:px-2 xl:col-span-6">
      <Row>
        {/* <Col md={8} sm={8} xs={8}>
          <div className="alerttext">
            <span>
              <Image src={info} alt="info" />
            </span>
          </div>
        </Col> */}
      </Row>
      {/* <ReactApexChart options={options} series={data} type="bar" width="100%" height={250} /> */}
      {Array.isArray(chartData.labels) && chartData.labels.length > 0 ? (
        <Bar data={chartData} options={options} height={250} />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default TotalConsumption;

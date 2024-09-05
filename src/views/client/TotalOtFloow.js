import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { format } from 'date-fns';
// import { Col, Image, Row } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
// import info from '../../assets/images/i_icons.svg';
// import { useStateContext } from '../../../contexts/MainContext';
import { useStateContext } from '../../contexts/MainContext';
import Spinner from 'react-bootstrap/Spinner';
// import { Bar } from 'react-chartjs-2';
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

const TotalOtFloow = (props) => {
  console.log("TotalOtFloow",props)
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [chartData, setChartData] = useState({});
  const { presentDate, toDate } = useStateContext();

  // useEffect(() => {
  //   if (props.data && props.data.totalConsumption) {
  //     const inflows = [];
  //     const consumptions = [];
  //     const dates = [];

  //     props.data.totalConsumption.forEach((entry) => {
  //       inflows.push(entry.inflow);
  //       consumptions.push(entry.consumption);
  //       dates.push(format(new Date(entry.date), 'MM/dd'));
  //     });

  //     setChartData({
  //       labels: dates,
  //       datasets: [
  //         {
  //           label: 'Total Inflow',
  //           data: inflows,
  //           backgroundColor: 'orange',
  //           stack: 'Stack 0',
  //         },
  //         {
  //           label: 'Total Consumption',
  //           data: consumptions,
  //           backgroundColor: '#4cc9f0',
  //           stack: 'Stack 1',
  //         }
  //       ]
  //     });
  //   }
  // }, [props, presentDate, toDate]);

  // Check if datasets is defined before using flatMap
  // const maxDataValue = (chartData.datasets || []).flatMap((d) => d.data || []).reduce((max, val) => Math.max(max, val), 0);

  const maxRange = props.data?.maxValue || 100;

  
  useEffect(() => {

    if (props.data && props.data.totalConsumption) {
      let inflows = [];
      let consumptions = [];
      let dates = [];
      props.data.totalConsumption.forEach((entry) => {
        inflows.push(entry.inflow);
        consumptions.push(entry.consumption)
        dates.push(format(new Date(entry.date), 'MM/dd'));
      });
      console.log(props)
      console.log(inflows)
      console.log(consumptions)
      setData([
        {
          name: 'Inflow',
          data: inflows
        },
        {
          name: 'Consumption',
          data: consumptions
        }
      ]);
      setCategories(dates);
      setLoading(false);
    }



  }, [props.data, presentDate, toDate]);

  const options = {
    colors: ['#ffa400', '#4cc9f0'],
    chart: {
      fontFamily: 'inter',
      type: 'bar',
      height: 500,
      stacked: false,
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
              columnWidth: 10
            }
          }
        }
      }
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 0,
        columnWidth: '70%',
        // columnWidth: 40,
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last'
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: categories,
    },
    // yaxis: {
    //   tickAmount: 4,  // Limit the Y-axis to 5 intervals
    //   labels: {
    //     formatter: (value) => Math.round(value)
    //   }
    // },
    yaxis: {
      min: 0,
      max: maxRange,
      tickAmount: 5, // This creates intervals like 0, 20, 40, 60, 80, 100
      labels: {
        formatter: (value) => Math.round(value)
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
      </Row>
      {loading ? ( // Display spinner if loading is true
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <ReactApexChart options={options} series={data} type="bar" width="100%" height={250} />
      )
      }
    </div>
  );
}

export default TotalOtFloow
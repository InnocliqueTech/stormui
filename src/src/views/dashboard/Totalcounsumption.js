import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { format } from 'date-fns';
// import { Col, Image, Row } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
// import info from '../../assets/images/i_icons.svg';
import { useStateContext } from '../../../contexts/MainContext';

const TotalConsumption = (props) => {
  console.log(props)
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const { presentDate, toDate } = useStateContext();

  useEffect(() => {

    if (props.data && props.data.totalConsumption) {
      let inflows = [];
      let dates = [];
      props.data.totalConsumption.forEach((entry) => {
        inflows.push(entry.inflow);
        dates.push(format(new Date(entry.date), 'MM/dd'));
      });
      setData([
        {
          name: 'Total Inflow',
          data: inflows
        }
      ]);
      setCategories(dates);
    }



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
        columnWidth: 40,
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
        {/* <Col md={8} sm={8} xs={8}>
          <div className="alerttext">
            <span>
              <Image src={info} alt="info" />
            </span>
          </div>
        </Col> */}
      </Row>
      <ReactApexChart options={options} series={data} type="bar" width="100%" height={250} />
    </div>
  );
};

export default TotalConsumption;

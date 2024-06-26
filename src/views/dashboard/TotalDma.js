import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import water from '../../assets/images/water-loss.svg';
import { Col, Image, Row } from 'react-bootstrap';

const options = {
  chart: {
    fontFamily: 'Inter',
    type: 'donut'
  },
  colors: ['#2196F3', '#01A9D8', '#1DD0BB'],
  legend: {
    position: 'bottom',
    horizontalAlign: 'center',
    fontFamily: 'inter',
    fontWeight: 600,
    fontSize: '14px',
    markers: {
      radius: 0
    }
  },
  fill: {
    opacity: 1
  },
  labels: ['Active 88%', 'Inactive 88%', 'Faulty 88%'],
  plotOptions: {
    pie: {
      donut: {
        size: '60%',
        background: 'transparent',
        labels: {
          show: true,
          total: {
            show: true,
            label: "Total DMA's",
            fontSize: '12px',
            color: "#495057",
            fontWeight: 400
          },
          name: {
            show: true,
            fontSize: '12px',
            color: "#495057",
            fontWeight: 400
          },
          value: {
            show: true,
            fontSize: '24px',
            fontWeight: 700,
            color: "#000"
          }
        }
      }
    },
  },
  dataLabels: {
    enabled: false
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: "100%"
        }
      }
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 280
        },
      },
    }
  ]
};

const TotalDma = (props) => {
  const [data, setData] = useState([]);
  const [opt, setOpt] = useState(options);

  useEffect(() => {
    if (props && props.data) {
      setData([
        parseInt(props.data.activeDma), 
        parseInt(props.data.inactiveDma), 
        parseInt(props.data.faultyDma)
      ]);
      setOpt({
        ...options,
        labels: [
          `Active ${((props.data.activeDma / props.data.totalCount) * 100).toFixed(0)}%`, 
          `Inactive ${((props.data.inactiveDma / props.data.totalCount) * 100).toFixed(0)}%`, 
          `Faulty ${((props.data.faultyDma / props.data.totalCount) * 100).toFixed(0)}%`
        ]
      });
    }
  }, [props]);

  return (
    <div className="col-span-12 rounded-sm bg-white px-1 pb-2 pt-7.5 shadow-default sm:px-2 xl:col-span-5">
      <Row>
        <Col md={1} sm={1} xs={1} className='iconContainer'>
          <Image src={water} alt="water" className='icon' />
        </Col>
        <Col md={8} sm={8} xs={8}>
          <div className="cardhead">Total DMA</div>
        </Col>
      </Row>
      <ReactApexChart options={opt} series={data} type="donut" height={255} />
    </div>
  );
};

export default TotalDma;

import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import water from '../../assets/images/water_drops.svg';
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
  labels: ['Zone 1(88%)', 'Zone 2(28%)', 'Zone 3(24%)'],
  plotOptions: {
    pie: {
      donut: {
        size: 60,
        background: 'transparent',
        labels: {
          show: true,
          total: {
            show: true,
            label: "Zone-wise Supply",
            fontSize: 12,
            color: "#495057",
            fontWeight: 400
          },
          name: {
            show: true,
            fontSize: 12,
            color: "#495057",
            fontWeight: 400
          },
          value: {
            show: true,
            fontSize: 24,
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

const ClientZone = (props) => {
  console.log(props.data)
  const [data, setData] = useState([]);
  const [opt, setOpt] = useState(options);
  useEffect(()=>{
    if(props && props.data) {
      setData([parseInt(props.data.activeCount), parseInt(props.data.InactiveZone), parseInt(props.data.faultyZone), ])
      setOpt({
        ...options,
        labels: [`Active ${((props.data.activeCount/props.data.totalCount) * 100).toFixed(0)}%`, `Inactive ${((props.data.InactiveZone/props.data.totalCount) * 100).toFixed(0)}%`, `Faculty ${((props.data.faultyZone/props.data.totalCount) * 100).toFixed(0)}%`]
      })
    }
  }, [props])
  return (
    <div className="col-span-12 rounded-sm bg-white px-1 pb-2 pt-7.5 shadow-default sm:px-2 xl:col-span-5">
      <Row>
        <Col md={1} sm={1} xs={1} className='iconContainergreen'>
          <Image src={water} alt="water" className='icon' />
        </Col>
        <Col md={9} sm={8} xs={8} style={{marginBottom:"40px"}}>
          <div className="cardhead">Zone-wise Supply</div>
        </Col>
      </Row>
      <ReactApexChart options={opt} series={data} type="donut" height={260} />
      {/* <div className="row">
        <div className="col-md-1">
         <div style={{backgroundColor:'#3C50E0', height:15, width:15}}></div>
        </div>
        <div className="col-md-5">
         Active 80%
        </div>
        <div className="col-md-1">
         <div style={{backgroundColor:'#3C50E0', height:15, width:15}}></div>
        </div>
        <div className="col-md-5">
         Inactive 80%
        </div>
        <div className="col-md-1">
         <div style={{backgroundColor:'#3C50E0', height:15, width:15}}></div>
        </div>
        <div className="col-md-5">
         Faculty 80%
        </div>
      </div> */}
    </div>
  );
};

export default ClientZone;

import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import over from '../../assets/images/symbols_water.svg';
import { Col, Image, Row } from 'react-bootstrap';
import info from '../../assets/images/i_icons.svg';

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
    categories: ['Dma-1', 'Dma-2', '', 'Thu', 'Fri', 'Sat', 'Sun']
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

const DMAFlowChart = (props) => {
  const [data, setData] = useState([])

  useEffect(()=>{
    console.log(props.data.totalOutFlow)
    if(props.data && props.data.totalOutFlow) {
      let d = [];
      props.data.totalOutFlow.forEach((flow) => {
        d.push(flow.count)
      });
      setData([{
        name: "In flow",
        data: d
      }, {
        name: "Outflow",
        data: d
      }]);
    }
  }, [props])

  //   const handleReset = () => {
  //     setState(prevState => ({
  //       ...prevState
  //     }))
  //   }
  //   handleReset

  return (
    <div className="col-span-12 rounded-sm bg-white px-1 shadow-default sm:px-2 xl:col-span-6">
      <Row>
        <Col md={1} sm={1} xs={1} className='iconContainer' style={{ backgroundColor: '#F6C574' }}>
          <Image src={over} alt="over" className='icon' />
        </Col>
        <Col md={8} sm={8} xs={8}>
          <div className="alerttext">
          DMA Flow Chart{' '}
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

export default DMAFlowChart;

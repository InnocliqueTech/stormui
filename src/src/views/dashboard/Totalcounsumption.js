import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
// import over from '../../assets/images/symbols_water.svg';
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
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
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

const Totalcounsumption = (props) => {
  const [data, setData] = useState([])

  useEffect(()=>{
    console.log(props.data.totalOutFlow)
    if(props.data && props.data.totalOutFlow) {
      let d = [];
      props.data.totalOutFlow.forEach((flow) => {
        d.push(flow.count)
      });
      setData([{
        name: "In Flow",
        data: d
      }, {
        name: "Out Flow",
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
       
        <Col md={8} sm={8} xs={8}>
          <div className="alerttext">
            {/* Total Out flow{' '} */}
            <span>
              <Image src={info} alt="gateway" />
            </span>{' '}
          </div>
        </Col>
      </Row>
      <ReactApexChart options={options} series={data} type="bar" width="100%" height={250} />
{/* 
       <div style={{ marginTop: '20px' }}>
        <span style={{ display: 'inline-block', width: '20px', height: '10px', backgroundColor: '#2196F3', marginRight: '10px' }}></span>
        <span>Total Outflow</span>
        <span style={{ display: 'inline-block', width: '20px', height: '10px', backgroundColor: '#80CAEE', marginLeft: '20px', marginRight: '10px' }}></span>
        <span>Total Inflow</span>
      </div> */}
    </div>
  );
};

export default Totalcounsumption;

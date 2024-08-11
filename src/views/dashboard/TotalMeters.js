import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import meter from '../../assets/images/ion_water.svg';
import { Col, Image, Row } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';


const options = {
  chart: {
    fontFamily: 'inter',
    type: 'donut'
  },
  colors: ['#4cc9f0', '#caf0f8', '#90e0ef'],
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

  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        background: 'transparent',
        labels: {
          show: true,
          total: {
            show: true,
            label: "Total Meters",
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
    }
  },
  labels: ['Active', 'Inactive', 'Faulty'],
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
        }
      }
    }
  ]
};

const TotalMeters = (props) => {
  const [data, setData] = useState([]);
  const [opt, setOpt] = useState(options);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (props && props.data) {
      setData([
        parseInt(props.data.activeMeters), 
        parseInt(props.data.inactiveMeters), 
        parseInt(props.data.faultyMeters)
      ]);
      setOpt({
        ...options,
        labels: [
          `Active(${props.data.activeMeters})`, 
          `Inactive(${props.data.inactiveMeters})`, 
          `Faulty(${props.data.faultyMeters})`
        ]
      });
      setLoading(false);
    }
  }, [props]);

  return (
    <div className="col-span-12 rounded-sm bg-white px-1 pb-2 pt-7.5 shadow-default sm:px-2 xl:col-span-5">
      <Row style={{padding:"0px 0px 0px 18px"}}>
        <div className='iconContainer'>
          <Image src={meter} alt="meter" className='icon' style={{ divor: '#95ACFF' }} />
        </div>
        <Col md={8} sm={8} xs={8}>
          <div className="cardhead">Total Meters</div>
        </Col>
      </Row>
      {loading ? ( // Display spinner if loading is true
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
      <ReactApexChart options={opt} series={data} type="donut" height={255} />
      )
    }
    </div>
  );
};

export default TotalMeters;

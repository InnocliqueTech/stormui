import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import water from '../../assets/images/water.svg';
import { Col, Image, Row } from 'react-bootstrap';

// const options = {
//   chart: {
//     fontFamily: 'Inter',
//     type: 'donut'
//   },
//   colors: ['#2196F3', '#01A9D8', '#1DD0BB'],
//   legend: {
//     position: 'bottom',
//     horizontalAlign: 'center',
//     fontFamily: 'inter',
//     fontWeight: 600,
//     fontSize: '14px',

//     markers: {
//       radius: 0
//     }
//   },
//   fill: {
//     opacity: 1
//   },
//   labels: ['DMA 1', 'DMA 2', 'DMA 3'],
//   plotOptions: {
//     pie: {
//       donut: {
//         size: 60,
//         background: 'transparent',
//         labels: {
//           show: true,
//           total: {
//             show: true,
//             label: "DMA's",
//             fontSize: 12,
//             color: "#495057",
//             fontWeight: 400
//           },
//           name: {
//             show: true,
//             fontSize: 12,
//             color: "#495057",
//             fontWeight: 400
//           },
//           value: {
//             show: true,
//             fontSize: 24,
//             fontWeight: 700,
//             color: "#000"
//           }
//         }
//       }
//     },
//   },

//   dataLabels: {
//     enabled: false
//   },
//   responsive: [
//     {
//       breakpoint: 2600,
//       options: {
//         chart: {
//           width: "100%"
//         }
//       }
//     },
//     {
//       breakpoint: 640,
//       options: {
//         chart: {
//           width: 280
//         },
//       },

//     }
//   ]
// };

const ClientDma = (props) => {
  console.log(props)
  const [data, setData] = useState([]);
 

  const [opt, setOpt] = useState({
    chart: {
      fontFamily: 'Inter',
      type: 'donut',
    },
    colors: ['#2196F3', '#01A9D8', '#1DD0BB'],
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      fontFamily: 'inter',
      fontWeight: 600,
      fontSize: '14px',
      markers: {
        radius: 0,
      },
    },
    fill: {
      opacity: 1,
    },
    labels: [],
    plotOptions: {
      pie: {
        donut: {
          size: 60,
          background: 'transparent',
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total Consumption",
              fontSize: 12,
              color: "#495057",
              fontWeight: 600,
              formatter: function () {
                return props.dmaData && props.dmaData.totalConsumption ? props.dmaData.totalConsumption : 0;
              },
            },
            name: {
              show: true,
              fontSize: 12,
              color: "#495057",
              fontWeight: 400,
            },
            value: {
              show: true,
              fontSize: 24,
              fontWeight: 700,
              color: "#000",
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: "100%",
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 280,
          },
        },
      },
    ],
  });
  useEffect(() => {
    if (props && props.dmaData && Array.isArray(props.dmaData.dmaWiseConsumption)) {
      const consumptionData = props.dmaData.dmaWiseConsumption.map((dma) => dma.consumption);
      const labels = props.dmaData.dmaWiseConsumption.map((dma) => `DMA ${dma.dmaId} (${dma.consumption}%)`);
      console.log(consumptionData)
      console.log(labels)
      setData(consumptionData);
      setOpt((prevOpt) => ({
        ...prevOpt,
        labels: labels,
      }));
    }
  }, [props.dmaData]);

  console.log(opt);
  return (
    <div className="col-span-12 rounded-sm bg-white px-1 pb-2 pt-7.5 shadow-default sm:px-2 xl:col-span-5">
      <Row style={{padding : "10px 0px 0px 18px"}}>
        <Col md={1} sm={1} xs={1} className='iconContainer'>
          <Image src={water} alt="water" className='icon' />
        </Col>
        <Col md={9} sm={8} xs={8} style={{ marginBottom: "40px" }}>
          <div className="cardhead">DMA-wise Supply</div>
        </Col>
      </Row>
      <ReactApexChart options={opt} series={data} type="donut" height={270} />
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

export default ClientDma;

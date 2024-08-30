
import React, { useContext, useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import over from '../../assets/images/symbols_water.svg';
import { Col, Image, Row } from 'react-bootstrap';
import info from '../../assets/images/i_icons.svg';
import axios from 'axios';
import { ClientsContext } from './context';
import { useStateContext } from '../../contexts/MainContext';
import Spinner from 'react-bootstrap/Spinner';





const DMAFlowChart = (props) => {
  const [data, setData] = useState([])
  const {  selectedClient,  selectedZone } = useContext(ClientsContext);
  // const { clients, zones } = useContext(ClientsContext);
  // const { zoneId } = useStateContext
  const { presentDate, toDate } = useStateContext();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);


  const minRange = props.data.minRange 
  const maxRange = props.data.maxRange
  console.log('min', minRange)
  console.log('max', maxRange)
 
 
  const options = {
    colors: ['#4cc9f0', '#caf0f8'],
  
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
              columnWidth: 20 // Adjust this value to increase space between bars
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
    yaxis: {
      tickAmount: 4,  // Four intervals between five values
      min: minRange,
      max: maxRange,
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


  // useEffect(() => {
  //   if (props.data && props.data.totalDmaOutFlow) {
  //     let totalFlowData = [];
  //     let totalOutFlowData = [];
  //     let dmaNames = [];
      
  //     props.data.totalDmaOutFlow.forEach((flow) => {
  //       dmaNames.push(flow.displayName);
  //       totalFlowData.push(flow.totalFlow);
  //       totalOutFlowData.push(flow.totalOutFlow);
  //     });

  //     setData([
  //       {
  //         name: "Total Flow",
  //         data: totalFlowData
  //       },
  //       {
  //         name: "Total OutFlow",
  //         data: totalOutFlowData
  //       }
  //     ]);
  //     setCategories(dmaNames);
  //     setLoading(false);
  //   }
  // }, [props.data]);


  useEffect(() => {
    if (props.data && props.data.totalDmaOutFlow) {
      let totalFlowData = [];
      let totalOutFlowData = [];
      let dmaNames = [];
  
      if (props.data.totalDmaOutFlow.length === 0) {
        // If totalDmaOutFlow is empty, set default DMA names
        dmaNames = ["DMA-1", "DMA-2", "DMA-3", "DMA-4", "DMA-5"];
        // Optionally, set default values for totalFlowData and totalOutFlowData
        totalFlowData = [0, 0, 0, 0, 0];
        totalOutFlowData = [0, 0, 0, 0, 0];
      } else {
        props.data.totalDmaOutFlow.forEach((flow) => {
          dmaNames.push(flow.displayName);
          totalFlowData.push(flow.totalFlow);
          totalOutFlowData.push(flow.totalOutFlow);
        });
      }
  
      setData([
        {
          name: "Total Flow",
          data: totalFlowData
        },
        {
          name: "Total OutFlow",
          data: totalOutFlowData
        }
      ]);
      setCategories(dmaNames);
      setLoading(false);
    }
  }, [props.data]);
  



  // useEffect(() => {
  //   getDmaOutFlow();
  // }, [clients, presentDate, toDate, zones]);

  // const getDmaOutFlow = async () => {
  //   try {
  //     const requestbody = {
  //       clientId: clients[0]?.clientId,
  //       zoneId: 0,
  //       fromDate: presentDate,
  //       toDate: toDate
  //     }
  //     const response = await axios.post('http://49.207.11.223:3307/dma/getDMAOutFlowInGateWayDashBoard', requestbody)
  //     console.log('getDmaOutFlowresponse', response)
  //     console.log('requestbody', requestbody)

  //     if(response.data && response.data.totalDmaOutFlow) {
  //       let totalFlowData = [];
  //       let totalOutFlowData = [];
  //       let dmaNames = [];
  //       response.data.totalDmaOutFlow.forEach((flow) => {
  //         dmaNames.push(flow.displayName)
  //         totalFlowData.push(flow.totalFlow);
  //         totalOutFlowData.push(flow.totalOutFlow);
  //       });
  //       setData([
  //         {
  //           name: "Total Flow",
  //           data: totalFlowData
  //         },
  //         {
  //           name: "Total OutFlow",
  //           data: totalOutFlowData
  //         }
  //       ]);
  //       setCategories(dmaNames)
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }

  // }
  useEffect(() => {
    if (selectedClient && presentDate && toDate) {
      getDmaOutFlow();
    }
  }, [selectedClient, presentDate, toDate, selectedZone]);

  const getDmaOutFlow = async () => {
    try {
      const requestbody = {
        clientId: selectedClient,
        zoneId: selectedZone || 0, // If selectedZone is not available, default to 0
        fromDate: presentDate,
        toDate: toDate
      };
      const response = await axios.post('http://49.207.11.223:3307/dma/getDMAOutFlowInGateWayDashBoard', requestbody);
      console.log('getDmaOutFlowresponse', response);
      console.log('requestbody', requestbody);

      if (response.data && response.data.totalDmaOutFlow) {
        let totalFlowData = [];
        let totalOutFlowData = [];
        let dmaNames = [];
        response.data.totalDmaOutFlow.forEach((flow) => {
          dmaNames.push(flow.displayName);
          totalFlowData.push(flow.totalFlow);
          totalOutFlowData.push(flow.totalOutFlow);
        });
        setData([
          {
            name: "Total Flow",
            data: totalFlowData
          },
          {
            name: "Total OutFlow",
            data: totalOutFlowData
          }
        ]);
        setCategories(dmaNames);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
console.log('categories', categories)

  return (
    <div className="col-span-12 rounded-sm bg-white px-1 shadow-default sm:px-2 xl:col-span-6">
      <Row style={{padding:"10px 0px 0px 18px"}}>
        <Col md={1} sm={1} xs={1} className='iconContainer' style={{ backgroundColor: '#F6C574' }}>
          <Image src={over} alt="over" className='icon' />
        </Col>
        <Col md={8} sm={8} xs={8}>
          <div className="alerttext">
            DMA Outflow {' '}
            <span>
              <Image src={info} alt="gateway" />
            </span>{' '}
          </div>
        </Col>
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
};

export default DMAFlowChart;


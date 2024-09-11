import React, { useEffect, useState, useContext } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import over from '../../assets/images/symbols_water.svg';
import { Col, Image, Row, Button } from 'react-bootstrap';
import info from '../../assets/images/i_icons.svg';
import { useStateContext } from '../../contexts/MainContext';
import { ClientsContext } from '../dashboard/context/index';
import Spinner from 'react-bootstrap/Spinner';



const Overflowks = (props) => {
  console.log(props)
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const { presentDate, toDate } = useStateContext();
  const { selectedZone, selectedClient } = useContext(ClientsContext);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('zone');
  const [outFlowData, setOutFlowData] = useState(null);
  const [dmacategories, setDmaCategories] = useState([]);
  const [dmaData, setDmaData] = useState([])



  const minRange = outFlowData?.minRange || 0
  const maxRange = outFlowData?.maxRange || 100
  console.log(minRange, maxRange)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://49.207.11.223:3307/dashboard/getTotalOutflowInDashboard', {
          clientId: 1,
          zoneId: selectedZone || 0,
          fromDate: presentDate,
          toDate: toDate
        });

        if (response.data && response.data.totalOutFlow) {
          console.log(response)
          let counts = [];
          let dates = [];
          response.data.totalOutFlow.forEach((flow) => {
            counts.push(flow.count);
            dates.push(flow.date);
          });
          setData([
            {
              name: 'Out  Flow Trend',
              data: counts
            }
          ]);
          setCategories(dates);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
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
              columnWidth: 20 // Adjust column width here for better spacing
            }
          }
        }
      }
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 0,
        columnWidth: '50%', // Adjust column width here for better spacing
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last'
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: categories,
      tickPlacement: 'on',
      labels: {
        show: true,
        rotate: -45,
        rotateAlways: true,
        hideOverlappingLabels: true,
        showDuplicates: false,
        trim: true,
        maxHeight: 120,
        style: {
          fontSize: '12px',
          fontWeight: 400
        }
      },
      title: {
        offsetY: -10,
        style: {
          fontSize: '14px',
          fontWeight: 600
        }
      },
      scrollbar: {
        enabled: true, // Enable the scrollbar
        height: 20,
        borderRadius: 2,
        barBackgroundColor: '#90CAF9',
        barHeight: 2,
        barBorderRadius: 2,
        barBorderColor: '#2196F3'
      }
    },
    yaxis: {
      tickAmount: 4, // Limit to 5 values
      labels: {
        formatter: function (val) {
          return Math.round(val); // Optional: format values as integers
        }
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
  useEffect(() => {
    if (selectedClient) {
      getDashboardData();
    }
  }, [selectedClient, selectedZone, presentDate, toDate]);

  const getDashboardData = async () => {
    try {
      const flowData = await axios.post('http://49.207.11.223:3307/dma/getDMAOutFlowInGateWayDashBoard', {
        clientId: selectedClient,
        zoneId: selectedZone,
        fromDate: presentDate,
        toDate: toDate
      });

      if (flowData && flowData.data) {
        setOutFlowData(flowData.data); // Store the entire data object in state

        console.log(outFlowData)

        let totalFlowData = [];
        let totalOutFlowData = [];
        let dmaNames = [];

        if (flowData.data.totalDmaOutFlow.length === 0) {
          dmaNames = ["DMA-1", "DMA-2", "DMA-3", "DMA-4", "DMA-5"];
          totalFlowData = [0, 0, 0, 0, 0];
          totalOutFlowData = [0, 0, 0, 0, 0];
        } else {
          flowData.data.totalDmaOutFlow.forEach((flow) => {
            dmaNames.push(flow.displayName);
            totalFlowData.push(flow.totalFlow);
            totalOutFlowData.push(flow.totalOutFlow);
          });
        }

        setDmaData([
          {
            name: "Total Flow",
            data: totalFlowData
          },
          {
            name: "Total OutFlow",
            data: totalOutFlowData
          }
        ]);
        setDmaCategories(dmaNames);
        setLoading(false);
      }

    } catch (e) {
      console.log(e);
    }
  };



  const dmaoptions = {
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
      categories: dmacategories,
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

  return (
    <div className="col-span-12 rounded-sm bg-white px-1 shadow-default sm:px-2 xl:col-span-6 p-1">
      <Row style={{ padding: "0px 0px 0px 18px" }}>
        <Col md={1} sm={1} xs={1} className="iconContainer" style={{ backgroundColor: '#F6C574' }}>
          <Image src={over} alt="over" className="icon" />
        </Col>
        <Col md={8} sm={8} xs={8}>
          <div className="alerttext">
            {/* Out Flow Trend by Zone{' '} */}
            Out Flow Trend by
            <span>
              <Button onClick={() => setActiveView('zone')} style={{ color: activeView === 'zone' ? '#000' : '#aaa', fontSize:"18px", backgroundColor:"transparent", border:"none", padding:"2px 0px 0px 0px", fontWeight:"600" }}>
                Zone
              </Button>
            </span> /
            <span>
              <Button  onClick={() => setActiveView('dma')} style={{ color: activeView === 'dma' ? '#000' : '#aaa', fontSize:"18px", backgroundColor:"transparent", border:"none", padding:"2px 0px 0px 0px", fontWeight:"600" }}>
                Dma
              </Button>
            </span>
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
      ) : activeView === 'zone' ? (
        <ReactApexChart options={options} series={data} type="bar" width="100%" height={250} />
      ) : (

        <ReactApexChart options={dmaoptions} series={dmaData} type="bar" width="100%" height={250} />
      )
      }
    </div>
  );
};

export default Overflowks;

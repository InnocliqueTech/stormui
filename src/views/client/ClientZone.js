import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import water from '../../assets/images/water_drops.svg';
import { Col, Image, Row } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';



const ClientZone = (props) => {
  console.log(props.data)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalConsumption, setTotalConsumption] = useState(0);


  const [opt, setOpt] = useState({
    chart: {
      fontFamily: 'Inter',
      type: 'donut',
    },
    colors: ['#4cc9f0', '#90e0ef', '#caf0f8'],
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
              label: "Total Supply",
              fontSize: 12,
              color: "#495057",
              fontWeight: 600,
              formatter: function () {
                return totalConsumption.toString(); // Use the state here
              },
              // formatter: function () {
              //   const total = props.data && props.data.totalConsumption ? props.data.totalConsumption : 0;
              //   console.log("Formatter Total:", total);
              //   return total;
              // },

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
  // useEffect(() => {
  //   if (props && props.data && Array.isArray(props.data.zoneWiseConsumption)) {
  //     const consumptionData = props.data.zoneWiseConsumption.map((zone) => zone.consumption);
  //     const labels = props.data.zoneWiseConsumption.map((zone) => `Zone ${zone.zoneId} (${zone.consumption})`);
  //     console.log('consumptionDatazone',consumptionData)
  //     setData(consumptionData);
  //     setOpt((prevOpt) => ({
  //       ...prevOpt,
  //       labels: labels,
  //     }));
  //     setLoading(false);
  //   }
  // }, [props.data]);

  useEffect(() => {
    if (props && props.data) {
      setTotalConsumption(props.data.totalConsumption || 0); // Update the state with the value from props
    }
  }, [props.data]);


  useEffect(() => {
    if (props && props.data && Array.isArray(props.data.zoneWiseConsumption)) {
      const consumptionData = props.data.zoneWiseConsumption.map((zone) => zone.consumption);
      const labels = props.data.zoneWiseConsumption.map((zone) => `Zone ${zone.zoneId} (${zone.consumption})`);

      const totalConsumption = props.data.totalConsumption || 0; // Get the totalConsumption value

      console.log("Total Consumption from props:", totalConsumption); // Log the totalConsumption value

      setData(consumptionData);
      setOpt((prevOpt) => ({
        ...prevOpt,
        labels: labels,
        plotOptions: {
          ...prevOpt.plotOptions,
          pie: {
            donut: {
              ...prevOpt.plotOptions.pie.donut,
              labels: {
                ...prevOpt.plotOptions.pie.donut.labels,
                total: {
                  ...prevOpt.plotOptions.pie.donut.labels.total,
                  formatter: function () {
                    return totalConsumption.toString(); // Ensure this is the correct value
                  },
                },
              },
            },
          },
        },
      }));
      setLoading(false);
    }
  }, [props.data]);

  console.log('Total Consumption:', totalConsumption);
  console.log('Updated Chart Options:', opt);
  console.log('Chart Data:', data);
  return (
    <div className="col-span-12 rounded-sm bg-white px-1 pb-2 pt-7.5 shadow-default sm:px-2 xl:col-span-5">
      <Row style={{ padding: "0px 0px 0px 18px" }}>
        <Col md={1} sm={1} xs={1} className='iconContainergreen'>
          <Image src={water} alt="water" className='icon' />
        </Col>
        <Col md={9} sm={8} xs={8} style={{ marginBottom: "40px" }}>
          <div className="cardhead">Zone Wise Supply</div>
        </Col>
      </Row>
      {loading ? ( // Display spinner if loading is true
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Spinner animation="border" variant="primary" />
        </div>
      ) :  data && data.length > 0 ? (
        <ReactApexChart options={opt} series={data} type="donut" height={255} />
      ) : (
        <div style={{ textAlign: 'center', marginTop: '50px', color: '#999' }}>
          <h5>No data found</h5>
        </div>
      )
      }
    </div>
  );
};

export default ClientZone;

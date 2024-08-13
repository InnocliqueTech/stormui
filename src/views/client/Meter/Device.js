import { Card, Col, Row, Table } from 'react-bootstrap';
import dayjs from 'dayjs';


function Device({ devicedt }) {
  const formatDate = (dateString) => {
    return dayjs(dateString).format('YYYY/MM/DD');
  };

  console.log(devicedt)
  console.log(devicedt.deviceDetails)


  return (
    <>
    

      <Card style={{ margin: 0, padding: '16px', borderRadius: 8, marginBottom: 24 }}>
        <div style={{ fontFamily: 'inter', fontWeight: 600, fontSize: '18px', color: '#212121', marginBottom: 16 }}>Last Frame Data</div>
        <Row>
          <Col md={6} xs={12} sm={12}>
            <Row>
              <Col md={6} xs={6} sm={6}>
                <div className='meterdetails-list'>Gateway ID:</div>
                {/* <div className='meterdetails-list'>SNR(dB):</div> */}
                <div className='meterdetails-list'>Freq(MHz):</div>
                <div className='meterdetails-list'>Status:</div>
              </Col>
              {devicedt && devicedt.deviceDetails && devicedt.deviceDetails.latestFrameData ? (
                <Col md={6} xs={6} sm={6}>
                  <div className='meterdetails-list1'>{devicedt.deviceDetails.latestFrameData.gatewayId || '-'}</div>
                  {/* <div className='meterdetails-list1'> {devicedt.deviceDetails.latestFrameData.snr || '-'}</div> */}
                  <div className='meterdetails-list1'>{devicedt.deviceDetails.latestFrameData.freq || '-'}</div>
                  <div className='meterdetails-list1'>{devicedt.deviceDetails.latestFrameData.status || '-'}</div>
                </Col>
              ) : ''}
             
            </Row>
          </Col>
          <Col md={6} xs={12} sm={12}>
            <Row>
              <Col md={6} xs={6} sm={6}>
                <div className='meterdetails-list'>Reading:</div>
                <div className='meterdetails-list'>RSSI(dBm):</div>
                <div className='meterdetails-list'>Latest communication</div>
              </Col>
              {devicedt && devicedt.deviceDetails &&devicedt.deviceDetails.latestFrameData?
                <Col md={6} xs={6} sm={6}>
                  <div className='meterdetails-list1'>{devicedt.deviceDetails.latestFrameData.reading || '-'}</div>
                  <div className='meterdetails-list1'>{devicedt.deviceDetails.latestFrameData.rssi || '-'}</div>
                  <div className='meterdetails-list1'>{formatDate(devicedt.deviceDetails.latestFrameData.latestCommunication) || '-'}</div>

                </Col>
                :
                <Col md={6} xs={6} sm={6}></Col>
              }
            </Row>
          </Col>
        </Row>
       
      </Card>
      <Card style={{ margin: 0, padding: '16px', borderRadius: 8, marginBottom: 24 }}>
        <div style={{ fontFamily: 'inter', fontWeight: 600, fontSize: '18px', color: '#212121' }}>Communication Gateways</div>
        <Table className="meter-gatewaytable" responsive style={{ marginTop: 10, borderRadius: 10, border: '1px solid #F4F5F5' }}>
          <thead style={{ backgroundColor: '#EFF8FF' }}>
            <tr>
              <th className='tablehead'>Gateway ID</th>
              <th className='tablehead'>RSSI (dBm)</th>
              <th className='tablehead'>SNR (dB)</th>
              <th className='tablehead'>Temperature</th>
            </tr>
          </thead>
          <tbody>

            {/* {devicedt && devicedt.deviceDetails && devicedt.deviceDetails.gatewayList ? devicedt.deviceDetails.gatewayList.map((data) => (
              <tr>
                <td className='tablecontent'>{data.gatewayId}</td>
                <td className='tablecontent'>{data.rssi}</td>
                <td className='tablecontent'>{data.snr}</td>
                <td className='tablecontent'>{data.temperature}</td>
              </tr>
            )) : <tr><td>No data found</td></tr>} */}
            {devicedt && devicedt.deviceDetails && devicedt.deviceDetails.gatewayList ? (
  devicedt.deviceDetails.gatewayList.map((data) => (
    <tr key={data.gatewayId}>
      <td className='tablecontent'>{data.gatewayId}</td>
      <td className='tablecontent'>{data.rssi}</td>
      <td className='tablecontent'>{data.snr}</td>
      <td className='tablecontent'>{data.temperature}</td>
    </tr>
  ))
) : (
  <tr><td>No data found</td></tr>
)}



          </tbody>
        </Table>
      </Card>
    </>
  );
}

export default Device;
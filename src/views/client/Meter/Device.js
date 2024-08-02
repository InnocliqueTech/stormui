import { Card, Col, Row, Table } from 'react-bootstrap';

function Device() {


  
    return (
        <>
        <Card style={{ margin: 0, padding: '16px', borderRadius: 8, marginBottom:24}}>
        <div style={{ fontFamily: 'inter', fontWeight: 600, fontSize: '18px', color: '#212121', marginBottom: 16 }}>Basic Details</div>
          <Row>
            <Col md={6} xs={12} sm={12}>
              <Row>
                <Col md={6} xs={6} sm={6}>
                  <div className='meterdetails-list'>Name:</div>
                  <div className='meterdetails-list'>Activation Type:</div>
                  <div className='meterdetails-list'>Support Class B:</div>
                  <div className='meterdetails-list'>Device Create Time:</div>
                  <div className='meterdetails-list'>Mac Version:</div>
                  <div className='meterdetails-list'>ADR:</div>
                </Col>
                <Col md={6} xs={6} sm={6}>
                  <div className='meterdetails-list1'>56456747 dcdc</div>
                  <div className='meterdetails-list1'>OTAA</div>
                  <div className='inter600red meterdetails-list1'>False</div>                  
                  <div className='meterdetails-list1'>2024-05-02 16:40:28.427</div>
                  <div className='inter400red meterdetails-list'>1.0.2</div>
                  <div className='inter400yellow meterdetails-list'>True</div>
                </Col>
              </Row>
            </Col>
            <Col md={6} xs={12} sm={12}>
              <Row>
                <Col md={6} xs={6} sm={6}>
                  <div className='meterdetails-list'>Region:</div>
                  <div className='meterdetails-list'>Subnet Type:</div>
                  <div className='meterdetails-list'>Support Class C:</div>
                  <div className='meterdetails-list'>Last Seen:</div>
                  <div className='meterdetails-list'>DR:</div>
                  <div className='meterdetails-list'>fPort:</div>
                </Col>
                <Col md={6} xs={6} sm={6}>
                  <div className='meterdetails-list1'>IN865</div>
                  <div className='meterdetails-list1'>CH_00_07 </div>
                  <div className='inter600red meterdetails-list1'>False</div>
                  <div className='meterdetails-list1'>2024-05-02 16:40:28.427</div>
                  <div className='meterdetails-list1'>DR 5</div>
                  <div className='meterdetails-list1'>25</div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>

        <Card style={{ margin: 0, padding: '16px', borderRadius: 8, marginBottom:24}}>
          <div style={{ fontFamily: 'inter', fontWeight: 600, fontSize: '18px', color: '#212121', marginBottom: 16 }}>Last Frame Data</div>
          <Row>
            <Col md={6} xs={12} sm={12}>
              <Row>
                <Col md={6} xs={6} sm={6}>
                  <div className='meterdetails-list'>Gateway ID:</div>
                  <div className='meterdetails-list'>SNR(dB):</div>
                  <div className='meterdetails-list'>Freq(MHz):</div>
                </Col>
                <Col md={6} xs={6} sm={6}>
                  <div className='meterdetails-list1'>F0-4C-D5-FF-FE-01-B1-A9</div>
                  <div className='meterdetails-list1'>2.0</div>
                  <div className='meterdetails-list1'>867</div>
                </Col>
              </Row>
            </Col>
            <Col md={6} xs={12} sm={12}>
              <Row>
                <Col md={6} xs={6} sm={6}>
                  <div className='meterdetails-list'>Gateway:</div>
                  <div className='meterdetails-list'>RSSI(dBm):</div>
                </Col>
                <Col md={6} xs={6} sm={6}>
                  <div className='meterdetails-list1'>GW07_KSCCL_01B1A9</div>
                  <div className='meterdetails-list1'>-79</div>
                </Col>
              </Row>
            </Col>
          </Row>
          <div style={{ fontFamily: 'inter', fontWeight: 600, fontSize: '18px', color:'#212121', marginTop:20 }}>Communication Gateway List</div>
          <Table className="meter-gatewaytable" responsive style={{ marginTop: 10, borderRadius: 10, border: '1px solid #F4F5F5' }}>
                <thead style={{ backgroundColor: '#EFF8FF' }}>
                    <tr>
                        <th className='tablehead'>Gateway ID</th>
                        <th className='tablehead'>RSSI (dBm)</th>
                        <th className='tablehead'>SNR (dB)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='tablecontent'>F0-4C-D5-FF-FE-01-B1-A9</td>
                        <td className='tablecontent'>-115</td>
                        <td className='tablecontent'>2</td>
                    </tr>

                    <tr>
                        <td className='tablecontent'>F0-4C-D5-FF-FE-01-B1-A9</td>
                        <td className='tablecontent'>-115</td>
                        <td className='tablecontent'>2</td>
                    </tr>
                </tbody>
            </Table>
        </Card>
        </>
    );
}

export default Device;
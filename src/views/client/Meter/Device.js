import { Card, Col, Row, Table } from 'react-bootstrap';

function Device() {
    return (
        <>
        <Card style={{ margin: 0, padding: 10, paddingTop: 10, borderRadius:10 }}>
        <div style={{ fontFamily: 'inter', fontWeight: 600, fontSize: '18px', color:'#212121' }}>Basic Details</div>
          <Row>
            <Col md={6} xs={12} sm={12}>
              <Row>
                <Col md={5} xs={6} sm={6}>
                  <div className='inter600'>Name:</div>
                  <div className='inter600'>Activation Type:</div>
                  <div className='inter600'>Support Class B:</div>
                  <div className='inter600 marginTop'>Device Create Time:</div>
                  <div className='inter600 marginTop'>Mac Version:</div>
                  <div className='inter600'>ADR:</div>
                </Col>
                <Col md={7} xs={6} sm={6}>
                  <div className='inter400black'>56456747</div>
                  <div className='inter400black'>OTAA</div>
                  <div className='inter400black'>False</div>                  
                  <div className='inter400black'>2024-05-02 16:40:28.427</div>
                  <div className='inter400red'>1.0.2</div>
                  <div className='inter400yellow'>True</div>
                </Col>
              </Row>
            </Col>
            <Col md={6} xs={12} sm={12}>
              <Row>
                <Col md={5} xs={6} sm={6}>
                  <div className='inter600'>Region:</div>
                  <div className='inter600'>Subnet Type:</div>
                  <div className='inter600 marginTop'>Support Class C:</div>
                  <div className='inter600 marginTop'>Last Seen:</div>
                  <div className='inter600'>DR:</div>
                  <div className='inter600'>fPort:</div>
                </Col>
                <Col md={7} xs={6} sm={6}>
                  <div className='inter400black'>IN865</div>
                  <div className='inter400black'>CH_00_07 </div>
                  <div className='inter600red'>False</div>
                  <div className='inter400black'>2024-05-02 16:40:28.427</div>
                  <div className='inter400black marginTop'>DR 5</div>
                  <div className='inter400black'>25</div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>

        <Card style={{ marginTop: 20, padding: 10, paddingTop: 10, borderRadius:10 }}>
          <div style={{ fontFamily: 'inter', fontWeight: 600, fontSize: '18px', color:'#212121' }}>Last Frame Data</div>
          <Row>
            <Col md={6} xs={12} sm={12}>
              <Row>
                <Col md={5} xs={6} sm={6}>
                  <div className='inter600'>Gateway ID:</div>
                  <div className='inter600'>SNR(dB):</div>
                  <div className='inter600'>Freq(MHz):</div>
                </Col>
                <Col md={7} xs={6} sm={6}>
                  <div className='inter400black'>F0-4C-D5-FF-FE-01-B1-A9</div>
                  <div className='inter400black'>2.0</div>
                  <div className='inter400black'>867</div>
                </Col>
              </Row>
            </Col>
            <Col md={6} xs={12} sm={12}>
              <Row>
                <Col md={5} xs={6} sm={6}>
                  <div className='inter600'>Gateway:</div>
                  <div className='inter600'>RSSI(dBm):</div>
                </Col>
                <Col md={7} xs={6} sm={6}>
                  <div className='inter400black'>GW07_KSCCL_01B1A9</div>
                  <div className='inter400black'>-79</div>
                </Col>
              </Row>
            </Col>
          </Row>
          <div style={{ fontFamily: 'inter', fontWeight: 600, fontSize: '18px', color:'#212121', marginTop:20 }}>Communication Gateway List</div>
          <Table responsive style={{ marginTop: 10, borderRadius: 10, border: '1px solid #ccc' }}>
                <thead style={{ backgroundColor: '#F4F5F5' }}>
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
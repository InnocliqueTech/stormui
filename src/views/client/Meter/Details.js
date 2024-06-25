import { Card, Col, Row } from 'react-bootstrap';

function Device() {
    return (
        <>
            <Card style={{ margin: 0, padding: '16px', borderRadius: 8, marginBottom:24}}>
                <div style={{ fontFamily: 'inter', fontWeight: 600, fontSize: '18px', color: '#212121', marginBottom: 16 }}>Consumer Details</div>
                <Row>
                    <Col md={6} xs={12} sm={12}>
                        <Row>
                            <Col md={6} xs={6} sm={6}>
                                <div className='meterdetails-list'>CAN:</div>
                                <div className='meterdetails-list'>Address:</div>
                                <div className='meterdetails-list'>Mobile:</div>
                            </Col>
                            <Col md={6} xs={6} sm={6}>
                                <div className='meterdetails-list1'>2110241547</div>
                                <div className='meterdetails-list1'>Flat-321 </div>
                                <div className='meterdetails-list1'>9132388890</div>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={6} xs={12} sm={12}>
                        <Row>
                            <Col md={6} xs={6} sm={6}>
                                <div className='meterdetails-list'>Name:</div>
                                <div className='meterdetails-list'>Contact Person:</div>
                                <div className='meterdetails-list'>Remarks:</div>
                            </Col>
                            <Col md={6} xs={6} sm={6}>
                                <div className='meterdetails-list1'>Rahul</div>
                                <div className='meterdetails-list1'>Rahul </div>
                                <div className='meterdetails-list1'>-</div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
            <Card style={{ margin: 0, padding: '16px', borderRadius: 8, marginBottom:24 }}>
                <div style={{ fontFamily: 'inter', fontWeight: 600, fontSize: '18px', color: '#212121', marginBottom: 16 }}>Meter Details</div>
                <Row>
                    <Col md={6} xs={12} sm={12}>
                        <Row>
                            <Col md={6} xs={6} sm={6}>
                                <div className='meterdetails-list'>Meter Number:</div>
                                <div className='meterdetails-list'>Size: </div>
                                <div className='meterdetails-list'>DMA:</div>
                                <div className='meterdetails-list'>Status:</div>
                            </Col>
                            <Col md={6} xs={6} sm={6}>
                                <div className='meterdetails-list1'>52336360</div>
                                <div className='meterdetails-list1'>20DN</div>
                                <div className='meterdetails-list1'>DMA2</div>
                                <div className='meterdetails-list1'>
                                    <span style={{backgroundColor: 'rgb(47, 182, 23)', padding: '8px 20px', color: 'rgb(255, 255, 255)'}}>Active</span>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={6} xs={12} sm={12}>
                        <Row>
                            <Col md={6} xs={6} sm={6}>
                                <div className='meterdetails-list'>Meter Type:</div>
                                <div className='meterdetails-list'>Zone: </div>
                                <div className='meterdetails-list'>Install Date:</div>
                            </Col>
                            <Col md={6} xs={6} sm={6}>
                                <div className='meterdetails-list1'>Bove</div>
                                <div className='meterdetails-list1'>Zone1 </div>
                                <div className='meterdetails-list1'>29/05/2024</div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
            <Card style={{ margin: 0, padding: '16px', borderRadius: 8, marginBottom:24 }}>
                <div style={{ fontFamily: 'inter', fontWeight: 600, fontSize: '18px', color: '#212121', marginBottom: 16 }}>Meter Info</div>
                <Row>
                    <Col md={6} xs={12} sm={12}>
                        <Row>
                            <Col md={6} xs={6} sm={6}>
                                <div className='meterdetails-list'>Deveui: </div>
                                <div className='meterdetails-list'>Mode: </div>
                                <div className='meterdetails-list'>Battery:</div>
                            </Col>
                            <Col md={6} xs={6} sm={6}>
                                <div className='meterdetails-list1'>0x8CF95720000AAD4E</div>
                                <div className='meterdetails-list1'>ABP/OTAA</div>
                                <div className='meterdetails-list1'>98%</div>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={6} xs={12} sm={12}>
                        <Row>
                            <Col md={6} xs={6} sm={6}>
                                <div className='meterdetails-list'>Devadd: </div>
                                <div className='meterdetails-list'>GPS: </div>
                                <div className='meterdetails-list'>Remarks:</div>
                            </Col>
                            <Col md={6} xs={6} sm={6}>
                                <div className='meterdetails-list1'>0x000AAD4E</div>
                                <div className='meterdetails-list1'>Latitude , Longitude / Goog </div>
                                <div className='meterdetails-list1'>-</div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </>
    );
}

export default Device;
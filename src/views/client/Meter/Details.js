// import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import dayjs from 'dayjs';
// import { BASE_API_URL1 } from '../../../config/constant';

function Device({detailssdt}) {
    // const [meterDetails, setMeterDetails] = useState(null); // State to store meter details
    console.log(detailssdt.meterDetails)
    const formatDate = (dateString) => {
        return dayjs(dateString).format('YYYY/MM/DD');
      };
   
    return (
        <>
            <Card style={{ margin: 0, padding: '16px', borderRadius: 8, marginBottom: 24 }}>
                <div style={{ fontFamily: 'inter', fontWeight: 600, fontSize: '18px', color: '#212121', marginBottom: 16 }}>Consumer Details</div>
                <Row>
                    <Col md={6} xs={12} sm={12}>
                        <Row>
                            <Col md={6} xs={6} sm={6}>
                                <div className='meterdetails-list'>CAN:</div>
                                <div className='meterdetails-list'>Address:</div>
                                <div className='meterdetails-list'>Mobile:</div>
                            </Col>
                            {detailssdt && detailssdt.meterDetails && detailssdt.meterDetails.consumerDetails ? (
                                <Col md={6} xs={6} sm={6}>
                                    <div className='meterdetails-list1'>{detailssdt.meterDetails.consumerDetails.can || '-'}</div>
                                    <div className='meterdetails-list1'>{detailssdt.meterDetails.consumerDetails.address || '-'}</div>
                                    <div className='meterdetails-list1'>{detailssdt.meterDetails.consumerDetails.mobile || '-'}</div>
                                   
                                </Col>
                            ) : ''}
                        </Row>
                    </Col>
                    <Col md={6} xs={12} sm={12}>
                        <Row>
                            <Col md={6} xs={6} sm={6}>
                                <div className='meterdetails-list'>Name:</div>
                                <div className='meterdetails-list'>Contact Person:</div>
                                <div className='meterdetails-list'>Remarks:</div>
                            </Col>
                            {detailssdt && detailssdt.meterDetails && detailssdt.meterDetails.consumerDetails  ? (
                                <Col md={6} xs={6} sm={6}>
                                    <div className='meterdetails-list1'>{detailssdt.meterDetails.consumerDetails.name || '-'}</div>
                                    <div className='meterdetails-list1'>{detailssdt.meterDetails.consumerDetails.contactPerson || '-'}</div>
                                    <div className='meterdetails-list1'>{detailssdt.meterDetails.consumerDetails.remarks || '-'}</div>
                                   
                                </Col>
                            ) : ''}
                        </Row>
                    </Col>
                </Row>
            </Card>

            <Card style={{ margin: 0, padding: '16px', borderRadius: 8, marginBottom: 24 }}>
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
                            {detailssdt && detailssdt.meterDetails && detailssdt.meterDetails.meterDetails ? (
                                <Col md={6} xs={6} sm={6}>
                                    <div className='meterdetails-list1'>{detailssdt.meterDetails.meterDetails.meterNumber || '-'}</div>
                                    <div className='meterdetails-list1'>{detailssdt.meterDetails.meterDetails.size || '-'}</div>
                                    <div className='meterdetails-list1'>{detailssdt.meterDetails.meterDetails.dma || '-'}</div>
                                    <div className='meterdetails-list1'>{detailssdt.meterDetails.meterDetails.status || '-'}</div>
                                </Col>
                            ) : ''}
                        </Row>
                    </Col>
                    <Col md={6} xs={12} sm={12}>
                        <Row>
                            <Col md={6} xs={6} sm={6}>
                                <div className='meterdetails-list'>Meter Type:</div>
                                <div className='meterdetails-list'>Zone: </div>
                                <div className='meterdetails-list'>Install Date:</div>
                            </Col>
                            {detailssdt && detailssdt.meterDetails && detailssdt.meterDetails.meterDetails ? (
                                <Col md={6} xs={6} sm={6}>
                                    <div className='meterdetails-list1'>{detailssdt.meterDetails.meterDetails.meterType || '-'}</div>
                                    <div className='meterdetails-list1'>{detailssdt.meterDetails.meterDetails.zone || '-'}</div>
                                    <div className='meterdetails-list1'>{formatDate(detailssdt.meterDetails.meterDetails.installDate) || '-'}</div>
                                   
                                </Col>
                            ) : ''}
                        </Row>
                    </Col>
                </Row>
            </Card>

            <Card style={{ margin: 0, padding: '16px', borderRadius: 8, marginBottom: 24 }}>
                <div style={{ fontFamily: 'inter', fontWeight: 600, fontSize: '18px', color: '#212121', marginBottom: 16 }}>Meter Info</div>
                <Row>
                    <Col md={6} xs={12} sm={12}>
                        <Row>
                            <Col md={6} xs={6} sm={6}>
                                <div className='meterdetails-list'>Deveui: </div>
                                <div className='meterdetails-list'>Mode: </div>
                                <div className='meterdetails-list'>Battery:</div>
                            </Col>
                            {detailssdt && detailssdt.meterDetails && detailssdt.meterDetails.meterInfo ? (
                                <Col md={6} xs={6} sm={6}>
                                    <div className='meterdetails-list1'>{detailssdt.meterDetails.meterInfo.deveui || '-'}</div>
                                    <div className='meterdetails-list1'>{detailssdt.meterDetails.meterInfo.mode || '-'}</div>
                                    <div className='meterdetails-list1'>{detailssdt.meterDetails.meterInfo.battery || '-'}</div>
                                   
                                </Col>
                            ) : ''}
                        </Row>
                    </Col>
                    <Col md={6} xs={12} sm={12}>
                        <Row>
                            <Col md={6} xs={6} sm={6}>
                                <div className='meterdetails-list'>Devadd: </div>
                                <div className='meterdetails-list'>GPS: </div>
                                <div className='meterdetails-list'>Remarks:</div>
                            </Col>
                            {detailssdt && detailssdt.meterDetails && detailssdt.meterDetails.meterInfo ? (
                                <Col md={6} xs={6} sm={6}>
                                    <div className='meterdetails-list1'>{detailssdt.meterDetails.meterInfo.devadd || '-'}</div>
                                    <div className='meterdetails-list1'>{detailssdt.meterDetails.meterInfo.gps || '-'}</div>
                                    <div className='meterdetails-list1'>{detailssdt.meterDetails.meterInfo.remarks || '-'}</div>
                                   
                                </Col>
                            ) : ''}
                        </Row>
                    </Col>
                </Row>
            </Card>
        </>
    );
}

export default Device;

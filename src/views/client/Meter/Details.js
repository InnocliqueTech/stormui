import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { BASE_API_URL1 } from '../../../config/constant';

function Device() {
    const [meterDetails, setMeterDetails] = useState(null); // State to store meter details

    useEffect(() => {
        const fetchMeterDetails = async () => {
            try {
                const response = await fetch(`${BASE_API_URL1}meters/getMeterDetailsWithMeterId`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "clientId": 1,
                        "zoneId": 0,
                        "dmaId": 0,
                        "meterId": 2275,
                        "fromDate": "2024-01-01",
                        "toDate": "2024-06-30"
                    })
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch meter details');
                }
                const data = await response.json();
                setMeterDetails(data.meterDetails); // Update state with fetched data
            } catch (error) {
                console.error('Error fetching meter details:', error);
            }
        };

        fetchMeterDetails(); // Call the fetch function when component mounts
    }, []); // Empty dependency array ensures this effect runs only once

    if (!meterDetails) {
        return <div>Loading...</div>; // Handle loading state while fetching data
    }

    // Destructure meterDetails for easier access
    const { consumerDetails, meterDetails: meterInfo, meterInfo: meterExtraInfo } = meterDetails;
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
                            <Col md={6} xs={6} sm={6}>
                                <div className='meterdetails-list1'>{consumerDetails.can}</div>
                                <div className='meterdetails-list1'>{consumerDetails.address}</div>
                                <div className='meterdetails-list1'>{consumerDetails.mobile}</div>
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
                                <div className='meterdetails-list1'>{consumerDetails.name}</div>
                                <div className='meterdetails-list1'>{consumerDetails.contactPerson}</div>
                                <div className='meterdetails-list1'>{consumerDetails.remarks || '-'}</div>
                            </Col>
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
                            <Col md={6} xs={6} sm={6}>
                                <div className='meterdetails-list1'>{meterInfo.meterNumber}</div>
                                <div className='meterdetails-list1'>{meterInfo.size}</div>
                                <div className='meterdetails-list1'>{meterInfo.dma}</div>
                                <div className='meterdetails-list1'>
                                    <span style={{ backgroundColor: 'rgb(47, 182, 23)', padding: '8px 20px', color: 'rgb(255, 255, 255)' }}>Active</span>
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
                                <div className='meterdetails-list1'>{meterInfo.meterType}</div>
                                <div className='meterdetails-list1'>{meterInfo.zone}</div>
                                <div className='meterdetails-list1'>{new Date(meterInfo.installDate).toLocaleDateString()}</div>
                            </Col>
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
                            <Col md={6} xs={6} sm={6}>
                                <div className='meterdetails-list1'>{meterExtraInfo.deveui}</div>
                                <div className='meterdetails-list1'>{meterExtraInfo.mode}</div>
                                <div className='meterdetails-list1'>{meterExtraInfo.battery}</div>
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
                                <div className='meterdetails-list1'>{meterExtraInfo.devadd}</div>
                                <div className='meterdetails-list1'><a href={meterExtraInfo.gps} target="_blank" rel="noopener noreferrer">View on Map</a></div>
                                <div className='meterdetails-list1'>{meterExtraInfo.remarks || '-'}</div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </>
    );
}

export default Device;

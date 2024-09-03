import { Col,  Row } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
// import pencil from '../../../assets/images/edit.svg';
// import refresh from '../../../assets/images/refresh_both.svg';
// import upload from '../../../assets/images/upload.svg';
// import deleteimg from '../../../assets/images/delete.svg';
import Device from './Device';
import Details from './Details';
// import Photos from './Photos';
import MeterPhoto from './Photos';
// import Overflow from '../../dashboard/Overflow';
import Analytics from './Analaytics';
import { useState } from 'react';


function Meter({ data }) {
    const [deviceData, setDeviceData] = useState([])
    // const [detailsData, setDetailsData] = useState([])
   
    console.log(data)
    const [analytics] = useState('1');

    const onAnalyticsData = (data) => {
        console.log(data)
        setDeviceData(data)
        // setDetailsData(data)
    }

    console.log(deviceData)
    return (
        <>
            <Row style={{ padding: '32px', background: '#F4F5F5' }}>
                <Col md={12} sm={12} xs={12} className='meterlist meterlistTab'>
                    <Tabs
                        defaultActiveKey="home"
                        id="fill-tab-example"
                        fill
                        style={{backgroundColor:"white"}}
                    >
                        <Tab eventKey="home" title="Analytics">
                            {/* <Overflow data={outFlowData} /> */}
                            <Analytics data1={data} onAnalyticsData={onAnalyticsData} />

                        </Tab>
                        <Tab eventKey="details" title="Details">
                            <Details detailssdt = {deviceData}/>
                            {/* <Details/> */}
                        </Tab>
                        <Tab eventKey="device" title="Device">
                            <Device devicedt ={deviceData}/>
                        </Tab>
                        <Tab eventKey="photos" title="Photos">
                            <MeterPhoto data1={data}/>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
            {/* <Row style={{ position: 'absolute', top: 100, right: 10 }}>
                <Col md={12} sm={12} xs={12} style={{ textAlign: 'end' }}>
                    <span style={{ marginRight: 20 }}><Image src={pencil} alt="pencil" /></span>
                    <span style={{ marginRight: 20 }}><Image src={refresh} alt="refresh" /></span>
                    <span style={{ marginRight: 20 }}><Image src={upload} alt="upload" /></span>
                    <span style={{ marginRight: 20 }}><Image src={deleteimg} alt="delete" /></span>
                </Col>
            </Row> */}

        </>
    );
}

export default Meter;
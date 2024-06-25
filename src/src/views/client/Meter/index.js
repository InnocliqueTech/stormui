import { Col, Image, Row } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import pencil from '../../../assets/images/edit.svg';
import refresh from '../../../assets/images/refresh_both.svg';
import upload from '../../../assets/images/upload.svg';
import deleteimg from '../../../assets/images/delete.svg';
import Device from './Device';

function Meter() {
    return (
        <>
        <Row style={{padding:10, paddingTop:30}}>
            <Col md={12} sm={12} xs={12}>
                <Tabs
                    defaultActiveKey="home"
                    id="fill-tab-example"
                    className="mb-3"
                    fill
                >
                    <Tab eventKey="home" title="Analytics">
                        Tab content for Home sdfasfd
                    </Tab>
                    <Tab eventKey="device" title="Device">
                        <Device />
                    </Tab>
                    <Tab eventKey="photos" title="Photos">
                        Tab content for Loooonger Tab
                    </Tab>
                </Tabs>
            </Col>
        </Row>
        <Row style={{position:'absolute', top:100, right:10}}>
             <Col md={12} sm={12} xs={12} style={{ textAlign: 'end' }}>
                    <span style={{marginRight:20}}><Image src={pencil} alt="pencil" /></span>
                    <span style={{marginRight:20}}><Image src={refresh} alt="refresh" /></span>
                    <span style={{marginRight:20}}><Image src={upload} alt="upload"/></span>
                    <span style={{marginRight:20}}><Image src={deleteimg} alt="delete"/></span>
                </Col>
        </Row>
        </>
    );
}

export default Meter;
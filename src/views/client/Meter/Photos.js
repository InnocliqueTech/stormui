import { Card } from 'react-bootstrap';
import MeterPhotos from '../../../assets/images/MeterPhotos.png';

function Device() {
    return (
        <>
            <Card style={{ margin: 0, padding: '16px', borderRadius: 8, marginBottom:24}}>
            <img src={MeterPhotos}  alt="MeterPhotos" />
            </Card>
        </>
    );
}

export default Device;
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Card } from 'react-bootstrap';
import Form from '../components/Form';
import Header from '../components/Header';
import CommonInput from '../components/CommonInput';
import Footer from '../components/Footer';
import WaterComp from '../components/WaterComp';

const Tracker = () => {
    const token = localStorage.getItem('token');
    const sectionData = [
        { title: 'Breakfast' },
        { title: 'Lunch' },
        { title: 'Dinner' },
        { title: 'Snack' },
    ];

    return (
        <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
            <Header />
            <div className="flex-grow-1 text-center">
                <h1 className="tracker-text text-center"><u>Calorie tracker</u></h1>
                <CommonInput />
                <Row className="justify-content-around">
                    {sectionData.map((section, index) => (
                        <Col className='m-4' md={5} sm={11} key={index}>
                            <Card className="m-1" style={{ borderRadius: '25px', border: '2px solid black' }}>
                                <Card.Header className='fw-bold'>{section.title}</Card.Header>
                                <Card.Body>
                                    <Form title={section.title} token={token} />
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
            <div className="m-4"> {/* Add margin-bottom to create space between the last row and the footer */}
                <Footer />
            </div>
        </div>
    );
}

export default Tracker;

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Card } from 'react-bootstrap';
import Form from '../components/Form';
import Header from '../components/Header';

const Tracker = () => {
    const token = localStorage.getItem('token');
    const sectionData = [
        { title: 'Breakfast' },
        { title: 'Lunch' },
        { title: 'Dinner' },
        { title: 'Snack1' },
        { title: 'Snack2' },
        { title: 'Water' },
    ];

    return (
        <div>
            <Header />
            <div className="text-center">
                <h1 className="text-center">Calorie tracker</h1>
                <Row>
                    {sectionData.map((section, index) => (
                        <Col md={6} sm={12} key={index}>
                            <Card className="m-2"> {/* Add margin and padding here */}
                                <Card.Header className='fw-bold'>{section.title}</Card.Header>
                                <Card.Body>
                                    <Form title={section.title} token={token} />
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}

export default Tracker;

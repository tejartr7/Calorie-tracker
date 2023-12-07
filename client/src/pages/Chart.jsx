// Chart.jsx
import React from 'react';
import Header from '../components/Header';
import { Form as Col, Card, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chartview from '../components/Chartview';
import Footer from '../components/Footer';

const Chart = () => {
    const token = localStorage.getItem('token');
    const mail = localStorage.getItem('email');
    const sectionData = [
        { title: 'Breakfast' },
        { title: 'Lunch' },
        { title: 'Dinner' },
        { title: 'Snack1' },
    ];

    return (
        <div>
            <Header />
            <div className="chart-box">
                <h1 className="text-center">Calorie tracker</h1>
                <Row xs={1} md={2} lg={2} className="chart-view m-4" >
                    {sectionData.map((section) => (
                        <Col key={section.title} className={`mb-${window.innerWidth < 600 ? 2: 6}`}>
                            <Card className="h-60" style={{ margin: '10px' }}>
                                <Card.Header className='fw-bold'>{section.title}</Card.Header>
                                <Card.Body>
                                    <div className="chart-container">
                                        <Chartview title={section.title} />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
            <Footer/>
        </div>
    );
}

export default Chart;

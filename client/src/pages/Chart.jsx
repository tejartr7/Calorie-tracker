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
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <div className="chart-box" style={{ flex: 1 }}>
                <h1 className="tracker-text text-center "><u>Calorie tracker</u></h1>
                <Row xs={1} md={2} lg={2} className="text-center chart-view m-4" >
                    {sectionData.map((section) => (
                        <Col key={section.title} className={`mb-${window.innerWidth < 600 ? 2 : 6}`}>
                            <Card className="h-60" style={{ margin: '10px', border: '2px solid black' }}>
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
            <div className="mb-4">
                <Footer />
            </div>
        </div>
    );
}

export default Chart;

import React from 'react'
import Header from '../components/Header';
import { Row, Col } from 'react-bootstrap';

const Home = () => {
  return (
    <div>
      <Header />
      <Row className="mt-5 mb-5 ms-2 align-items-center">
        {/* First Column */}
        <Col md={4} sm={10} className="text-left logo-container">
          <h1 className='fw-bold'>Calorie Tracker</h1>
          <p>Smart Eating, Wise Tracking</p>
        </Col>

        {/* Second Column */}
        <Col md={6} sm={10} className="ms-3 video-container">
          {/* Video/image goes here */}
          <img src="your-image-url" alt="Your Image" style={{ width: '100%' }} />
        </Col>
      </Row>
      <div>Part2</div>
      <h1>What are you waiting for!!</h1>
      <div className="text-center text-sm-left text-md-left text-lg-left">Contact page</div>
    </div>
  )
}

export default Home;

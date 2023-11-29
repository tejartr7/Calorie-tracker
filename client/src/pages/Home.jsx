import React from 'react'
import Header from '../components/Header';
import { Row, Col, Card } from 'react-bootstrap';

const Home = () => {
  return (
    <div>
      <Header />
      <Row>
        <Col md={6} className="text-center">
          <h1>Calorie Tracker</h1>
          <p>Track your calories and get updates about your diet</p>
        </Col>
        <Col md={6} className="text-center">
          Video/image
        </Col>
      </Row>
      <div>Part2</div>
      <h1>What are you waiting for!!</h1>
      <div>Contact page</div>
    </div >
  )
}

export default Home;
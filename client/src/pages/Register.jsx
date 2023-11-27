import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
   // console.log('Form submitted');

    try {
      const response = await axios.post('http://localhost:8000/register', formData);
      //console.log(response);
      if (response.status ===201) {
        
        return navigate("/login");
      }
      // Handle the response from the server as needed
    } catch (error) {
      console.error('Error submitting the form:', error);
      // Handle the error appropriately
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Container className="text-center">
      <h1 className='mt-5'>Create your free Account!!</h1>
      <Row className="justify-content-center align-content-center align-items-center justify-items-center ">
        <Col md={6}>
          <div className="register bg-white p-4 d-flex flex-column align-items-center shadow mt-5" style={{ borderRadius: '10px' }}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3 d-flex align-items-center">
                <Form.Label className="fw-bold text-left" style={{ width: '30%', textAlign: 'left', marginRight: '10px' }}>Username </Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter your username"
                  style={{ border: '1px solid black', borderRadius: '5px', backgroundColor: '#e8f0fe' }}
                />
              </Form.Group>
              <Form.Group className="mb-3 d-flex align-items-center">
                <Form.Label className="fw-bold" style={{ width: '30%', textAlign: 'left', marginRight: '10px' }}>Email </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  style={{ border: '1px solid black', borderRadius: '5px', backgroundColor: '#e8f0fe' }}
                />
              </Form.Group>
              <Form.Group className="mb-3 d-flex align-items-center">
                <Form.Label className="fw-bold" style={{ width: '30%', textAlign: 'left', marginRight: '10px' }}>Password </Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="minimum length should be 8"
                  className='color-primary'
                  style={{ border: '1px solid black', borderRadius: '5px', backgroundColor: '#e8f0fe' }}
                />
              </Form.Group>
              <Form.Group className="mb-3 d-flex align-items-center">
                <Form.Label className="fw-bold" style={{ width: '30%', textAlign: 'left', marginRight: '10px' }}>Confirm Password </Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Enter your password again"
                  style={{ border: '1px solid black', borderRadius: '5px', backgroundColor: '#e8f0fe' }}
                />
              </Form.Group>
              <Button variant="primary" className="bg-black" type="submit">
                Register
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;

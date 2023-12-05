import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, redirect } from 'react-router-dom';
import { useSnackbar } from 'notistack';



const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.email === '' || formData.password === '') {
        enqueueSnackbar('Please fill all the fields', { variant: 'error' });
        return;
      }
      const response = await axios.get('http://localhost:8000/login', { params: formData });
      // console.log(response);
      if (response.status === 200) {
        localStorage.setItem('mail', formData.email);
        console.log("Login successful");
        enqueueSnackbar('Login successful', { variant: 'success' });
        setTimeout(() => { }, 2000);
        window.location.href = '/';
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Invalid credentials', { variant: 'error' });
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
    <Container className="text-center mt-5">
      <Row className="justify-content-center align-content-center align-items-center justify-items-center ">
        <Col md={6}>
          <div className="register bg-white p-4 d-flex flex-column align-items-center shadow mt-5" style={{ borderRadius: '10px' }}>
            <h1 className='mt-5 mb-5'>Welcome Back!!</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3 d-flex align-items-center">
                <Form.Label className="fw-bold" style={{ width: '35%', textAlign: 'left', marginRight: '10px' }}>Email </Form.Label>
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
              <Button variant="primary" style={{ backgroundColor: '#005c5c' }} type="submit">
                Sign In
              </Button>
            </Form>
            <p style={{ fontSize: '16px', margin: 0 }} className='fw-bold'>Not a member?</p>
            <br />
            <a href='/signup' style={{ fontSize: '16px', margin: 0, color: '#005c5c' }} className='fw-bold'>Sign Up</a>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;

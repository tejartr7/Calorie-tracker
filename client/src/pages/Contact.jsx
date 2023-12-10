import React, { useState } from 'react';
import Header from '../components/Header';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import Footer from '../components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      if (formData.name === '' || formData.email === '' || formData.message === '') {
        enqueueSnackbar('Please fill all the mandatory fields', { variant: 'error' });
        return;
      }
      const response = await axios.post('http://localhost:8000/contact', formData);
      if (response.status === 200) {
        enqueueSnackbar('Mail Sent Successfully', { variant: 'success' });
        formData.name = '';
        formData.email = '';
        formData.message = '';
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Error in sending mail', { variant: 'error' });
    }
  };

  return (
    <div>
      <Header />
      <div className="fw-bold contact-container d-flex justify-content-center align-items-center vh-75 m-5" style={{ margin: '20px' }}>
        <div style={{ maxWidth: '500px', width: '90%', padding: '20px', border: '2px solid black', borderRadius: '10px' }}>
          <h1 className='text-center mb-4'>Contact Us</h1>
          <form id="contact_form" name="contact_form" onSubmit={handleSubmit}>
            <div className="mb-3 row">
              <div className="col">
                <label>First Name</label>
                <input
                  type="text"
                  required
                  maxLength="50"
                  className="form-control fw-bold"
                  id="name"
                  name="name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="Enter Your Name"
                  style={{ border: '1px solid black' }}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col">
                <label htmlFor="email_addr">Email address</label>
                <input
                  type="email"
                  required
                  maxLength="50"
                  className="form-control fw-bold"
                  id="email_addr"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  style={{ border: '1px solid black' }}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="message">Message</label>
              <textarea
                className="form-control fw-bold"
                id="message"
                name="message"
                rows="5"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter Your Message"
                style={{ border: '1px solid black' }}
              ></textarea>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <button type="submit" className="btn btn-lg" style={{ backgroundColor: '#005c5c'}}>
                Send
              </button>
            </div>
          </form>
        </div>

        <div style={{ maxWidth: '500px', width: '90%', padding: '20px', borderRadius: '10px', marginLeft: '20px' }} className='text-center'>
          <h1 className='text-center mb-4'>Other ways to contact</h1>
          <div className="mb-3 row">
            <div className="col">
              <label>Mail us at</label>
              <p className='fw-bold' ><a style={{ color: 'black' }} href="mailto:trackercalorie88@gmail.com">trackercalorie88@gmail.com 📧</a></p>
            </div>
          </div>
        </div>
        
      </div>
      <Footer />
    </div>
  );
}


export default Contact;

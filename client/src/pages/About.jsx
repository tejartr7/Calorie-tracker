import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const About = () => {
  return (
    <div>
      <Header />
      <div className="fw-bold contact-container d-flex justify-content-center align-items-center vh-75 m-5" style={{ margin: '20px' }}>
        <div style={{ maxWidth: '500px', width: '90%', padding: '20px', border: '2px solid black', borderRadius: '10px' }}>
          <h1 className="m-3 text-center "><u>About Us</u></h1>
          <p className='text-center'>This website is made by <a href="">RTR</a> a full stack webdeveloper,using MERN stack,Nodemailer,fontawesome,react-bootstrap and react-chartjs-2,react autosuggest,for more information about the developer please contact us using the contact form below.
          </p>
          {/* <p className='text-center' style={{ color: 'red' }}><u>Note:</u>The calculations in this website are not accurate; there might be a variation of +10% or -10% depending on the way the item was made, so if the calorie count is too high don't worry!!</p>*/}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About
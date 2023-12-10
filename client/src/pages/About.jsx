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
          <p className='text-center'>
            Welcome to this calorie tracker website, crafted by RTR—a skilled full-stack web developer and freelancer. In the hustle of our daily lives, managing calorie intake is vital for a healthy lifestyle. This platform reflects my passion for web development and commitment to a user-friendly experience. Empowering you with tools for informed nutritional choices is my primary goal. Explore this space where technology meets wellness, and every click brings you closer to a healthier you. If you desire a similar website, feel free to <a href="mailto:codworldrtr7@gmail.com" style={{color:'black'}}>contact me</a>.
          </p>
          <p className='text-center' style={{ color: 'red' }}><u>Note:</u>The calculations in this website are not accurate; there might be a variation of +10% or -10% depending on the way the item was made, so if the calorie count is too high don't worry!!</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About
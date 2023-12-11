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
    Welcome to the Calorie Tracker—an innovative website designed to help you monitor and manage your daily calorie intake. Developed by RTR, a proficient web developer and freelancer, this platform is dedicated to promoting a healthy lifestyle through informed nutritional choices.

    As part of the Calorie Tracker organization, this website not only tracks your calories but also provides timely email updates to support your wellness journey. RTR's expertise in web development ensures a seamless and user-friendly experience.

    Explore this space where technology intersects with wellness, and every interaction brings you closer to achieving a healthier you. If you are interested in a similar website for your organization or have any inquiries about the developer, please don't hesitate to <a href="mailto:codworldrtr7@gmail.com" style={{color:'black'}}>contact RTR</a>.
    </p>
          <p className='text-center' style={{ color: 'red' }}><u>Note:</u>The webiste is not 100% accurate, so if the calorie count is too high don't worry!!</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About

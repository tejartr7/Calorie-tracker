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
          <p className='text-center'>This is a calorie tracker app that allows users to track their daily calorie intake. Users can create an account, log in, and track their daily calorie intake. Users can also view their daily calorie intake history and edit or delete their entries. There are few items that are predefined in the database which are given by the autosuggest feature, but you can also add your own items, mention their calories, proteins.
          </p>
          <p className='text-center' style={{ color: 'red' }}><u>Note:</u>The calculations in this website are not accurate; there might be a variation of +10% or -10% depending on the way the item was made, so if the calorie count is too high don't worry!!</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About
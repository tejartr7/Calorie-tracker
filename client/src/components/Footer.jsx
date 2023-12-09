import React from 'react';

const Footer = () => {
  return (
    <div className='text-center' style={{ position: 'fixed', bottom: 0, width: '100%', background: 'white', borderTop: '1px solid black', zIndex: 1000 }}>
      <p>Designed and Developed by <a href="#" style={{ color: 'black' }}>RTR  </a>
        Want a website for yourself? <a href='mailto:codworldrtr7@gmail.com' style={{ color: 'black' }}>Contact us</a>&nbsp; &nbsp;
        <br></br>
        <u className='text-danger'>Note: Info is not 100% accurate</u></p>
    </div>
  );
}

export default Footer;

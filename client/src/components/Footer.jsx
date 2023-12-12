import React from 'react';

const Footer = () => {
  return (
    <div className='text-center pt-1 pb-1' style={{ position: 'fixed', bottom: 0, width: '100%', background: 'white', borderTop: '1px solid black', zIndex: 1000 }}>
      <p style={{ margin: '0px', padding: '0px' }}>Designed and Developed by <a href="#" style={{ color: 'black' }}>RTR  </a>
        Want a website for yourself? <a href='mailto:codworldrtr7@gmail.com' style={{ color: 'black' }}>Contact us</a></p>
    </div>
  );
}

export default Footer;

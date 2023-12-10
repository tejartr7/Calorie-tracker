import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import { Row, Col } from 'react-bootstrap';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Header />
      <div className="container py-5">
        <div className="row mb-4 align-items-center flex-lg-row-reverse">
          <div className="col-md-6 col-xl-7 mb-4 mb-lg-0 order-md-1 order-xl-0">
            <div className="lc-block position-relative d-flex justify-content-center align-items-center">
              <img
                className="img-fluid rounded shadow"
                src="https://th.bing.com/th/id/OIG.CjNZ3hWxe4SKgMmzR.YR?pid=ImgGn"
                sizes="(max-width: 840px) 100vw, 840px"
                width="500"
                height=""
                alt="Dev group working"  // Add alt attribute for accessibility
              />
            </div>
          </div>

          <div className="hero-text text-left col-md-6 col-xl-5 order-md-0 order-xl-1">
            <div className="lc-block mb-3">
              <div editable="rich">
                <h3 className="fw-bold display-2">Smart Eating.</h3>
                <h3 className="fw-bold display-2">Wise Tracking.</h3>
              </div>
            </div>

            <div className="lc-block mb-4">
              <div editable="rich">
                <p className="lead">
                  We help you in your fitness by tracking your calories
                </p>
              </div>
            </div>
            <div className="lc-block">
              <Link to="/tracker" className="btn btn-lg" style={{ backgroundColor: '#005c5c', color: 'white', textDecoration: 'none' }}>
                Get it now-for Free
              </Link>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;

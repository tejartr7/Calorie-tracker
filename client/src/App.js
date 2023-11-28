import React, { useEffect } from 'react';
import Home from './pages/Home';
import Tracker from './pages/Tracker';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Chart from './pages/Chart';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import moment from 'moment-timezone';
import axios from 'axios';

function App() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const time = moment().tz('Asia/Kolkata');
        const t = time.format('HH:mm:ss');
        const s = t.split(":");
        if (s[0] === "24" && s[1] === "00" && s[2] === "00") {
          const email = localStorage.getItem('mail');
          console.log(email);
          try {
            const response = await axios.post('http://localhost:8000/reset', {
              params: {
                email: email,
              },
            });
            if (response.status === 200) {
              console.log("reset successful");
            }
            else if (response.status === 404) {
              console.log("reset was not successfull")
            }
          }
          catch {
            console.log("error")
          }
          const response = await axios.get('http://localhost:8000/sendmail', {
            params: {
              email: email,
            },
          });

          console.log(response);
        }
      } catch (error) {
        console.error('Error in fetchData:', error);
      }
    };

    // Run fetchData every second
    const intervalId = setInterval(fetchData, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);  // Empty dependency array to ensure useEffect runs only once on mount

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tracker" element={<Tracker />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/chart" element={<Chart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

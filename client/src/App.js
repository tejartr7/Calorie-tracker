
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Tracker from './pages/Tracker';
import Chart from './pages/Chart';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import moment from 'moment-timezone';
import axios from 'axios';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('mail');
    if (token != null) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    const fetchData = async () => {
      try {
        const email = localStorage.getItem('mail');
        const time = moment().tz('Asia/Kolkata');
        const t = time.format('HH:mm:ss');
        const s = t.split(":");
        if (s[0] === "24" && s[1] === "00" && s[2] === "00") {
          try {
            const response = await axios.post('http://localhost:8000/reset', {
              params: {
                email: email,
              },
            });
            if (response.status === 200) {
              console.log("reset successful");
            } else if (response.status === 404) {
              console.log("reset was not successful")
            }
          } catch {
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

    const intervalId = setInterval(fetchData, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/tracker" element={isAuthenticated ? <Tracker /> : <Navigate to="/login" />} />
        <Route path="/about" element={isAuthenticated ? <About /> : <Navigate to="/login" />} />
        <Route path="/contact" element={isAuthenticated ? <Contact /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Register />} />
        <Route path="/chart" element={isAuthenticated ? <Chart /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
